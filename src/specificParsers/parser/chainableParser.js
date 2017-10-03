const Parser = require("./parser.js")
function ChainableParser(){}
ChainableParser.prototype=Object.create(Parser.prototype);
ChainableParser.prototype.parseParts=function(str){
    return this.nextParser.parse(str);
}

module.exports=ChainableParser;