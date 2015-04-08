$(document).ready(function(){

  app = {};
  app.userName = prompt('What is your name?') || 'anonymous';
  app.server ='https://api.parse.com/1/classes/chatterbox';
  app.currentRoom = "nothing";
  app.rooms = {};


  // fetch the server for new messages
  app.fetch = function(){
    // Fetch the server and push into the page
    $.ajax({
      // always use this url
      url:  app.server,
      type: 'GET',
      contentType: 'application/json',
      data: {order: "-updatedAt"},
      // data: 'order=-updatedAt',
      success: function (data) {
        
        app.updateFeed(data);
        //creat a loop that iterates over data and send to messageCreate function.
        app.splitRooms(data);
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };
  //builds a message with the three elements we need to send to server.
  app.messageBuilder =function(text, userName, room){
    //gtes username from config page.
    userName = userName || app.userName;
    //eventually going to be the current room we are in. 
    room = 'main';
     
    return {'username': userName,
            'text': text,
            'roomname': room
            };

  }

  app.send = function(message){
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function () {
        console.log('chatterbox: Message sent');
      },
      error: function () {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  };
  // update the feed's html
  app.updateFeed = function(feedArray){
      $('#chats').html('');
    //iterate over feedArray
    for(var i=0; i<feedArray.results.length; i++){
      if(feedArray.results[i].room === app.currentRoom){
        var div = $('<div class="message">');
        var h4 = $('<h4>');
        var p = $('<p>');
        // Sets the message's content into the elements
        $(h4).text(feedArray.results[i].username);
        $(p).text(feedArray.results[i].text);
        // Creates the chain
        $('#chats').append(div).append(h4).append(p);
      }
    }
     // create HTML's elements
  };

  // create the necessary html's elements for the message to insert into the feed
  app.addMessage = function(message){
    // create HTML's elements
    var div = $('<div class="message">');
    var h4 = $('<h4>');
    var p = $('<p>');
    // Sets the message's content into the elements
    $(h4).text(message.username);
    $(p).text(message.text);
    // Creates the chain
    $('#chats').html("");
    $('#chats').append(div).append(h4).append(p);
  };

  app.splitRooms = function(array){

    for(var i = 0; i < array.results.length; i++ ){
      var roomName = array.results[i].roomname;
      var message = array.results[i];
      if(roomName === undefined){
        roomName = "main";
      }
      roomName = roomName.replace(/[^\w\d]/gi, '');
      // Checks whether room has name
      if(roomName !== undefined && roomName !== ""){
        // If there's no room, create a new property
        if(!app.rooms[roomName]){
          app.rooms[roomName] = [];
        }
        
        // push the message to the room
        app.rooms[roomName].push(message);
      }
      //update the feed property
      this["feed"] = !this["feed"] ? [] : array.results;
    }
     app.addRoom();
  };

  app.addRoom = function(){
    for(var key in app.rooms){
    
      if($("#" + key).length === 1){
        continue;
      }

      var button = $('<button class="roomButtons">').attr("id", key);

    $(button).text(key);

    $('#roomSelect').append(button);
    }
  }

  app.clearMessages = function(){
    $("#chats").html("");
  }

  //start the application.
  app.init = function(){
    app.fetch();
    setInterval(app.fetch, 500);
  };

  //start the application
  app.init();

 




  /* ========== EVENT HANDLERS ===========
  ======================================*/
//catches text from submit feild.
  $("#newMessage").on('submit', function(){
    event.preventDefault();
    app.send(app.messageBuilder( $('#messageBox').val(), app.userName ));
    $('#messageBox').val('');
  });

  $("#roomSelect").on('click',  '.roomButtons', function(){
    console.log("you clicked!");
    app.currentRoom = $(this).val();
    app.fetch();
  });

  // Call fetch on button click, fetch then gets info from server and 
  // calls the splitrooms function and update feed function. 
  // $("#fetchButton").on('click', function(){
  //   app.fetch();
  //   console.log("you clicked it!");
  // });


});



