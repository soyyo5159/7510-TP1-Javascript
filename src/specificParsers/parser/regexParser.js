const ChainableParser = require("./chainableParser");

function clean(str){
    return str.replace(/\ /g,"").replace(/\n/g,"");
}

function RegexParser(){}

RegexParser.prototype=Object.create(ChainableParser.prototype);

RegexParser.prototype.recognizes=function(str){
    return this.recognitionRegex.test(clean(str));
}

RegexParser.prototype.separate=function(str){
    
    return clean(str).split(this.separationRegex).filter((x)=>x!=="");
}

module.exports=RegexParser;