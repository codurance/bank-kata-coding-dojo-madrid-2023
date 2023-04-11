import express from 'express';
import http from "http";
const app = express();
app.use(express.json());

app.get('/hello-world', (req, res) => {
    res.json({
        message: 'hello world'
    });
});

export function startApi(port: number): Promise<http.Server> {
    return new Promise(resolve => {
        const api = app.listen(port, () => {
            resolve(api);
        })
    })
}
