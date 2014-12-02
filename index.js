function isMonad(value){
	return value && (value.isSuccess || value.isFailure);
}

function Either(fn){
	try{
		return Success(fn());
	}catch(e){
		return Failure(e);
	}
}

function Success(value){
	return isMonad(value) ? value : {
		isSuccess: true,
		bind: function(right){ return Success(right(value)); },
		toString: function(){ return 'Success(' + value + ')'; }
	};
}

function Failure(value){
	return isMonad(value) ? value : {
		isFailure: true,
		bind: function(_, left){ return Failure(left(value)); },
		toString: function(){ return 'Failure(' + value + ')'; }
	};
}

exports.Success = Success;
exports.Failure = Failure;
exports.Either = Either;