import { useParams } from "react-router-dom";
import articles from "./article-content";

const ArticlePage = () => {
    const params = useParams();
    const { articleId } = params;   
    const article = articles.find( (article) => article.name === articleId);

    return(
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </>
    );
}

export default ArticlePage;