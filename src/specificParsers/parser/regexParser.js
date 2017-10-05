const ChainableParser = require("./chainableParser");

function RegexParser(){}

RegexParser.prototype=Object.create(ChainableParser.prototype);

RegexParser.prototype.recognizes=function(str){
    let defStr=str.replace(/\ /g,"").replace(/\n/g,"");
    return this.recognitionRegex.test(defStr);
}

RegexParser.prototype.separate=function(str){
    let defStr=str.replace(/\ /g,"").replace(/\n/g,"");
    return defStr.split(this.separationRegex).filter((x)=>x!=="");
}

module.exports=RegexParser;