let currentUser = '';
const userList = document.getElementById('user-list');

function fetchAllUsers() {
    fetch('/users/getAllUsers')
        .then(response => response.json())
        .then(data => {
            userList.innerHTML = '';
            data.forEach(user => {
                if(user.username === currentUser) return;
                CreateUser(user.username);
            });
        });
}

function CreateUser(username){
    const userElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.addEventListener('click', () => {
        deleteUser(username);
    });
    const userAvatar = document.createElement('div');
    userAvatar.innerHTML = username[0].toUpperCase();
    userAvatar.classList.add('user-avatar');
    const userName = document.createElement('div');
    userName.innerHTML = username;
    userName.classList.add('user-name');
    userElement.appendChild(userAvatar);
    userElement.appendChild(userName);
    userList.appendChild(userElement);
}

function fetchCurrentUser(){
    fetch('/users/getUserById')
        .then(response => response.json())
        .then(data => {
            currentUser = data.username;
        });
}

function logOut(){
    fetch('/users/logout')
        .then(response => response.json())
        .then(data => {
            if(data.message === 'Logged out successfully'){
                window.location.href = '/login'
            }
        });
}

function init(){
    fetchCurrentUser();
    fetchAllUsers();
}

function deleteUser(username){
    fetch(`/users/deleteUser/${username}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.message === 'User deleted successfully'){
            fetchAllUsers();
        }
    });
}

init();
