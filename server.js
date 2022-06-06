//const { request } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors());

const dbFiguarts = {
    "piccolo": {
        "figname" : "Piccolo",
        "number" : 1,
        "release" : "November 2009",
        "releasetype" : "General"
    },
    "supersaiyansongoku": {
        "figname" : "Super Saiyan Son Goku",
        "number" : 2,
        "release" : "January 2010",
        "releasetype" : "General"
    },
    "supersaiyansongohan": {
        "figname" : "Super Saiyan Son Gohan",
        "number" : 3,
        "release" : "July 2010",
        "releasetype" : "General"
    },
    "supersaiyanvegeta": { 
        "figname" : "Super Saiyan Vegeta",
        "number" : 4,
        "release" : "December 2011",
        "releasetype" : "Premium Bandai"
    },
    "unknown": {
        "figname" : "???",
        "number" : NaN,
        "release" : "???",
        "releasetype" : "???"
    },
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/api/', (req, res) => {
    res.json(dbFiguarts);
})

app.get('/api/:name', (req, res)=> {
    const passname = req.params.name.toLowerCase();
    //chect that the given request is in the api obj, then serve the nested obj
    if (dbFiguarts[passname]) {
        res.json(dbFiguarts[passname])
    }
    if (Object.keys(dbFiguarts).reduce((str, cur) => str + cur, "").includes(passname)) {
        let returnArr = [];
        for (let item in dbFiguarts) {
            console.log(item)
            if (item.includes(passname)) {
                returnArr.push(dbFiguarts[item]);
            }
        }
        res.json(returnArr);
    }

    res.json(dbFiguarts['unknown']);
})
//set environmental variable port or our own
app.listen(process.env.PORT || PORT, ()=> {
    console.log(`The server is now running on port ${PORT}`);
})