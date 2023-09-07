import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import qr from 'qr-image';
import fs from 'fs';


const __dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
const port=3000;

app.use(express.static('./'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

app.post("/QR",(req,res)=>{
     
    var link=req.body['link'];
    var com = link.includes('.com');

    if (com == true){

        var qr_png = qr.image(link);
        var qr_pdf = qr.image(link,{type : "pdf"});
        qr_png.pipe(fs.createWriteStream('qr_image.png'));
        qr_pdf.pipe(fs.createWriteStream('qr_image.pdf'));
        res.sendFile(__dirname+"/index1.html"); 
    }
    else {
        res.sendFile(__dirname+'/index2.html');
    }
});

app.listen(port,()=>{
    console.log("Its Running")
});