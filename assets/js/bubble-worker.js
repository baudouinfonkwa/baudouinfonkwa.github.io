'use strict';
importScripts('bubble-physics.js');
self.onmessage = event => {
  try { self.postMessage({result:BubblePhysics.simulate(event.data)}); }
  catch(error) { self.postMessage({error:error.message}); }
};
