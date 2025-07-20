const messagesContainer = document.getElementById('messages');
const userInput = document.getElementById('userInput');

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    // simulate AI thinking
    appendMessage('...', 'bot');

    sendToYemotAPI(text)
        .then(response => {
            removeLastBotMessage();
            appendMessage(response, 'bot');
        })
        .catch(err => {
            removeLastBotMessage();
            appendMessage('שגיאה בשליחה ל-API.', 'bot');
        });
}

function appendMessage(text, type) {
    const messageElem = document.createElement('div');
    messageElem.className = 'message ' + type;
    messageElem.textContent = text;
    messagesContainer.appendChild(messageElem);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeLastBotMessage() {
    const allMessages = document.querySelectorAll('.message.bot');
    if (allMessages.length > 0) {
        allMessages[allMessages.length - 1].remove();
    }
}

async function sendToYemotAPI(userText) {
    const systemNumber = sessionStorage.getItem('ivrSystemNumber');
    const password = sessionStorage.getItem('ivrPassword');

    if (!systemNumber || !password) {
        throw new Error('לא מחובר למערכת.');
    }

    const params = new URLSearchParams();
    params.append('ApiCode', password);
    params.append('SystemNumber', systemNumber);
    params.append('Action', 'PlayTTS');
    params.append('Text', userText);
    params.append('Voice', 'David'); // אפשר לשנות לפי הצורך

    const response = await fetch('https://www.call2all.co.il/ym/api/ApiServiceRequest.aspx', {
        method: 'POST',
        body: params
    });

    if (!response.ok) {
        throw new Error('שגיאת תקשורת');
    }

    const result = await response.text();
    return result.includes('OK') ? 'בוצע בהצלחה!' : 'תגובה לא צפויה: ' + result;
}
