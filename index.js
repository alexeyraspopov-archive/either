function isMonad(value){
	return value && (value.isRight || value.isLeft);
}

function Either(fn){
	try{
		return Right(fn());
	}catch(e){
		return Left(e);
	}
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