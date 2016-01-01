// we pass the global Dispatcher here...
(function(dispatcher) {
  // wtf why we passing a dispatcher here?
}(Dispatcher))

var KeyStore = window.KeyStore = window.KeyStore || {}

// all stores must implement this!
KeyStore.__onDispatch = function (payload) {    // flux example actually has this as Dispatcher.register, not Store.__onDispatch
  switch(payload.actionType) {      // presumably, this is the key? ie. 'G#4'
  case MyConstants.ACTION_ONE:      // TONES[key]
    MyStore.responseOne(payload);   // add to store when onDispatch happens...
    break;
  case MyConstants.ACTION_TWO:
    MyStore.responseTwo(payload);
    break;
  }
};
