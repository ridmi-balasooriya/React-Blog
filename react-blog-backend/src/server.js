import express from "express";
import { db, connectToDb } from './db.js'

const app = express();

app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {

    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if(article){
        res.json(article);
    }else{
        res.sendStatus(404);
    }

});

app.put('/api/articles/:name/upvote',async (req, res) => {
    
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });
 
    if(article){
        await db.collection('articles').updateOne({ name }, { 
            $inc: {upvotes: 1 }
        });
        res.send(`The ${ name } article now has ${article.upvotes} upvotes.!`);
    }else{
        res.send('That article doesn\'t exist');
    }
    
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const article = await db.collection('articles').findOne({ name });
        
    if(article){
        await db.collection('articles').updateOne({ name }, { 
            $push: { comments: { postedBy, text} }
        });
        res.send(article);
    }else{
        res.send('That article doesn\'t exist');
    }
  
    
});

connectToDb(() => {
    console.log('Successfully connected to database');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})