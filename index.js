function isMonad(value){
	return value && (value.isRight || value.isLeft);
}

function Either(fn){
	var result;

	try{
		result = Right(fn());
	}catch(e){
		result = Left(e);
	}

	return result;
}

function Right(value){
	return isMonad(value) ? value : {
		isRight: true,
		bind: function(right){
			return Right(right(value));
		}
	};
}

function Left(value){
	return isMonad(value) ? value : {
		isLeft: true,
		bind: function(_, left){
			return Left(left(value));
		}
	};
}

exports.Right = Right;
exports.Left = Left;
exports.Either = Either;
