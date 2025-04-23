const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');

const registerForm = document.getElementById('register-form');
const loginFrom = document.getElementById('login-form');

const toggleTab = (tab) => {
    if (tab == 'login') {
        loginTab.style.display = 'block';
        registerTab.style.display = 'none';
    } else {
        loginTab.style.display = 'none';
        registerTab.style.display = 'block';
    }
}
toggleTab('login');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();
        if (res.ok) {
            alert('Registration successful!');
            toggleTab('login');
        } else {
            alert(data.message || 'Registration failed.');
        }
    } catch (err) {
        console.error('Error during registration:', err);
        alert('Something went wrong.');
    }
});

loginFrom.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            console.log(data.token);
            alert('Login successful!');
        } else {
            alert(data.message || 'Login failed.');
        }
    } catch (err) {
        console.error('Error during login:', err);
        alert('Something went wrong.');
    }
});

