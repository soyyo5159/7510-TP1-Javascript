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