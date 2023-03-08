import { Link, useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
    const params = useParams();
    const { articleId } = params;   
    const article = articles.find( (article) => article.name === articleId);

    if(!article){
        return <NotFoundPage />
    }

    return(
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>  
            ))}
            <Link to={'/articles'} className='button'>Back to Articles</Link>
        </>
    );
}

export default ArticlePage;