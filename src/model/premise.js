const buildable=require("./makeBuildable");

function Premise(name,values){
    this.name=name;
    this.values=values || [];
}

buildable(Premise,(a)=>new Premise(a[0],a.slice(1)));

Premise.prototype.satisfies=function(f){
    return f(this);
}

Premise.prototype.verifies=function(question,answerer){
    return this.equals(question);
}

Premise.prototype.matches=function(other){
    return (other.values.length==this.values.length && this.name===other.name);
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