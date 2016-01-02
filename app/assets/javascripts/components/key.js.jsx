var Key = React.createClass({
  getInitialState: function() {
    // not the purpose of this function but whatevs -- variable "declaration"
    this.note;
    return { isPressed: false };
  },
  
  componentDidMount: function() {
    var noteFreq = TONES[this.props.noteName];
    this.note = new Note(noteFreq);
    KeyStore.addChangeListener(this.handleNotePlay);
  },
  
  handleNotePlay: function(noteName) {
    var isInStore = KeyStore.checkPresence(this.props.noteName);  // QUESTION is this the right way to do?
    isInStore ? this.fireNote() : this.stopNote();
  },
  
  fireNote: function() {      //PH: ** won't keydown ALWAYS fire?? yes...
    if (this.state.isPressed) {return;}
    this.note.start();
    //PH: before, was manually re-triggering render. instead, just set isPressed
    this.setState({ isPressed: true });
  },
  
  stopNote: function() {
    if (!this.state.isPressed) {return;}
    this.note.stop();
    this.setState({ isPressed: false });
  },
  
  componentWillUnmount: function() {
    KeyStore.removeChangeListener(handleNotePlay.bind(this.props.noteName));
  },
  
  render: function() {
    var style = (this.state.isPressed ? 'active' : '')
    return (
      <div className={'note ' + style}>
        {this.props.noteName}
      </div>
    )
  }
});
