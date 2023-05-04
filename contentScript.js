console.log("loaded");

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