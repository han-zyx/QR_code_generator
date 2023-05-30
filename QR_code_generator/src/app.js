const express = require('express');
const app = express();

const port = process.env.port || 3800 ;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/" , (req,res,next) => {
    res.render('index')
});

app.listen(port,console.log(`Listening on port ${port}`));


