import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import AddCommnetForm from "../components/AddCommentForm";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
    const params = useParams();
    const { articleId } = params;
    
    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: []});
    
    useEffect(() => {
        const loadArticleInfor = async() => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo)
        }

        loadArticleInfor();
        
    }, [articleId])

       
    const article = articles.find( (article) => article.name === articleId);

    const addUpvote = async () => {
       
        const response = await axios.put(`/api/articles/${articleId}/upvote`);

        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);

    }


    if(!article){
        return <NotFoundPage />
    }

    return(
        <>
            <h1>{article.title}</h1>
            <p>
                <button className="button upvotebtn" onClick={addUpvote}>Upvote</button>
                This article has {articleInfo.upvotes} upvote(s)                
            </p>
            {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>  
            ))}

            <AddCommnetForm articleName={articleId} onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)} />

            <CommentsList comments={articleInfo.comments} />

            <Link to={'/articles'} className='button'>Back to Articles</Link>
        </>
    );
}

export default ArticlePage;