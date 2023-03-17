const CommentsList =({ comments }) => {

    if((comments === undefined) || (comments === null) || (comments.length === 0)){
        return null;
    }
    return(
        <>
            <h3>Comments:</h3>
            {
                comments.map(comment => (
                    <div className="comment" key={comment.email + ": " + comment.text}>
                        <h4>{comment.email}</h4>
                        <p>{comment.text}</p>
                    </div>
                ))
            }
        </>
    )
}

export default CommentsList;