/*
** I'm not sure what all this jawn is... **
  // we pass the global Dispatcher here...
  (function(dispatcher) {
    // wtf why we passing a dispatcher here?
  }(Dispatcher))

  var KeyStore = window.KeyStore = window.KeyStore || {}

  // all stores must implement this!
  KeyStore.__onDispatch = function (payload) {    // flux example actually has this as Dispatcher.register, not Store.__onDispatch
    switch(payload.actionType) {      // presumably, this is the key? ie. 'G#4'
    case MyConstants.ACTION_ONE:      // TONES[keyName]
      MyStore.responseOne(payload);   // add to store when onDispatch happens...
      break;
    case MyConstants.ACTION_TWO:
      MyStore.responseTwo(payload);
      break;
    }
  };
*/

(function(root) {       //PH: root should be WINDOW. not `this`
  var CHANGE_EVENT = 'change'
  var _keys = []
  // _callbacks = [] isn't necessary (we used to push into and splice out of callbacks here) because we're using eventEmitter to keep track of everything using this.on(), etc.
  var KeyStore = root.KeyStore = new EventEmitter();
  
  KeyStore.emitChange = function() {
    this.emit(CHANGE_EVENT);
  };
    
  KeyStore.addChangeListener = function(callback) {
    this.on(CHANGE_EVENT, callback);
  };
  
  KeyStore.removeChangeListener = function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  };
  
  KeyStore.checkPresence = function(keyName) {
    return _keys.indexOf(keyName) != -1
  };
  
  KeyStore.addKeyName = function(keyName) {
    if (_keys.indexOf(keyName) == -1) {     //PH:** - should keep this way??
      _keys.push(keyName);
    }
  };
  
  KeyStore.removeKeyName = function(keyName) {
    var idx = _keys.indexOf(keyName);
    if (idx != -1) {
      _keys.splice(idx, 1)
    }
  };
    
  KeyStore.getAll = function() {
    return _keys;
  };
  
  Dispatcher.register(function(action) {
    switch (action.actionType) {
      case OrganConstants.KEY_PRESSED:
        KeyStore.addKeyName(action.keyName);
        KeyStore.emitChange();
        break;
      case OrganConstants.KEY_RELEASED:
        KeyStore.removeKeyName(action.keyName);
        KeyStore.emitChange();
        break;
    }
  });
  //PH:*** FIX THIS. the actual store object should handle dispatched payloads through __onDispatch(); we don't do any of that here... we cheat and register a callback with the Dispatcher instead...
}(window));
