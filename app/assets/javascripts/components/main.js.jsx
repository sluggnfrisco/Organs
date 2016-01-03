var Main = React.createClass({
  getInitialState: function() {
    return {};
  },
  
  render: function() {
    return(
      <div className='main'>
        <div className='organ-container'>
          <Organ></Organ>
        </div>
        <div className='recorder-container'>
          <Recorder></Recorder>
        </div>
      </div>
    );
  },
});
