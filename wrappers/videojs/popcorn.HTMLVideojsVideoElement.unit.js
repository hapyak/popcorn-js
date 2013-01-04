
var players = {},
  testData = {

  videoSrc: "http://video-js.zencoder.com/oceans-clip.mp4",
  expectedDuration: 151,

  createMedia: function( id ) {
    var wrapper = Popcorn.HTMLVideojsVideoElement( id );
    players[QUnit.config.current.testName] = wrapper;
    return wrapper;
  }
};

var qunitStart = start;
start = function() {
  // Give the video time to finish loading so callbacks don't throw
  var wrapper = players[QUnit.config.current.testName];
  delete players[QUnit.config.current.testName];

  setTimeout( function() {
    qunitStart();

    if (wrapper && wrapper._util && wrapper._util.destroy) {
      wrapper._util.destroy();
      return;
    }
    var video = document.querySelector( "#video" );
    while( video.hasChildNodes() ) {
      video.removeChild( video.lastChild );
    }
  }, 500 );
};
