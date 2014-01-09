'use strict';

function* fibonacci() {
	var prev = 0,
		curr = 1;
	while (true) {
		prev = curr;
		curr = prev + curr;
		yield curr;
	}
}

module.exports = function (next) {
	var iterator = fibonacci(),
		curIteration = iterator.next();
	while (!curIteration.done) {
		var n = curIteration.value;
		if (n > 1000) {
			break;
		}
		console.log(n);
		curIteration = iterator.next();
	}
	next();
};
