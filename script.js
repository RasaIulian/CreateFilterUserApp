"use strict";
// Create a separate module getUsers.js that generates an
// array of 100 users:
// - {id: 1, name: ‘User 1’}
// - {id: 2, name: ‘User 2’}
const usersList = document.getElementById("usersList");
const searchIcon = document.getElementById("searchIcon");
const button = document.getElementById("button");
let users = [];
const generateUsers = () => {
    for (let i = 1; i <= 100; i++) {
        users.push({ id: i, name: "User " + i });
    }
    // console.log("Users:", users);
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
        // Clear the usersList innerHTML
        usersList.innerHTML = "";
    }
    if (searchInputElement) {
        searchInputElement.value = "";
    }
    if (searchIcon) {
        searchIcon.style.display = "inline-block";
    }
    // let users = generateUsers();
    // Clear localStorage for counters before updating the UI
    users.forEach((user) => {
        localStorage.removeItem(`counter${user.id}`);
    });
    // Iterate through users to create and append list items
    users.forEach((user) => {
        let count = parseInt(localStorage.getItem(`counter${user.id}`) || "0");
        // Check if the count is not 0, then append the counter span
        if (count !== 0) {
            if (usersList) {
                usersList.innerHTML += `<li data-id="${user.id}" onClick="handleUserClick(${user.id})">
      <b>ID</b>: ${user.id};
      <b>Name:</b> ${user.name}
      <span id="counter${user.id}"></span>
      <span class="remove" onClick="removeUser(${user.id})">x</span>

      </li>
    `;
            }
        }
        else if (usersList) {
            {
                usersList.innerHTML += `<li data-id="${user.id}" onClick="handleUserClick(${user.id})">
    <b>ID</b>: ${user.id};
    <b>Name:</b> ${user.name}
    <b><span style="display: none;" id="counter${user.id}"></span></b>
    <span class="remove" onClick="removeUser(${user.id})">x</span>
    </li>
    `;
            }
        }
    });
};
//
function handleUserClick(userId) {
    // console.log(`handleUserClick called for user ${userId}`);
    if (searchIcon) {
        searchIcon.style.display = "inline-block";
    }
    // Increase the counter for the clicked element by 1
    const clickedCounterElement = document.getElementById(`counter${userId}`);
    if (clickedCounterElement) {
        let count = parseInt(clickedCounterElement.dataset.count || "0");
        count++;
        clickedCounterElement.textContent = count.toString();
        clickedCounterElement.dataset.count = count.toString();
        clickedCounterElement.style.display = "inline";
    }
    // Decrease the counter for not clicked elements by -1
    // const allCounters = document.querySelectorAll("#usersList span");
    // allCounters.forEach((counterElement) => {
    //   const currentUserId = counterElement.id.replace("counter", "");
    //   if (currentUserId !== "" && currentUserId != userId) {
    //     let count = parseInt(counterElement.dataset.count) || 0;
    //     count--;
    //     counterElement.textContent = `${count}`;
    //     counterElement.dataset.count = count;
    //     counterElement.style.display = "inline";
    //   }
    // });
}
const search = () => {
    const searchElement = document.getElementById("search");
    const searchValue = searchElement.value.toLowerCase();
    if (searchIcon) {
        searchIcon.style.display = "none";
    }
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
                let count = parseInt(localStorage.getItem(`counter${user.id}`) || "0");
                usersList.innerHTML += `<li data-id="${user.id}" onClick="handleUserClick(${user.id})">
          <b>ID</b>: ${user.id};
          <b>Name:</b> ${user.name}
          <b><span style="display: none" id="counter${user.id}">${count}</span></b>
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
    // Create a copy of the users array
    let updatedUsers = [...users];
    // Find the index of the user in the users array
    const indexToRemove = users.findIndex((user) => user.id === userId);
    if (indexToRemove !== -1) {
        // Remove the user from the copied array
        updatedUsers.splice(indexToRemove, 1);
        // Update the users array with the copied array
        users = updatedUsers;
        // Remove the user from the DOM
        const liToRemove = document.querySelector(`#usersList li[data-id="${userId}"]`);
        if (liToRemove) {
            liToRemove.remove();
        }
        // Remove the counter from localStorage
        localStorage.removeItem(`counter${userId}`);
    }
};
