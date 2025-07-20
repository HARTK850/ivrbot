const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const systemNumber = document.getElementById('systemNumber').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!validateSystemNumber(systemNumber) || !validatePassword(password)) {
        showError("נא לבדוק את מספר המערכת והסיסמה.");
        return;
    }

    sessionStorage.setItem('ivrSystemNumber', systemNumber);
    sessionStorage.setItem('ivrPassword', password);

    window.location.href = 'chat.html'; // מעבר לעמוד הראשי של האתר
});

function validateSystemNumber(number) {
    return /^\d{4,10}$/.test(number);
}

function validatePassword(pass) {
    return pass.length >= 4;
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}
