var app = {};
app.server = 'https://api.parse.com/1/classes/chatterbox';
app.rooms = {};
// fetch the server for new messages
app.fetch = function(){
  // Fetch the server and push into the page
  $.ajax({
    // always use this url
    url:  app.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      //creat a loop that iterates over data and send to messageCreate function.
      app.splitRooms(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

app.send = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};
// update the feed's html
app.updateFeed = function(){};
// create the necessary html's elements for the message to insert into the feed
app.addMessage = function(message){
  // create HTML's elements
  // var div = $('<div class="message">'),
  //     h4 = $('<h4>'),
    var p = $('<p>');
  // Sets the message's content into the elements
  // $(h4).text(message.username);
  $(p).text(message.text);
  // Creates the chain
  $('#chats').append(p);
};
app.addRoom = function(roomName){
  var a = $('<a>');

  $(a).text(roomName);

  $('#roomSelect').append(a);
}
app.splitRooms = function(array){

  for(var i = 0; i < array.results.length; i++ ){
    var roomName = array.results[i].roomname;
    var message = array.results[i];

    // Checks whether room has name
    if(roomName !== undefined && roomName !== ""){
      // If there's no room, create a new property
      if(!this.rooms[roomName]){
        this.rooms[roomName] = [];
      }
      // push the message to the room
      this.rooms[roomName].push(message);
    }
    //update the feed property
    this["feed"] = !this["feed"] ? [] : array.results;
  }
};

app.clearMessages = function(){
  $("#chats").html("");
}

//start the application.
app.init = function(){
  this.fetch();
};

//start the application
app.init();




/* ========== EVENT HANDLERS ===========
======================================*/

// When user submit new message
$('#newMessage').on('submit', function(){
alert('');
})





