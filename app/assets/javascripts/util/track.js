(function(root) {
  var Track = root.Track = function(attrs) {
    var defaults = { name: '', roll: [], };
    //PH: useful for merging defaults
    this.attributes = $.extend(defaults, attrs || {})
  };
  
  Track.prototype = {
    startRecording: function () {
      this.attributes.roll = [];
      this.startTime = Date.now();
    },
    
    // notes are an array of note names currently being pressed
    addNotes: function(notes) {
      var timeSlice = {
        notes: notes.slice(),
        timeElapsed: this._getTimeElapsed(),
      };
      
      this.attributes.roll.push(timeSlice);
    },
    
    stopRecording: function() {
      var timeSlice = {
        notes: [],
        timeElapsed: this._getTimeElapsed(),
      };
      
      this.attributes.roll.push(timeSlice);     // roll is made of timeSlices
      console.log(this.attributes.roll);
    },
    
    play: function() {
      var roll = this.attributes.roll;
      if (this.intervalId || roll.length === 0) {return;}
      
      var playbackStartTime = Date.now(),
          sliceIdx = 0,
          initialInterval = roll[sliceIdx].timeElapsed;
      
      // PH: some BRILLIANT throttling action
      // PH: solutions are dumb and check every millisecond
      var playNextNote = function() {     //PH: WHAT IF THIS AINT ANONYMOUS?
        clearInterval(this.intervalId);
        var slice = roll[sliceIdx];
        
        KeyActions.updateKeys(slice.notes);
        if (sliceIdx + 1 >= roll.length) {
          return;   // REML we're calling sliceIdx + 1 below...
        }
        
        // set new interval according to time difference
        newInterval = roll[sliceIdx + 1].timeElapsed - slice.timeElapsed;
        sliceIdx += 1;
        this.intervalId = setInterval(playNextNote, newInterval);
      }.bind(this);
      
      // kick off the throttling...
      this.intervalId = setInterval(playNextNote, initialInterval);
    },
    
    _getTimeElapsed: function() {
      return Date.now() - this.startTime;
    },
  };
  
}(window));     //PH: can't have semicolon before final closing parens. throws errors inside the IIFE
