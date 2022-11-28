const fs = require("fs/promises")
const express = require("express")
const cors = require("cors")
const _ = require("lodash")
const {v4: uuid}= require("uuid")

const app = express();

app.use(express.json());

app.get("/outfit",(req,res) => {

    const tops = ["Black","White","Orange","Navy"];

    const jeans = ["Grey","Dark Grey","Black","Navy"];

    const shoes = ["White","Grey","Black"];

    res.json({
        tops: _.sample(tops),
        jeans: _.sample(jeans),
        shoes: _.sample(shoes)
    });

});


app.post("/comments",async (req,res)=>{
    const id = uuid();
    const content = req.body.content;
    
    if(!content){
        return res.sendStatus(400);
    }

    await fs.mkdir("data/comments" , {recursive:true})
    
    await fs.writeFile(`data/comments/${id}.txt` , content )

    
    res.status(201).json({
        id:id
    });
})



app.get("/comments/:id" , async(req,res)=>{

    const id = req.params.id;

    let content;

    try {
        content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
    } catch (error) {
        return res.sendStatus(404)
    }

    res.json({
        content:content
    });
})

app.listen(5000 , () => {console.log('API is running ...')})
