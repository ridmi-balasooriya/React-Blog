import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import AddCommnetForm from "../components/AddCommentForm";
import NotFoundPage from "./NotFoundPage";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const params = useParams();
    const { articleId } = params;

    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments: [], canUpvote:false});

    const { user, isLoading } = useUser();
    
    useEffect(() => {

        const loadArticleInfor = async() => {
            const token = user && await user.getIdToken();
            
            const headers =token ? {authtoken: token} : {};
            
            const response = await axios.get(`/api/articles/${articleId}`, { headers });
            
            const newArticleInfo = response.data;
            
            setArticleInfo(newArticleInfo);
        }
        
        if(!isLoading){
            loadArticleInfor();
        }
        
        
    }, [isLoading, user]);

       
    const article = articles.find( (article) => article.name === articleId);

    const addUpvote = async () => {        

        const token = user && await user.getIdToken();
        
        const headers = token ? { authtoken: token } : {};
            
        const response = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });

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
                {user 
                    ? ( articleInfo.canUpvote 
                        ? <button className="button upvotebtn" onClick={addUpvote}>Upvote</button>
                        : <button className="button upvotebtn upvoted" onClick={addUpvote} >Upvoted</button>
                    )
                    : <Link to={'/login'} className='button upvotebtn'>Log in to upvote</Link>                
                }
                
                This article has {articleInfo.upvotes} upvote(s)                
            </p>
            {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>  
            ))}

            {user
                ? <AddCommnetForm articleName={articleId} onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)} />
                : <Link to={'/login'} className='button upvotebtn'>Log in to add a comment</Link>
            }
            
            
            <CommentsList comments={articleInfo.comments} />

            <Link to={'/articles'} className='button'>Back to Articles</Link>
        </>
    );
}

export default ArticlePage;