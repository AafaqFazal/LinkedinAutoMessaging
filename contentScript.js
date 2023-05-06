
  console.log("loaded");
  setTimeout(function() {
    // Code to be executed after delay
    console.debug("Finding the result list");
    // Check if the ul element with class reusable-search__entity-result-list exists
    const searchResultList = document.querySelector('.reusable-search__entity-result-list');
      if (searchResultList) {
        console.debug("Found result list");
        // Get all the li elements inside the ul
        const profileListItems = searchResultList.querySelectorAll('li');
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
            // Code to add the profile goes here
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
    button.addEventListener('click', function() {
      console.log('clicked');
    
      // Find all the links on the page
      const links = Array.from(document.querySelectorAll('a'));
    
      // Filter out the LinkedIn profile URLs
      const linkedinLinks = links.filter(link => link.href.includes('linkedin.com/in/'));
    
      // Save the LinkedIn profile URLs to an array
      const linkedinProfiles = linkedinLinks.map(link => link.href);
    
      console.log(linkedinProfiles);
    
      // Save the LinkedIn profile URLs to storage
      chrome.storage.local.set({ 'linkedinProfiles': linkedinProfiles }).then(() => {
        console.log("Value is set to ");
      });
    
    });


  }, 5000); // Delay of 5 seconds (5000 milliseconds)
  

