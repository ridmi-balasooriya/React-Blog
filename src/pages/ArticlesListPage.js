import { Link } from 'react-router-dom';
import articles from './article-content';

const ArticlesListPage = () => {
    return(
        <>
            <h1>Articles</h1>
            {
                articles.map((article) => 
                    (
                        <div className='article-snippet' key={article.name}>
                            <h3>{article.title}</h3>
                            <p>{article.content[0].substring(0, 150)}...</p>
                            <Link to={`/articles/${article.name}`}>Read More</Link>
                        </div>
                    )
                )
            }
        </>
    );
}

export default ArticlesListPage;