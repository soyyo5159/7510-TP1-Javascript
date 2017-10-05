const Disjunction = require("./collection").Disjunction;

function Answerer(elements){
    this.elements=elements;
}
Answerer.prototype=Object.create(Disjunction.prototype)

/**
 * Responde sólo satisfiables que sólo tienen questions. 
 */
Answerer.prototype.ask=function(satisfiable){
    return satisfiable.satisfies((question)=>this.askQuestion(question));
}

Answerer.prototype.askQuestion=function(question){
    return this.satisfies((myVerificator)=>{
        return myVerificator.verifies(question,this)
    })
}

Answerer.build=function(args){
    let arrArgs=Array.prototype.slice.call(arguments);
    if(arrArgs.length==1){
        arrArgs=args;
    }
    return new Answerer(arrArgs);
}

module.exports = Answerer;