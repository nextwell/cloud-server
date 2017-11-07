 let socket = io.connect('http://localhost:8081');

socket.on('news', function (data) {
	console.log(data);
});