#!/usr/bin/env node

// I know!  Since shiz() is throwing, just keep trying!
// But make sure we don't accidentally catch some OTHER
// kind of error, because that could probably be bad, right?
// Like, if it's actually something important.
 
function doSomeShiz(n) {
  shiz.expect(n);
  for (var i = 0; i < n; i++) {
    try {
      shiz();
    } catch (er) {
      // if it throws the error we expect, back up and try again
      // even this isn't perfect, because it can throw the error we DONT expect,
      // and we probably don't want to catch that one!
      if (er.message === 'shank shiz')
        i--;
      else
        throw er;
    }
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
 
    // oops
    //       such error
    //   many throw        uncawt lul
    if (Math.random() > 0.5)
      throw new Error('shank shiz');
 
    if (theShiz === expectShiz)
      verify();
 
    if (theShiz > expectShiz)
      throw new Error('uh o  so error     such unexpect');
  }
 
  shiz.verify = verify;
  shiz.expect = expect;
 
  return shiz;
})()
 
doSomeShiz(10);
 
// Turns out, this keeps crashing, because the throw out
// of shiz-land futzes the shiz all up.  Let's try a bigger
// error handler!
//
// /Users/isaacs/dev/js/node-master/throw-leaks-local-catch.js:13
//         throw er;
//               ^
// Error: uh o  so error     such unexpect
//     at shiz (/Users/isaacs/dev/js/node-master/throw-leaks-local-catch.js:47:13)
//     at doSomeShiz (/Users/isaacs/dev/js/node-master/throw-leaks-local-catch.js:5:7)
//     at Object.<anonymous> (/Users/isaacs/dev/js/node-master/throw-leaks-local-catch.js:56:1)
//     at Module._compile (module.js:449:26)
//     at Object.Module._extensions..js (module.js:467:10)
//     at Module.load (module.js:349:32)
//     at Function.Module._load (module.js:305:12)
//     at Function.Module.runMain (module.js:490:10)
//     at startup (node.js:123:16)
//     at node.js:1027:3

