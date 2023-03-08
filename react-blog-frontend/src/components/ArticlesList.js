import { Link } from 'react-router-dom';

export const ArticlesList = ({ articles }) => {
    return(
        <>
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
    )
}

