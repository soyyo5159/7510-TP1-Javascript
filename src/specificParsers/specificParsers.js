const Parser=require("./parser");
function createSpecificParser(recognition,separation){
    let parser=function(){};

    parser.prototype=Object.create(Parser.prototype);

    if(recognition instanceof Function){
        parser.prototype.recognizes=recognition;
    }else{
        parser.prototype.recognitionRegex=recognition
    }

    if(separation instanceof Function){
        parser.prototype.separate=separation;
    }else{
        parser.prototype.separationRegex=separation
    }

    return parser;
}

function isToken(x){
    return typeof(x)==="string" && /^[a-zA-Z0-9_]+$/.test(x)
}
let TokenParser=createSpecificParser(isToken,(x)=>[x]);
TokenParser.prototype.parseParts=(x)=>x;

module.exports={
    PremiseParser:createSpecificParser(/^.+\(.+\)$/,/[,\(\)]/),
    InferenceParser:createSpecificParser(/.*:-.*/,/:-/),
    DisjunctionParser:createSpecificParser(/.*;.*/,/;/),
    DatabaseParser:createSpecificParser(/(.*\.)+/,"."),
    ConjunctionParser:createSpecificParser(/.*\),.*/,
        (str)=>str
        .split(/\),/)
        .map((x)=>
            (x+")")
            .replace("))",")")
        )
    ),

    TokenParser:TokenParser,
    NothingParser:require("./nothingParser")
};