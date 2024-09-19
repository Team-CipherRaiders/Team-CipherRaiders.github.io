const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/chat', async (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).json({
            status: '400',
            error: 'Text parameter is required.'
        });
    }

    const apiUrl = `http://api-free.ir/api/chat.php?text=${encodeURIComponent(text)}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data.result) {
            return res.json({
                status: '200',
                Programmer: 'Dr.Sadeghi',
                username: '@Mr_Sequrity',
                Channel: '@api_code',
                result: data.result
            });
        } else {
            return res.status(500).json({
                status: '500',
                error: 'Invalid response from API.'
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: '500',
            error: 'Failed to fetch data from API.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
