import express from 'express';
import http from "http";
import {deposit} from "../bank/deposit";
const app = express();

let transactionsRepository = {
    save(amount: number) {
        throw new Error('Not Implemented Yet');
    }
};


app.use(express.json());

app.post('/deposit', (req, res) => {
    const { amount } = req.body
    deposit(amount, transactionsRepository)
    res.send()
});

app.post('/withdraw', (req, res) => {
    res.send()
});

app.get('/transactions', (req, res) => {

    res.send([])
});

export function startApi(port: number): Promise<http.Server> {
    return new Promise(resolve => {
        const api = app.listen(port, () => {
            resolve(api);
        })
    })
}
