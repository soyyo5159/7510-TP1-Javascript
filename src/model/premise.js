function Premise(name,values){
    this.name=name;
    this.values=values || [];
}

Premise.build=function(args){
    let arrArgs=Array.prototype.slice.apply(arguments);
    if(arrArgs.length==1){
        arrArgs=args;
    }
    return new Premise(arrArgs[0],arrArgs.slice(1));
}

Premise.prototype.satisfies=function(f){
    return f(this);
}

Premise.prototype.verifies=function(question,answerer){
    return this.equals(question);
}

Premise.prototype.equals=function(question){
    return question.name===this.name 
    && this.values.length === question.values.length
    && 
    this.values
    .map((x,i)=>x===question.values[i])
    .reduce((x,y)=>x && y,true);
}

module.exports=Premise;