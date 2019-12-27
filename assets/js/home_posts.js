{
    // method to prevent data to submit form
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();


            $.ajax({
                type: 'post',
                url: "/posts/create",
                data: newPostForm.serialize(), // convert it into JSON format
                success: function (data) {
                    let  newPost = newPostDom(data.data.post);
                    $('#posts-lists-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                    console.log(data.data.post);
                },error : function(error){
                    console.log(error.responseText);
                }
                
            });
        });
    }



    //method to delete post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
        

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                $(`#post-${data.data.post_id}`).remove();

            },error:function(error){
                console.log(error.responseText);
            }
        });

    });
    }


        //method to create Post in DOM
        let newPostDom = function(post){
            console.log(post._id);
            return $(`<li id="post-${post._id}">
            <p> 
                <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="fas fa-trash-alt"></i></a>
            
                </small>
                ${post.content}
                
                <small>
                <a class="like-post-button" data-likes ="0" href="/likes/toggle/?id=${post._id}$type=Post>"><i class="fas fa-thumbs-up"></i>
                    0
                
                </a>
                </small>
                <br>
                <small>
                ${post.user.name}       
                </small>
                </p>
                   
    
    
            <div class="post-comments">
                
                <form action ='/comments/create' method="POST">
                        <input type ="text" name = "content" placholder="Type here to add Comment" required>
                        <input type="hidden" name="postid" value="${post._id}">
                        <input type="submit" value="Add Comment">
                        
                </form>
            
            <div class = "post-comments-lists">
                <ul id="post-comments-${post._id}"
                        
                        
                
                </ul>
                
            </div>
            </div>
            </li>
            
        `);
    }



    function openForm() {
        document.getElementById("user-chat-box").style.display = "block";
      }
      
      function closeForm() {
        document.getElementById("user-chat-box").style.display = "none";
      }





    createPost();


    


}