{
    //method to prevent data to submit

    let createComment = function()
    {
        let newCommentForm = $('#new-comment-form');
        newCommentForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: "/comments/create",
                data: newCommentForm.serialize(), // convert it into JSON format
                success: function (data) {
                    let newComment = newCommentDOM(data.data.comment);
                        $('#post-comments-lists>ul').prepend(newComment);
                        deleteComment($(' .delete-comment-button',newComment));
                        console.log(data.data.comment);  
                },error: function(error){
                    console.log(error.responseText);
                }
                
            });
        });



    }

    deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();


            $.ajax({
                type : 'get',
                url : $(deleteLink).prop('href'),
                success: function(data){
                    $(`#comment-${data.data.comment_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }

            });



        });

    }


    let newCommentDOM = function(comment){

        return $(`<li id = "comment-${comment._id}>">
        <p> 
    <small>
            <a href="/comments/destroy/${comment._id}"><i class="fas fa-trash-alt"></i></a>
    
    </small>
            
            ${comment.content}
                    <small>
                    <a class="like-post-button" data-likes ="0" href="/likes/toggle/?id=<${comment._id}>&type=Comment"><i class="fas fa-thumbs-up"></i>
                    ${comment.likes.length}<i class="fas fa-thumbs-up"></i>
                    
                    </a>
                
                    </small>
            <br>
            <small>
                ${comment.user.name}
            </small>
    </p>
    
    
    
    
    </li>`);

    }

    createComment();
}