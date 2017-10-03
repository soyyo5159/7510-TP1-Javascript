function Premise(name,values){
    if(values instanceof Array){
        this.name=name;
        this.values=values;
    }else{
        this.name=name;
        this.values=Array.prototype.slice.call(arguments,[1]);
    }
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