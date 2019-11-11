{
    // method to prevwnt data to submit form
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
                    $('#posts-lists-container > ul').prepend(newPost);
                    deletePost($('. delete-post-button',newPost));
                    console.log(data);
                },error:function(error){
                    console.log(error.responseText);
                }
                
            });
        });
    }
    //method to create Post in DOM
    let newPostDom = function(post){
        console.log(post._id);
        return $(`<li id='post-${(post._id)}'>
        <p>
            <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id}">Delete Post</a>
        
            </small>
            ${post.content}
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


    //method to delete post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();
        });

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                $(`#post-${data.data.post_id}`).remove();

            },error:function(error){
                console.log(error.responseText);
            }
        });
    }





    createPost();

    








}