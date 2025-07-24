document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      alert("יש למלא את כל השדות.");
      return;
    }

    // שמירה זמנית בזיכרון הדפדפן (בהמשך נשתמש לזה לבקשות לימות המשיח)
    sessionStorage.setItem("ivr_username", username);
    sessionStorage.setItem("ivr_password", password);

    // מעבר לעמוד הראשי של הפלטפורמה
    window.location.href = "chat.html"; // ניצור קובץ זה בשלב הבא
  });
});
