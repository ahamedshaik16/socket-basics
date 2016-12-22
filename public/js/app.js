var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server');
});


// socket.on('message', function (message) {
// 	var momentTimestamp = moment.utc(message.timestamp);
// 	console.log('New message:');
// 	console.log(message.text);

// 	jQuery('.messages').append('<p><strong>'+momentTimestamp.local().format('h:mm a') + ':</strong>' +message.text+'</p>');
// });

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + momentTimestamp.local().format('h:mm a') + '</strong> ' + message.text + '</p>');
	
	$messages.append($message);
});

var $form = jQuery('#message-form');

$form.on('submit', function() {
	event.preventDefault();
	var $message = $form.find('input[name=message]');
	socket.emit('message', {
		text : $message.val()
	});
	$message.val('');
});