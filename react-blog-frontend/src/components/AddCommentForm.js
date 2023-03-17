import { useState } from "react";
import axios from "axios";
import useUser from '../hooks/useUser';

const AddCommnetForm = ({ articleName, onArticleUpdated }) => {
    
    const [commentText, setCommentText] = useState('');
    const { user } = useUser();

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        
        const response = await axios.post(`/api/articles/${articleName}/comments`, {
            text: commentText,
        }, {
            headers,
        });

        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setCommentText('');

    }

    return(
        <div id='add-comment-form'>
            <h3>Add a Comment</h3>
            {user && <p>Posted By: {user.email}</p>}
            <label>
                <textarea rows='4' cols='5' value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
            </label>
            <button className="button" onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommnetForm;