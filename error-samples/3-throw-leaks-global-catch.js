#!/usr/bin/env node

// This is even worse!
//
// Now, instead of just crashing, state is fubar!
// There's no way to know how far we got through the
// loop, no way to continue where we left off, and
// the internal state is who knows what.
//
// Practically *by definition* unexpected exceptions
// are going to abruptly jump out of their local
// context in a way that cannot be adequately handled.
//
// In a real application, where presumably the state
// of things actually *matters*, this is the worst
// possible outcome!  A crashed process can simply be
// restarted, but an *insane* process might start
// acting in unpredictable ways: latency bubbles,
// incorrect behavior, etc.  These are almost impossible
// to debug reasonably, even with the best tools, and
// are a huge drain on user experience and dev time.
//
// Maximum catastrophe!  Hit you to death!
process.on('uncaughtException', function(er) {
  console.log('air or lawl!', er.message);
});
 
function doSomeShiz(n) {
  shiz.expect(n);
  for (var i = 0; i < n; i++) {
    shiz();
  }
}
 
var shiz = (function() {
  // this is some internal state etc.
  var theShiz = 0;
  var expectShiz = 0;
 
  function expect(n) {
    expectShiz = n;
    theShiz = 0;
  }
 
  function verify() {
    console.log('did %d of shiz, expected %d', theShiz, expectShiz);
    console.log('cleanup shiz');
    theShiz = 0;
  }
 
  function shiz() {
    theShiz++;
 
    // oops              so unepxect
    //       such error
    //   many throw        uncawt lul
    if (Math.random() > 0.5)
      throw new Error('shank shiz'); // resource unvailable, etc.
 
    if (theShiz === expectShiz)
      verify();
 
    // What if, instead of simply throwing here, we just kept
    // incrementing theShiz as long as it's !== expectShiz?
    // Must be an Apple employee, because it's going to be in
    // one infinite loop!
    if (theShiz > expectShiz)
      throw new Error('uh o  such error     so excetpional!');
  }
 
  shiz.verify = verify;
  shiz.expect = expect;
 
  return shiz;
})()
 
doSomeShiz(10);
