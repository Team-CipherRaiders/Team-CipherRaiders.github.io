document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput) {
        addMessageToChat('کاربر: ' + userInput, 'user');
        document.getElementById('user-input').value = '';

        if (userInput.includes("سازنده")) {
            addMessageToChat('AI: سازنده من دکتر صادقی است.', 'ai');
        } else {
            fetch(`https://heroapi.ir/api/duckduckgo/chat?query=${encodeURIComponent(userInput)}&model=gpt-4o-mini&timeout=20`)
                .then(response => response.json())
                .then(data => {
                    if (data && data.message) {
                        addMessageToChat('AI: ' + data.message, 'ai');
                    } else {
                        addMessageToChat('AI: مشکلی پیش آمده، لطفاً دوباره تلاش کنید.', 'ai');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    addMessageToChat('AI: مشکلی در ارتباط با سرور وجود دارد.', 'ai');
                });
        }
    }
}

function addMessageToChat(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;
}
