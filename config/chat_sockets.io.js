// server side 
module.exports.chatSockets = function (http){

    const io = require('socket.io')(http);

    io.sockets.on('connection',function(socket){
        console.log('new connection recieved',socket.id);


        socket.on('disconnect',function(){
            console.log("Socket disconnected :(");

        });


        // room joining request
        socket.on('join_room',function(data){
            console.log('Joining request recieved',data);

            socket.join(data.chatroom);

            //sending back to user about sucessful joing of another user 
            io.in(data.chatroom).emit('user_joined',data);

            });

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('recieve_message',data);
            
            });
        
        });

}

