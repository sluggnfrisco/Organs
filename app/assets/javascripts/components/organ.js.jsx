var Organ = React.createClass({
  getInitialState: function() {
    return {};
  },
  
  componentDidMount: function() {},
  
  componentDidUnmount: function() {},
  
  render: function() {
    var noteNames = Object.keys(TONES)
    return(
      <div className='organ'>
        {
          noteNames.map( function(noteName) {
            return <Key noteName={noteName}></Key>
          })
        }
      </div>
    );
  },
});
