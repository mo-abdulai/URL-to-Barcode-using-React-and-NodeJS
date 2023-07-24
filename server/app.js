const path = require('path')
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser")
var qr = require ("qr-image")
const cors = require("cors");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());


app.post('/generateBarcode', async function(req, res){
    const  { url }  =  req.body;
try{
        var qr_svg = qr.image(url, {type: 'png'});
        res.type('png')
        qr_svg.pipe(res);

}catch(err){
    console.error(err)
    res.status(500).json({ error: 'Failed to generate barcode' });
}
    
});

app.listen(process.env.DEV_PORT || 8080, function(){
    console.log("Listening on port: " + process.env.DEV_PORT)
})
