import express from 'express';
const app = express();
app.get('/ads', (request, response) => {
    response.json([
        { id: 1, name: 'aaaa' },
        { id: 2, name: 'aaaa' }
    ]);
});
app.listen(3333);
