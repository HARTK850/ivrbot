document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const passwordInput = document.getElementById("password");
  const togglePasswordBtn = document.getElementById("toggle-password");

  togglePasswordBtn.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePasswordBtn.textContent = type === "password" ? "👁️" : "🙈";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
      alert("יש למלא את כל השדות.");
      return;
    }

    try {
      const response = await fetch("https://www.call2all.co.il/ym/api/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.responseStatus === "OK") {
        sessionStorage.setItem("ivr_username", username);
        sessionStorage.setItem("ivr_password", password);
        window.location.href = "chat.html";
      } else {
        alert("שם משתמש או סיסמה שגויים.");
      }
    } catch (err) {
      console.error(err);
      alert("שגיאה בעת התחברות לשרת ימות המשיח.");
    }
  });
});
