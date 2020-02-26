// alert('grrrrr');
$(function(){


    
    //make connection
    var socket = io.connect('http://localhost:3000');

    //set inputs and buttons
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#sendMessage");
    var changeUsername = $("#changeUsername");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");

    //emit change username in socket
    changeUsername.click(function(){
        console.log(username.val());
        socket.emit('change_username', {username : username.val()})
        alert("Username Changed to "+ username.val());
    })

    //Emit message sending
    send_message.click(function(){
        //console.log(message.val());
        socket.emit('new_message', {message : message.val()})
    })

    //listen for new message
    socket.on('new_message', (data)=>{
        console.log(data);
        chatroom.append("<div class='mess'><em><strong class='text-danger'>" + data.username + "</em></strong><p></p><p>" + data.message + "</p> </div>")
    });

    //show that someone is typing
    message.bind("keypress", ()=>{
        // alert(username + " is typing....");
        socket.emit('typing');
    })

    //listen on typing
    socket.on('typing', (data) => {
        console.log(data.username + " is typing....");
        feedback.html("<p><i>" + data.username + " is typing...." + "</i></p>");
    })

    send_message.on("mouseover", ()=>{
        // alert(username + " is typing....");
        socket.emit('notyping');
    })
 

     //listen on not typing
     socket.on('notyping', (data) => {
        console.log(data.username + " is not typing....");
        feedback.html("");
    })
});