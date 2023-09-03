const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/:date?', (req, res) => {
    const date = req.params.date;

    if(!date) {
        //date parameter empty, return the current time
        const currentTime = new Date().getTime();
        const utcDate = new Date(currentTime).toUTCString();
        res.json({ unix: currentTime, utc: utcDate });
    } else {

        // check date type i.e, millisec or date 
    if(isUnixInMilli(date)){
    const unixTimestamp = parseInt(date);
    const utcDate = new Date(unixTimestamp).toUTCString();
    res.json({ unix: unixTimestamp, utc: utcDate});
    } else{
        //for actual date
    const unixTimestamp = Date.parse(date);
    if(isNaN(unixTimestamp)){
        res.status(400).json({error: 'Invalid Date'});
    } else {
        const unix = unixTimestamp
        const utc = new Date(unixTimestamp).toUTCString();
        res.json({ unix, utc });
    }
    }
 }
});

function isUnixInMilli(input){
    const unixTimestamp = parseInt(input);
    return !isNaN(unixTimestamp) && input.length === 13;
}

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});