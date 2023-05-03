// document.addEventListener('DOMContentLoaded', function(){
// document.getElementById("send").addEventListener("click", async function() {
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     var message = document.getElementById("message").value;
//     var profiles = document.getElementById("profiles").value;
    
//     // Do something with the username, password, message, and profiles variables

//   });
// });

document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  const myForm = document.getElementById('mainform');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Add an event listener to the form's submit button
  myForm.addEventListener('submit', function(event) {
    // Prevent the form from submitting and reloading the page
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var subject = document.getElementById("subject").value;
    var message = document.getElementById("message").value;
    var profiles = document.getElementById("profiles").value;

    console.log('Entered information, username is: ' + username, 'subject is ' + subject);

    const data = {
      email: username,
      password: password,
      subject: subject,
      message: message,
      listofprofiles: profiles
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    
    fetch('http://localhost:8000/send_message', options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        // Update the DOM with the response data
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });

  });

  searchButton.addEventListener('click', () => {
    console.log('Pressed');
    const query = encodeURIComponent(searchInput.value);
    const url = `https://www.linkedin.com/search/results/people/?keywords=${query}`;
    searchResults.src = url;
  });

});

