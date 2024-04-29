"use strict";
// Create a separate module getUsers.js that generates an
// array of 100 users:
// - {id: 1, name: ‘User 1’}
// - {id: 2, name: ‘User 2’}
const usersList = document.getElementById("usersList");
const searchIcon = document.getElementById("searchIcon");
const button = document.getElementById("button");
const searchElement = document.getElementById("search");
let users = [];
const generateUsers = () => {
    // Clear localStorage before generating new users
    localStorage.clear();
    for (let i = 1; i <= 100; i++) {
        users.push({ id: i, name: "User " + i });
    }
    return users;
};
// Call generateUsers to populate the users array initially
generateUsers();
const displayUsers = () => {
    if (button) {
        button.innerText = "Show users";
    }
    const searchInputElement = document.getElementById("search");
    if (usersList) {
        usersList.innerHTML = ""; // Clear the usersList innerHTML
    }
    if (searchInputElement) {
        searchInputElement.value = ""; // Clear the search input value
    }
    if (searchIcon) {
        searchIcon.style.display = "inline-block"; // Display the search icon
    }
    // Iterate through users to create and append list items
    users.forEach((user) => {
        // Retrieve the counter value from localStorage
        let count = parseInt(localStorage.getItem(`counter${user.id}`) || "0");
        // Check if the count is not 0, then append the counter span
        if (usersList) {
            usersList.innerHTML += `<li data-id="${user.id}" onClick="handleUserClick(${user.id})">
          <b>ID</b>: ${user.id};
          <b>Name:</b> ${user.name}
          <b title="clicks counter"><span id="counter${user.id}" ${count !== 0 ? "" : 'style="display: none;"'}>${count}</span></b>
          <span class="remove" onClick="removeUser(${user.id})">x</span>
        </li>`;
        }
    });
};
// Function to handle user click event
function handleUserClick(userId) {
    // Increase the counter for the clicked element by 1
    const clickedCounterElement = document.getElementById(`counter${userId}`);
    if (clickedCounterElement) {
        let count = parseInt(clickedCounterElement.textContent || "0");
        count++;
        clickedCounterElement.textContent = count.toString();
        // Store the updated counter value in localStorage
        localStorage.setItem(`counter${userId}`, count.toString());
        clickedCounterElement.style.display = "inline";
    }
}
const search = () => {
    const searchValue = searchElement.value.toLowerCase();
    // Filter the users based on the search value
    let filteredUsers = users.filter((user) => user.name.includes(searchValue));
    if (usersList) {
        const Message = `<li><b style="color: red;">Press generate button first.</b></li>`;
        const isUserListEmptyOrMessage = usersList.innerHTML === "" || usersList.innerHTML === Message;
        if (isUserListEmptyOrMessage) {
            usersList.innerHTML = Message;
        }
        else if (filteredUsers.length > 0) {
            usersList.innerHTML = "";
            filteredUsers.forEach((user) => {
                // Retrieve the counter value from localStorage
                let count = parseInt(localStorage.getItem(`counter${user.id}`) || "0");
                usersList.innerHTML += `<li data-id="${user.id}" onClick="handleUserClick(${user.id})">
          <b>ID</b>: ${user.id};
          <b>Name:</b> ${user.name}
          <b title="clicks counter"><span id="counter${user.id}" ${count !== 0 ? "" : 'style="display: none;"'}>${count}</span></b>
          <span class="remove" onClick="removeUser(${user.id})">x</span>
        </li>`;
            });
        }
        else if (filteredUsers.length === 0) {
            usersList.innerHTML = `<li><b style="color: red;">No match found.</b></li>`;
        }
    }
};
const removeUser = (userId) => {
    // Remove the user from the users array
    users = users.filter((user) => user.id !== userId);
    // Remove the user from the DOM
    const liToRemove = document.querySelector(`#usersList li[data-id="${userId}"]`);
    if (liToRemove) {
        liToRemove.remove();
    }
    // Remove the counter from localStorage
    localStorage.removeItem(`counter${userId}`);
};
