function setAbortableTimeout( callback, delayInMilliseconds, signal ) {

  // When the calling context triggers an abort, we need to listen to for it so
  // that we can turn around and clear the internal timer.
  // --
  // NOTE: We're creating a proxy callback to remove this event-listener once
  // the timer executes. This way, our event-handler never gets invoked if
  // there's nothing for it to actually do. Also note that the "abort" event
  // will only ever get emitted once, regardless of how many times the calling
  // context tries to invoke .abort() on its AbortController.
  signal?.addEventListener( "abort", handleAbort );

  // Setup our internal timer that we can clear-on-abort.
  var internalTimer = setTimeout( internalCallback, delayInMilliseconds );

  // -- Internal methods. -- //

  function internalCallback() {

    signal?.removeEventListener( "abort", handleAbort );
    callback();

  }

  function handleAbort() {

    console.warn( "Canceling timer (%s) via signal abort.", internalTimer );
    clearTimeout( internalTimer );

  }

}

export default setAbortableTimeout