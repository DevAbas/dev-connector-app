const express = require('express');
const port = process.env.PORT || 5000;
// Initialize express
const app = express();

app.get('/', (req, res) => res.send('Hello world'))

// Listen port
app.listen(() => console.log(`App is runing on port ${port}`))