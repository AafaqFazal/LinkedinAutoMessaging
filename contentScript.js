
// Find all buttons that have either "Connect" or "Message" text in them
window.onload = function() {
    const buttons = document.querySelectorAll('button');
    console.log('Found ' + buttons.length + ' buttons');

    buttons.forEach(button => {
      if (button.textContent.includes('Connect') || button.textContent.includes('Message')) {
        console.log('inside if, found connect or message button')
        const profileButton = document.createElement('button');
        profileButton.className = 'LinBot-GetprofileB';
        profileButton.innerHTML = 'Save Profile';
        profileButton.className = 'artdeco-button artdeco-button--2 artdeco-button--secondary';
        button.parentElement.insertBefore(profileButton, button.previousElementSibling);
      }
    });
  }
  








// const init = function(){
//     const injectElement = document.createElement("div");
//     injectElement.className = 'LinBot-GetprofileB';
//     injectElement.innerHTML = 'Testing innerHTML injection!';
//     document.body.appendChild(injectElement);
// }
// init();

// const init = function(){
//     const injectElement = document.createElement("div");
//     injectElement.className = 'LinBot-GetprofileB';
  
//     // create button element
//     const buttonElement = document.createElement("button");
//     buttonElement.innerHTML = 'Get Profile';
//     buttonElement.className = 'artdeco-button artdeco-button--2 artdeco-button--secondary';
  
//     // find the entry-point element
//     const observer = new MutationObserver(function(mutationsList, observer) {
//       const entryPointElement = document.querySelector('.entity-result__actions .entry-point');
//       if (entryPointElement) {
//         // insert the button element before the existing Message button
//         entryPointElement.insertBefore(buttonElement, entryPointElement.querySelector('.artdeco-button--secondary'));
//         observer.disconnect();
//       }
//     });
  
//     observer.observe(document.body, { childList: true, subtree: true });
//   };
//   init();
  