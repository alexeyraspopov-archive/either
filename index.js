'use strict';

function isFunction(value){
	return typeof value === 'function';
}

function run(fn){
	try{
		return Success(fn());
	}catch(e){
		return Failure(e);
	}
}

var Monad = require('dgelong.monad'),
	Either, Success, Failure;

Either = Monad('Either', function(fn, right, left){
	return run(fn).bind(right, left);
});

Success = Monad('Success', function(value, right){
	return Success(right(value));
});

Failure = Monad('Failure', function(value, _, left){
	return isFunction(left) ? Success(left(value)) : Failure(value);
});

Either.Success = Success;
Either.Failure = Failure;
module.exports = Either;
