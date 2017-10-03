const Parser = require("./parser.js")
function ChainableParser(){}
ChainableParser.prototype=Object.create(Parser.prototype);
ChainableParser.prototype.cantRecognize=function(str){
    return this.nextParser.parse(str);
}
ChainableParser.prototype.parseParts=function(str){
    return this.generalParser.parse(str);
}

module.exports=ChainableParser;