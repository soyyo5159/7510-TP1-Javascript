const Premise = require("./premise");

function Translator(premiseFrom,premiseTo){
    let valuesFrom=premiseFrom.values;
    let valuesTo=premiseTo.values;

    let dict={};
    for(let i=0;i<valuesFrom.length;i++){
        dict[valuesFrom[i]]=valuesTo[i];
    }
    this.dictionary=dict;
}

Translator.fromTo=(p1,p2)=>new Translator(p1,p2);

Translator.prototype.translate=function(q){
    let translatedValues=[];
    for(let v of q.values){
        let translated=this.dictionary[v] || v;
        translatedValues.push(translated);
    }
    return new Premise(q.name,translatedValues);
}

Translator.prototype.wrap=function(answerer){
    let o=Object.create(answerer);
    o.askQuestion=(question)=>{
        let newq=this.translate(question)
        return answerer.askQuestion(newq);
    }
    return o;
}

module.exports=Translator;