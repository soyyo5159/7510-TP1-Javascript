function Answerer(){}

/**
 * Responde sólo satisfiables que sólo tienen questions. 
 */
Answerer.prototype.ask=function(satisfiable){
    return satisfiable.satisfies((question)=>this.askQuestion(question));
}

Answerer.prototype.askQuestion=function(question){
    return this.satisfies((myVerificator)=>myVerificator.verify(question,this))
}

module.exports = Answerer;