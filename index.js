'use strict';

function isFunction(value){
	return typeof value === 'function';
}

function run(fn){
	try{
		return Right(fn());
	}catch(e){
		return Left(e);
	}
}

var Monad = require('dgelong.monad'),
	Either, Right, Left;

Either = Monad('Either', function(fn, right, left){
	return run(fn).bind(right, left);
});

Right = Monad('Right', function(value, right){
	return Right(right(value));
});

Left = Monad('Left', function(value, _, left){
	return isFunction(left) ? Right(left(value)) : Left(value);
});

Either.Right = Right;
Either.Left = Left;
module.exports = Either;
