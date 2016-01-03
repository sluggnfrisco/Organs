var Recorder = React.createClass({
  getInitialState: function() {
    return {
      isRecording: false,
      track: new Track(),
    };
  },
  
  componentDidMount: function() {
  },
  
  componentWillUnmount: function() {
  },
  
  handleKeyStoreChange: function() {
    pressedKeys = KeyStore.getAll();
    //PH: QUESTION: why need to check if pressedKeys.length > 0?
    this.state.track.addNotes(pressedKeys)
  },
  
  startTrack: function() {      //QUESTION: need to go thru this trouble?
    KeyStore.addChangeListener(this.handleKeyStoreChange);
    this.state.track.startRecording();
  },
  
  stopTrack: function() {
    KeyStore.removeChangeListener(this.handleKeyStoreChange);
    this.state.track.stopRecording();
  },
  
  playTrack: function() {
    this.state.track.play();
  },
  
  render: function() {
    return (
      <div className='recorder'>
        <button className='recording-start'
                onClick={this.startTrack}>Start Recording</button>
        <button className='recording-stop'
                onClick={this.stopTrack}>Stop Recording</button>
        <button className='recording-playback'
                onClick={this.playTrack}>Play</button>
      </div>
    );
  },
});
