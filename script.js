// Create a separate module getUsers.js that generates an
// array of 100 users:
// - {id: 1, name: ‘User 1’}
// - {id: 2, name: ‘User 2’}
const usersList = document.getElementById("usersList");
const searchIcon = document.getElementById("searchIcon");

generateUsers = () => {
  let users = [];
  for (let i = 1; i <= 100; i++) {
    users.push({ id: i, name: "User " + i });
  }
  // console.log("Users:", users);
  return users;
};

displayUsers = () => {
  usersList.innerHTML = "";
  document.getElementById("search").value = "";
  let users = generateUsers();
  searchIcon.style.display = "inline-block";

  // Clear localStorage for counters before updating the UI
  users.forEach((user) => {
    localStorage.removeItem(`counter${user.id}`);
  });

  // Iterate through users to create and append list items
  users.map((user) => {
    let count = parseInt(localStorage.getItem(`counter${user.id}`)) || 0;

    // Check if the count is not 0, then append the counter span
    if (count !== 0) {
      usersList.innerHTML += `<li onClick="handleUserClick(${user.id})>
      <b>ID</b>: ${user.id};
      <b>Name:</b> ${user.name};
      <span id="counter${user.id}"></span></li>
    `;
    } else {
      usersList.innerHTML += `<li onClick="handleUserClick(${user.id})">
    <b>ID</b>: ${user.id};
    <b>Name:</b> ${user.name};
    <b><span style="display: none;" id="counter${user.id}"></span></li></b>
    `;
    }
  });
};

function handleUserClick(userId) {
  // console.log(`handleUserClick called for user ${userId}`);
  searchIcon.style.display = "inline-block";

  // Increase the counter for the clicked element by 1
  const clickedCounterElement = document.getElementById(`counter${userId}`);
  if (clickedCounterElement) {
    let count = parseInt(clickedCounterElement.dataset.count) || 0;
    count++;
    clickedCounterElement.textContent = count;
    clickedCounterElement.dataset.count = count;
    clickedCounterElement.style.display = "inline";
  }

  // Decrease the counter for not clicked elements by -1
  const allCounters = document.querySelectorAll("#usersList span");

  allCounters.forEach((counterElement) => {
    const currentUserId = counterElement.id.replace("counter", "");

    if (currentUserId !== "" && currentUserId != userId) {
      let count = parseInt(counterElement.dataset.count) || 0;
      count--;
      counterElement.textContent = `${count}`;
      counterElement.dataset.count = count;
      counterElement.style.display = "inline";
    }
  });
}

function search() {
  let users = generateUsers();
  const searchValue = document.getElementById("search").value.toLowerCase();
  searchIcon.style.display = "none";
  // console.log("SearchValue: ", searchValue);
  let filteredUsers = users.filter((user) => user.name.includes(searchValue));
  // console.log("filtered: ", filteredUsers);
  if (
    usersList.innerHTML == "" ||
    usersList.innerHTML ==
      `<li><b style="color: red;">Press generate button first.</b></li>`
  ) {
    usersList.innerHTML = `<li><b style="color: red;">Press generate button first.</b></li>`;
  } else if (usersList.innerHTML !== "" && filteredUsers.length > 0) {
    usersList.innerHTML = "";
    filteredUsers.map((user) => {
      // let count = parseInt(localStorage.getItem(`counter${user.id}`)) || 0;

      usersList.innerHTML += `<li onClick="handleUserClick(${user.id})">
          <b>ID</b>: ${user.id};
          <b>Name:</b> ${user.name};
          <b><span style="display: none" id="counter${user.id}"></span></b>
        </li>`;
    });
  } else if (filteredUsers.length === 0) {
    usersList.innerHTML = `<li><b style="color: red;">No match found.</b></li>`;
  }
}
