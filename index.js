function isMonad(value){
	return value && value.isMonad;
}

function run(fn){
	try{
		return Success(fn());
	}catch(e){
		return Failure(e);
	}
}

function Either(fn){
	return {
		isMonad: true,
		bind: function(right, left){
			return run(fn).bind(right, left);
		}
	};
}

function Success(value){
	return isMonad(value) ? value : {
		isMonad: true,
		bind: function(right){ return Success(right(value)); },
		toString: function(){ return 'Success(' + value + ')'; }
	};
}

function Failure(value){
	return isMonad(value) ? value : {
		isMonad: true,
		bind: function(_, alternative){ return Success(alternative(value)); },
		toString: function(){ return 'Failure(' + value + ')'; }
	};
}

Either.Success = Success;
Either.Failure = Failure;
module.exports = Either;
