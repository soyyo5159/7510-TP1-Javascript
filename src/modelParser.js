const parsers=require("./specificParsers")
const model=require("./model")

function chainedParserConstruction(first,parserConstructors,modelConstructors){
    let next=first;
    for(let i=0;i<parserConstructors.length;i++){
        let parser = new parserConstructors[i]();
        parser.build = modelConstructors[i].build;
        parser.nextParser=next;
        next=parser;
    }
    return next;
}


function ModelParser(){
    let nothingParser = new parsers.NothingParser();

    let p=parsers;
    let m=model;

    let databaseParser=chainedParserConstruction(nothingParser,
    [
        p.TokenParser,
        p.PremiseParser,
        p.ConjunctionParser,
        p.DisjunctionParser,
        p.InferenceParser,
        p.DatabaseParser
    ],
    [
        m.Token,
        m.Premise,
        m.Conjunction,
        m.Disjunction,
        m.Inference,
        m.Database
    ]);

    this.parse=databaseParser.parse.bind(databaseParser);
}

module.exports=ModelParser;