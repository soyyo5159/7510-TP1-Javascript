const buildable=require("./makeBuildable");

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

buildable(Answerer);

module.exports = Answerer;