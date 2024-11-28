document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Login successful: ' + data.user);
            window.location.href = `/chat`;
        } else {
            alert('Error: ' + data.msg);
        }
    } catch (err) {
        console.error('Error:', err);
    }
});