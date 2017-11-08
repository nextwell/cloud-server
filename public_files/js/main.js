document.addEventListener("DOMContentLoaded", function(){

    // Initialize instances:
    var socket = io.connect('http://127.0.0.1:8081');
    var siofu = new SocketIOFileUpload(socket);

    // Configure the three ways that SocketIOFileUpload can read files:
    document.getElementById("upload_btn").addEventListener("click", siofu.prompt, false);
    siofu.listenOnInput(document.getElementById("upload_input"));
    siofu.listenOnDrop(document.getElementById("file_drop"));

    // Do something on upload progress:
    siofu.addEventListener("progress", function(event){
        var percent = event.bytesLoaded / event.file.size * 100;
        console.log(`Загружено на ${percent.toFixed(2)} процентов`);
    });

    // Do something when a file is uploaded:
    siofu.addEventListener("complete", function(event){
        console.log(event.success);
        console.log(event.file);
    });

}, false);
