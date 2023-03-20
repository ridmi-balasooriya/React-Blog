import fs from 'fs';
import path from 'path';
import admin from 'firebase-admin';
import express from "express";
import 'dotenv/config';
import { db, connectToDb } from './db.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** Adding Firebase Authentication and Initializing it */
const credentials = JSON.parse(
    fs.readFileSync('./credentials.json')
);
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});
/** END - Adding Firebase Authentication and Initializing it */

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get(/^(?!\/api).+/, (req, res, next) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
   
    if(authtoken){
        try{
            req.user = await admin.auth().verifyIdToken(authtoken);            
        }catch(e){
            return res.sendStatus(400);
        }
    }    
    req.user = req.user || {};
    next();
});

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;   
    const { uid } = req.user;

    const article = await db.collection('articles').findOne({ name });

    if(article){   
        const upvoteIds = article.upvoteIds || [];
        article.upvotes = article.upvotes || 0;
        article.canUpvote = uid && !upvoteIds.includes(uid);
        res.json(article);
    }else{
        res.sendStatus(404);
    }

});

app.use(async(req, res, next) => {

    if(req.user){      
        next();
    }else{
        res.sendStatus(401);
    }
});

app.put('/api/articles/:name/upvote',async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;    

    const article = await db.collection('articles').findOne({ name });
    
    if(article){
        
        const upvoteIds = article.upvoteIds || [];
        
        const canUpvote = uid && !upvoteIds.includes(uid);
        
        if(canUpvote){         
            await db.collection('articles').updateOne({ name }, {
                $inc: {upvotes: 1 },
                $push: { upvoteIds: uid }
            });
        }

        const updatedArticle = await db.collection('articles').findOne({ name });
        updatedArticle.canUpvote = false;
        res.json(updatedArticle);
    }else{
        res.send('That article doens\'s not exist.');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { text } = req.body;
    const { email } = req.user;

    await db.collection('articles').updateOne({ name }, { 
        $push: { comments: { email, text} }
    });
    const article = await db.collection('articles').findOne({ name });
    res.json(article);  
    
});

const PORT = process.env.PORT || 8000;

connectToDb(() => {
    console.log('Successfully connected to database');
    app.listen(PORT, () => {
        console.log('Server is listening on port ' + PORT);
    });
})