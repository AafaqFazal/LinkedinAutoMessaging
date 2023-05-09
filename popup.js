document.addEventListener('DOMContentLoaded', function() {


    document.getElementById('injectScriptBtn').addEventListener('click', function() {
        chrome.runtime.sendMessage({ message: 'injectScript' });
    });


    chrome.storage.local.get(['linkedinProfiles'], (result) => {
        const linkedinProfiles = result.linkedinProfiles;

        if (linkedinProfiles && linkedinProfiles.length > 0) {
            const tableBody = document.querySelector("#profiles-table tbody");

            linkedinProfiles.forEach((profile) => {
                const newRow = document.createElement("tr");
                const profileCell = document.createElement("td");
                profileCell.textContent = profile;
                newRow.appendChild(profileCell);

                const deleteButtonCell = document.createElement("td");
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "X";
                deleteButton.addEventListener("click", () => {
                    // Remove the row from the table
                    newRow.remove();

                    // Remove the profile from the array
                    const index = linkedinProfiles.indexOf(profile);
                    if (index > -1) {
                        linkedinProfiles.splice(index, 1);
                        chrome.storage.local.set({ linkedinProfiles });
                    }
                });
                deleteButtonCell.appendChild(deleteButton);
                newRow.appendChild(deleteButtonCell);

                tableBody.appendChild(newRow);
            });
        }
    });




    // Get the form element
    const myForm = document.getElementById('mainform');

    // Create an array to store profile links
    const profileLinks = [];

    // Add an event listener to the form's submit button
    myForm.addEventListener('submit', function(event) {
        // Prevent the form from submitting and reloading the page
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password").value;
        var subject = document.getElementById("subject").value;
        var message = document.getElementById("message").value;
        var profiles = "https://www.linkedin.com/in/malik-waqas-arif-222ba11b4/"; //document.getElementById("profiles").value;
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


});