(function(root) {
  root.KeyActions = {
    //PH: fb docs looks like naming should correspond to name of fn called in KeyStore, but a/a uses the actual descriptive action
    keyPressed: function(keyName) {
      Dispatcher.dispatch({
        actionType: OrganConstants.KEY_PRESSED,
        keyName: keyName,
      });
    },
    
    keyReleased: function(keyName) {
      Dispatcher.dispatch({
        actionType: OrganConstants.KEY_RELEASED,
        keyName: keyName,
      });
    },
    
    updateKeys: function(keys) {
      Dispatcher.dispatch({
        actionType: OrganConstants.UPDATE_KEYS,
        keys: keys,
      });
    },
  };
}(window));
