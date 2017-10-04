function Colection(elements){
    this.elements=elements;
}
Colection.prototype.satisfies=function(f){
    console.log(this.elements)
    return this.elements.map(f).reduce(this.combine);
}


function Conjunction(elements){
    this.elements=elements;
}
Conjunction.prototype=Object.create(Colection.prototype);
Conjunction.prototype.combine=(x,y)=>x && y;
Conjunction.build=function(args){
    let arrArgs=Array.prototype.slice.call(arguments);
    if(arrArgs.length==1){
        arrArgs=args;
    }
    return new Conjunction(arrArgs);
}
module.exports.Conjunction=Conjunction;


function Disjunction(elements){
    this.elements=elements;
}
Disjunction.prototype=Object.create(Colection.prototype);
Disjunction.prototype.combine=(x,y)=>x || y;
Disjunction.build=function(args){
    let arrArgs=Array.prototype.slice.call(arguments);
    if(arrArgs.length==1){
        arrArgs=args;
    }
    return new Disjunction(arrArgs);
}
module.exports.Disjunction=Disjunction;
