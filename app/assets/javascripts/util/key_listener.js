$(function() {
  
  // From Z rightwards...
  var KEY_MAPPINGS = {
    '90': 'F#4/Gb4',
    '88': 'G4',
    '67': 'G#4/Ab4',
    '86': 'A4',
    '66': 'A#4/Bb4',
    '78': 'B4',
    '77': 'C5',
    '188': 'C#5/Db5',
    '190': 'D5',
    '191': 'D#5/Eb5',
  }

  $(document).on('keydown', handleKeyPress);
  $(document).on('keyup', handleKeyRelease);
  
  // ERR: need to declare function this way rather than assignment, else won't get hoisted. Solutions do the function in-line
  function handleKeyPress (e) {
    var keyName = KEY_MAPPINGS[e.keyCode];
    if (typeof keyName === 'undefined') {
      return;
    }
    KeyActions.keyPressed(keyName);    
  };
  
  function handleKeyRelease (e) {
    var keyName = KEY_MAPPINGS[e.keyCode];
    if (typeof keyName === 'undefined') {
      return;
    }
    KeyActions.keyReleased(keyName);
  };
});      //PH:** ERR REM for some reason, you can't have a semicolon after the IIFE
