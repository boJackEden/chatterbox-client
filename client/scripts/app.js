

var Module = (function(){
  var app = {};

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
        for(var i = 0; i < data.results.length; i++ ){
          messageCreate(data.results[i]);
        }
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

  return app;
})();



