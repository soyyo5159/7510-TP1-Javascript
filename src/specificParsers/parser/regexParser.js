const ChainableParser = require("./chainableParser");

function RegexParser(){}

RegexParser.prototype=Object.create(ChainableParser.prototype);

RegexParser.prototype.recognizes=function(str){
    return this.recognitionRegex.test(str);
}

RegexParser.prototype.separate=function(str){
    return str.split(this.separationRegex).filter((x)=>x!=="");
}

module.exports=RegexParser;