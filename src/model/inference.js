const buildable=require("./makeBuildable");

const Translator = require("./translator");

function Inference(header,satisfy){
    this.header=header;
    this.satisfy=satisfy;
}

Inference.prototype.satisfies=function(f){
    return f(this)
}

Inference.prototype.verifies=function(question,answerer){
    if(this.header.matches(question)){
        let translator=Translator.fromTo(this.header,question);
        let translated=translator.wrap(answerer);
        return translated.ask(this.satisfy);
    }else{
        return false;
    }
}

buildable(Inference,(a)=>new Inference(a[0],a[1]));

module.exports=Inference;