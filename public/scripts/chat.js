var socket = io();

var chatStatus = document.querySelector('#chat-status-message');
var chatDisplay = document.querySelector('.chat-display');
var chatMessage = document.querySelector('#chat-message');
var chatUsername = document.querySelector('#chat-username');
var chatLabel = document.querySelector('#chat-label-count');
chatDisplay.scrollTop = chatDisplay.scrollHeight;

if (chatStatus) {
    socket.on('connect', function () {
        chatStatus.innerHTML = 'connected';
        chatStatus.className = 'btn btn-success'
        socket.emit('updateCounts');

        socket.on('disconnect', function () {
            socket.emit('updateCounts');
        });


        socket.on('updateLabel', function (data) {
            chatLabel.innerHTML = data.count;
            console.log(data.type)
        });

        socket.on('updateMessages', function (data) {
            processChat(data.username, data.message);
        });

    });
}

if (chatMessage) {
    chatMessage.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            socket.emit('message', {
                username: chatUsername.value,
                message: chatMessage.value
            });
            chatMessage.value = '';
        }
    });
}

function processChat(name, message) {
    var newMessage = document.createElement('p');
    if (chatUsername.value == name) {
        newMessage.className = 'alert alert-dark';
    } else {
        newMessage.className = 'alert alert-info';
    }
    newMessage.innerHTML = '<strong>' + name + '</strong>: ' + message;
    chatDisplay.insertBefore(newMessage, chatDisplay.lastChild);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;

}
