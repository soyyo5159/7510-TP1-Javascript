const Parser = require("./parser")
function ChainableParser(){}
ChainableParser.prototype=Object.create(Parser.prototype);
ChainableParser.prototype.parseParts=function(str){
    return this.nextParser.parse(str);
}
ChainableParser.prototype.cantRecognize=function(str){
    return this.nextParser.parse(str);
}

module.exports=ChainableParser;

/*
QUIERO HACER:

let ChainableParser=Object.create(Parser,{
    parseParts:function(str){
        return this.nextParser.parse(str);
    },
    cantRecognize:function(str){
        return this.nextParser.parse(str);
    }
});
module.exports=ChainableParser;
*/