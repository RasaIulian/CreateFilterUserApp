// Create a separate module getUsers.js that generates an
// array of 100 users:
// - {id: 1, name: ‘User 1’}
// - {id: 2, name: ‘User 2’}
const usersList = document.getElementById("usersList");

generateUsers = () => {
  let users = [];
  for (let i = 1; i <= 100; i++) {
    users.push({ id: i, name: "User " + i });
  }
  console.log("Users:", users);
  return users;
};

displayUsers = () => {
  usersList.innerHTML = "";
  document.getElementById("search").value = "";
  let users = generateUsers();

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
    <span style="display: none;" id="counter${user.id}"></span></li>
    `;
    }
  });
};

// function search() {
//   let users = generateUsers();
//   const searchValue = document.getElementById("search").value.toLowerCase();

//   console.log("SearchValue: ", searchValue);
//   let filteredUsers = users.filter((user) => user.name.includes(searchValue));
//   console.log("filtered: ", filteredUsers);
//   if (usersList.innerHTML != "") {
//     usersList.innerHTML = "";
//     filteredUsers.map((user) => {
//       usersList.innerHTML += `<li><b>ID</b>: ${user.id},
//        <b>Name:</b> ${user.name}</li>`;
//     });
//   } else {
//     usersList.innerHTML = `<li><b style="color: red;">Press generate button first.</b></li>`;
//   }
// }

function handleUserClick(userId) {
  console.log(`handleUserClick called for user ${userId}`);

  // // Increase the counter for the clicked element by 1
  // const clickedCounterElement = document.getElementById(`counter${userId}`);
  // if (clickedCounterElement) {
  //   let count = parseInt(clickedCounterElement.dataset.count) || 0;
  //   count++;
  //   clickedCounterElement.textContent = `counter${userId}: ${count}`;
  //   clickedCounterElement.dataset.count = count;
  //   clickedCounterElement.style.display = "inline";
  // }

  // Decrease the counter for not clicked elements by -1
  const allCounters = document.querySelectorAll("#usersList span");

  allCounters.forEach((counterElement) => {
    const currentUserId = counterElement.id.replace("counter", "");

    if (currentUserId !== "" && currentUserId != userId) {
      let count = parseInt(counterElement.dataset.count) || 0;
      count--;
      counterElement.textContent = `counter: ${count}`;
      counterElement.dataset.count = count;
      counterElement.style.display = "inline";
    }
  });
}

function search() {
  let users = generateUsers();
  const searchValue = document.getElementById("search").value.toLowerCase();

  console.log("SearchValue: ", searchValue);
  let filteredUsers = users.filter((user) => user.name.includes(searchValue));
  console.log("filtered: ", filteredUsers);

  if (usersList.innerHTML != "") {
    usersList.innerHTML = "";
    filteredUsers.map((user) => {
      let count = parseInt(localStorage.getItem(`counter${user.id}`)) || 0;

      usersList.innerHTML += `<li onClick="handleUserClick(${user.id})">
        <b>ID</b>: ${user.id},
        <b>Name:</b> ${user.name},
        <span id="counter${user.id}"></span>
      </li>`;
    });
  } else {
    usersList.innerHTML = `<li><b style="color: red;">Press generate button first.</b></li>`;
  }
}
