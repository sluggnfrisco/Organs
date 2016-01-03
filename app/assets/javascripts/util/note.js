(function(root) {         //PH: REM we do IIFE to encapsulate STATE and create some sense of 'instance variables'

  var ctx = new (window.AudioContext || window.webkitAudioContext)();

  var createOscillator = function (freq) {
    var osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.detune.value = 0;
    osc.start(ctx.currentTime);
    return osc;
  };

  var createGainNode = function () {
    var gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(ctx.destination);
    return gainNode;
  };

  //PH: REM the IIFE. We need to set this on the root for it to be accessible elsewhere!
  var Note = root.Note = function (freq) {
    this.oscillatorNode = createOscillator(freq);
    this.gainNode = createGainNode();
    this.oscillatorNode.connect(this.gainNode);
  };

  Note.prototype = {
    start: function () {
      // can't explain 0.3, it is a reasonable value
      this.gainNode.gain.value = 0.3;
    },

    stop: function () {
      this.gainNode.gain.value = 0;
    }
  };

}(window));

// module.exports = Note;     // PH: this is for use with WebPacker
