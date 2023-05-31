const express = require('express');
const app = express();
const ejs = require('ejs');
const path =  require('path');
const qrcode = require('qrcode')

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
        res.render("scan", {
            qr_code: src,
        });
    });
});


app.listen(port,console.log(`Listening on port ${port}`));


