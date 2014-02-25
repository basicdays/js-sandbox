#!/usr/bin/env node

// Some bug in the code causes it to crash sometimes.
// Gee, that sure is annoying!  Server restarts in a
// clean state, and spams the error log until we go
// in and fix it.
 
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