const express = require('express'); //get express
const app = express(); //assign express to a usable constant



// app.use(express.static('public')); //middlewares
app.use(express.static('views'));

//get routes
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/index.html'));
})


//app listening port
server = app.listen(3000, function(){
    console.log("Chat is listening on port 3000");
});

const socketed = require('socket.io')(server);

//socket should listen on every connection
socketed.on('connection', (socket)=>{
    // socket in the bracket represents each client connected to the server

    console.log('New user Joined');

    //assign a default username
    socket.username = "Avatar";

    //listen to username when they change it using variable change_username
    socket.on('change_username', (data)=>{
        socket.username = data.username;
    });

    //listen on new_message
    socket.on('new_message', (data)=>{
        //display the message
        socketed.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //broadcast the message that someone is typing to everyone except the socket that started it
    socket.on("typing", (data)=>{
        socket.broadcast.emit("typing", {username: socket.username});
    });

    socket.on("notyping", (data)=>{
        socket.broadcast.emit("notyping", {username: socket.username});
    }) 
});
