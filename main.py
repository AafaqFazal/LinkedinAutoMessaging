from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.chrome.options import Options
import time
from selenium.common.exceptions import NoSuchElementException

app = FastAPI()
# Add the following middleware to enable CORS for your extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["chrome-extension://kccnddmogcecfhkcdbolmkennecgpjpm"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/send_message")
async def send_message(email: str = Body(...), password: str = Body(...),subject: str = Body(...), message: str = Body(...), listofprofiles: str = Body(...)):
    # Send the message using the provided email, password, message, and list of profiles
    # implementation not shown for brevity
    
    # Set up the Chrome driver and open LinkedIn
    options = Options()
    options.headless = False
    driver = webdriver.Chrome("C:\chromedriver\chromedriver.exe",chrome_options=options)
    driver.get("https://www.linkedin.com/login")

    print("Logging in")
    # Find the email and password input fields, enter the email and password, and submit the form
    email_field = driver.find_element(By.ID, "username")
    password_field = driver.find_element(By.ID, "password")

    ########################Enter Login Details here####################################
    email_field.send_keys(email)
    password_field.send_keys(password)

    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    login_button.click()
    ####################################################################################

    # Wait for the home page to load
    wait = WebDriverWait(driver, 10)

    # # Read the list of profile URLs from the text file
    # with open('profile_urls.txt', 'r') as f:
    #     profile_urls = f.readlines()
    #     profile_urls = [url.strip() for url in profile_urls]
    profile_urls_str = listofprofiles
    profile_urls = profile_urls_str.split('\n')
    profile_urls = [url.strip() for url in profile_urls]

    # Loop through the list of profile URLs and send the message
    for url in profile_urls:
        driver.get(url)
        print("Entering profile")
        time.sleep(8)

        allButtons = driver.find_elements(By.TAG_NAME,"button")
        message_buttons = [btn for btn in allButtons if "Message" in btn.text]

        # Check if it is a locked profile
        try:
            locked_icon = message_buttons[0].find_element(By.XPATH, ".//li-icon[@type='locked']")
            print("The profile is locked!")


        except NoSuchElementException:
            
            # Click the button
            message_buttons[0].click()
            time.sleep(2)

            is_premium = False
            try:
                subject_input = driver.find_element(By.NAME, "subject")
                if subject_input:
                    is_premium = True
            except NoSuchElementException:
                pass

            if is_premium:
                print("Profile is premium")
                subject_input.send_keys(subject)
            else:
                print("Profile is accessible")


            # Type a message and send it
            message_input = wait.until(EC.element_to_be_clickable((By.XPATH, "//div[@role='textbox']")))
            message_input.send_keys(message)
            message_input.send_keys(Keys.RETURN)

            # Find all buttons on the page
            allButtons = driver.find_elements(By.TAG_NAME, "button")

            # Filter out the send button by its text
            send_button = [btn for btn in allButtons if "Send" in btn.text]
            if send_button:
                send_button[0].click()
                print("Pressed send button")

            # Find all buttons on the page
            allButtons = driver.find_elements(By.TAG_NAME, "button")

            # Filter out the close button by its text
            close_button = [btn for btn in allButtons if "Close your conversation" in btn.text]

            # Click the close button
            if close_button:
                close_button[0].click()
            else:
                print("Close button not found.")
            # Wait for the message to be sent
            time.sleep(2)
            print("Message sent")

    return {"All messages sent!"}
