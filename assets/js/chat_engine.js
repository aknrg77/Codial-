//client side 



// io() => defaults to trying to connect to the host that serves the page.
class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail

        //establishing a connection bet server and client
        this.socket = io.connect('http://localhost:5000');

    
    if(this.userEmail)
    {
        this.connectionHandler();
    }
}

    connectionHandler()
    {
        self = this;
        self.socket.on('connect',function(){ 
            console.log('Connection established using sockets :)');

            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom : 'codial'
            });

            self.socket.on('user_joined',function(data){
                console.log('a user joined !!',data);
            })
        });

        //Sending a messege on clicking send button 
        $('#send-button').click(function(){
            console.log("hello");
            let msg = $("#chat-message-input").val();
            if (msg!=''){
                self.socket.emit('send_message',{
                    message : msg,
                    user_email : self.userEmail,
                    chatroom : 'codial'

                });

            }

        });

        self.socket.on('recieve_message',function (data) {
            console.log("message recieved",data.message);
            
            let newMessage = $('<li>');

            let messageType = 'other-msg';

            if(data.user_email == self.userEmail){
                
                messageType = 'self-msg';
            }

            newMessage.append($('<span>',{
                'html' : data.message,
            }));

            newMessage.append($('<sub>',{
                'html' : data.user_email,
            }));

            newMessage.addClass(messageType);

            $("#msg-list").append(newMessage);

            

          });





    }



}

