const isLoggedIn = localStorage.getItem("token");
const loginLink = document.getElementById("login-link");
const profileLink = document.getElementById("profile-link");

if (isLoggedIn) {
  loginLink.classList.add("hidden");
  profileLink.classList.remove("hidden");
} else {
  loginLink.classList.remove("hidden");
  profileLink.classList.add("hidden");
}
