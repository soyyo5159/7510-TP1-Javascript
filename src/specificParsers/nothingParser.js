function NothingParser(){}
NothingParser.prototype=Object.create(require("./parser").prototype);
NothingParser.prototype.recognizes=()=>false;
NothingParser.prototype.cantRecognize=function(str){throw new Error("Cant recognize "+str)};
module.exports=NothingParser;