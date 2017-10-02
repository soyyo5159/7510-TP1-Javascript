const Parser = require("./parser");

function RegexParser(){}

RegexParser.prototype=Object.create(Parser.prototype);

RegexParser.prototype.recognizes=function(str){
    return this.recognitionRegex.test(str);
}

RegexParser.prototype.separate=function(str){
    return str.split(this.separationRegex);
}

module.exports=RegexParser;