
var Module = (function(){

  var app = {};
  app.rooms = {};
  // fetch the server for new messages
  app.fetch = function(){
    // Fetch the server and push into the page
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
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

  app.post = function(){};
  // update the feed's html
  app.updateFeed = function(){};
  // create the necessary html's elements for the message to insert into the feed
  app.createMessage = function(){
    // create HTML's elements
    var div = $('<div class="message">'),
        h4 = $('<h4>'),
        p = $('<p>');
    // Sets the message's content into the elements
    $(h4).text(message.username);
    $(p).text(message.text);
    // Creates the chain
    $('#feed').append(div).append(h4).append(p);
  };

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

  //start the application.
  app.init = function(){
    this.fetch();
  };

  //start the application
  app.init();

  return app;

})();







