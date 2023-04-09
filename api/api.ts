import express from 'express';
export const app = express();

app.get('/hello-world', (req, res) => {
    res.json({
        message: 'hello world'
    });
});
