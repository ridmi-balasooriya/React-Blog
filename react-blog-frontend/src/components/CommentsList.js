const CommentsList =({ comments }) => {
    
    if(comments.length === 0){
        return null;
    }
    
    return(
        <>
            <h3>Comments:</h3>
            {
                comments.map(comment => (
                    <div className="comment" key={comment.postedBy + ": " + comment.text}>
                        <h4>{comment.postedBy}</h4>
                        <p>{comment.text}</p>
                    </div>
                ))
            }
        </>
    )
}

export default CommentsList;