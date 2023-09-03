const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/:date', (req, res) => {
    const date = req.params.date;

    const unixTimestamp = parseInt(date);

    if(isNaN(unixTimestamp) || unixTimestamp < 0 || unixTimestamp > 9999999999999 ){
        res.status(400).json({error: 'Invalid date format'});
    } else {
        const unix = unixTimestamp
        const utc = new Date(unixTimestamp).toUTCString();
        res.json({ unix, utc });
    }
});

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});