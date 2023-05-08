
  console.log("loaded");
  setTimeout(function() {
    // Code to be executed after delay
    console.debug("Finding the result list");
    // Check if the ul element with class reusable-search__entity-result-list exists
    const searchResultList = document.querySelector('.reusable-search__entity-result-list');
    const profileListItems = searchResultList.querySelectorAll('li');
      if (searchResultList) {
        console.debug("Found result list");
        // Get all the li elements inside the ul
        //const profileListItems = searchResultList.querySelectorAll('li');
        // Loop through each li element and add an "Add Profile" button inside it
        console.debug("Finding and itrating lis");
        profileListItems.forEach(item => {
          const addButton = document.createElement('button');
          addButton.innerText = 'Add Profile';
          addButton.style.backgroundColor = '#0077B5';
          addButton.style.color = 'white';
          addButton.style.padding = '6px 16px';
          addButton.style.borderRadius = '24px';
          addButton.style.fontWeight = 'bold';
          addButton.style.cursor = 'pointer';
          // addButton.style.position = 'absolute';
          addButton.style.marginTop = '10px';
          addButton.style.marginRight= '10px';
          addButton.style.bottom = '0';
          addButton.style.right = '0';
          addButton.style.width = '130px';
          addButton.style.height = '50px';

          addButton.addEventListener('click', () => {
            const profileLink = item.querySelector('a.app-aware-link').getAttribute('href');
            console.log(profileLink);
            // Get the existing profiles from local storage
            chrome.storage.local.get('linkedinProfiles', (result) => {
              const linkedinProfiles = result.linkedinProfiles || [];
              // Add the new profile to the array
              linkedinProfiles.push(profileLink);
              // Save the updated array to local storage
              chrome.storage.local.set({ 'linkedinProfiles': linkedinProfiles }, () => {
                console.log(`Saved profile: ${profileLink}`);
              });
            });
          });

              // Set the li element to a row layout
          item.style.display = 'flex';
          // item.style.justifyContent = 'space-between';
          item.appendChild(addButton);
        });
      }
    
    // Create a button element
    const button = document.createElement('button');
    button.innerText = 'ScrapButton';
    
    // Apply styles to the button
    button.style.backgroundColor = '#0077B5';
    button.style.color = 'white';
    button.style.padding = '6px 16px';
    button.style.borderRadius = '24px';
    button.style.fontWeight = 'bold';
    button.style.cursor = 'pointer';
    
    // Find the header element and insert the button into it
    const header = document.querySelector('.global-nav__content');
    if (header) {
      header.insertBefore(button, header.lastChild);
    }
    
    // Add a click event listener to the button
// Add a click event listener to the button
button.addEventListener('click', (event) => {
  // searchResultList = document.querySelector('.reusable-search__entity-result-list');
  // profileListItems = searchResultList.querySelectorAll('li');
  if (searchResultList) {
    const linkedinProfiles = [];
    profileListItems.forEach(item => {
      const profileLink = item.querySelector('a.app-aware-link')?.getAttribute('href');
      if (profileLink) {
        linkedinProfiles.push(profileLink);
      }
    });
    console.log(linkedinProfiles);
    chrome.storage.local.set({ 'linkedinProfiles': linkedinProfiles }, () => {
      console.log(`Saved ${linkedinProfiles.length} profiles`);
    });
  }
});



  }, 5000); // Delay of 5 seconds (5000 milliseconds)
  

