import Swal from "https://cdn.skypack.dev/sweetalert2@11.1.2";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (adminLogin(username, password)) {
    showModal("Login berhasil!", "success");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);
  } else {
    showModal("Login gagal! Silakan coba lagi.", "error");
  }
});

const adminData = {
  username: "admin",
  password: "admin123",
};

function adminLogin(username, password) {
  if (username === adminData.username && password === adminData.password) {
    return true;
  } else {
    return false;
  }
}

function showModal(message, icon) {
  Swal.fire({
    title: icon === "success" ? "Selamat!" : "Gagal!",
    text: message,
    icon: icon,
    confirmButtonText: "Tutup",
    timer: 1500, // Duration of the alert message in milliseconds
    timerProgressBar: true,
    showClass: {
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",
      icon: "swal2-icon-show",
    },
    hideClass: {
      popup: "swal2-hide",
      backdrop: "swal2-backdrop-hide",
      icon: "swal2-icon-hide",
    },
  });
}
