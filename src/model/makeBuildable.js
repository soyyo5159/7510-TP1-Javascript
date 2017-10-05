function makeBuildable(constructor,f){
    constructor.build=function(args){
        let arrArgs=Array.prototype.slice.call(arguments);
        if(arrArgs.length==1){
            arrArgs=args;
        }

        if(f instanceof Function){
            return f(arrArgs)
        }else{
            return new constructor(arrArgs);
        }
        
    }
    return constructor;
}

module.exports=makeBuildable;