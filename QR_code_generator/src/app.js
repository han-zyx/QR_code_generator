const express = require('express');
const app = express();
const ejs = require('ejs');
const path =  require('path');
const qrcode = require('qrcode');


app.use(express.json());


const port = process.env.port || 3800 ;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const viewsPath = path.join(__dirname, '../FrontEnd');
app.use(express.static("public"));


app.set('view engine', 'ejs');
app.set('views',viewsPath);

app.get("/" , (req,res,next) => {
    res.render('index')
});

app.post("/scan", (req, res, next) => {
    const input_text = req.body.text;
    qrcode.toDataURL(input_text, (err, src) => {
        if (err) res.send("Something went wrong!!");


        console.log('{', input_text ,'}');


        res.render("scan", {
            qr_code: src,
        });
    });

});



app.post('/track-visitor', (req, res) => {
    const visitorData = req.body;
    // Process and store the visitor data as desired (e.g., in a database, log file, etc.)
    console.log(visitorData);

    res.sendStatus(200);
});







app.listen(port,console.log(`Listening on port ${port}`));


