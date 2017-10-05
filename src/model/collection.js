const buildable=require("./makeBuildable");

function Colection(elements){
    this.elements=elements;
}
Colection.prototype.satisfies=function(f){
    return this.combine(this.elements.map((x)=>x.satisfies(f)));
}


function Conjunction(elements){
    this.elements=elements;
}
Conjunction.prototype=Object.create(Colection.prototype);
Conjunction.prototype.combine=function(arr){
    return arr.reduce((x,y)=>x && y,true);
}
buildable(Conjunction);
module.exports.Conjunction=Conjunction;


function Disjunction(elements){
    this.elements=elements;
}
Disjunction.prototype=Object.create(Colection.prototype);
Disjunction.prototype.combine=function(arr){
    return arr.reduce((x,y)=>x || y,false);
}
buildable(Disjunction);
module.exports.Disjunction=Disjunction;
