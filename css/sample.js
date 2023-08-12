document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chat');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    async function sendMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.textContent = message;
        chatContainer.appendChild(userMessage);

        try {
            const response = await fetch('/api/chat-gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            const data = await response.json();

            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai-message';
            aiMessage.textContent = data.message;
            chatContainer.appendChild(aiMessage);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    sendButton.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            userInput.value = '';
            sendMessage(message);
        }
    });

    userInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            const message = userInput.value.trim();
            if (message) {
                userInput.value = '';
                sendMessage(message);
            }
        }
    });
});
