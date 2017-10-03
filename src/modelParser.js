const parsers=require("./specificParsers")
const model=require("./model")
function ModelParser(){
    let nothingParser = new parsers.NothingParser();

    let tokenParser = new parsers.TokenParser();
    tokenParser.build = model.Token.build;
    tokenParser.nextParser=nothingParser;

    let premiseParser = new parsers.PremiseParser();
    premiseParser.build = model.Premise.build;
    premiseParser.nextParser=tokenParser;

    let conjunctionParser = new parsers.ConjunctionParser();
    conjunctionParser.build = model.Conjunction.build;
    conjunctionParser.nextParser=premiseParser;

    let disjunctionParser=new parsers.DisjunctionParser();
    disjunctionParser.build = model.Disjunction.build;
    disjunctionParser.nextParser=conjunctionParser;

    let inferenceParser = new parsers.InferenceParser();
    inferenceParser.build=model.Inference.build;
    inferenceParser.nextParser=disjunctionParser;


    let databaseParser=new parsers.DatabaseParser();
    databaseParser.build=model.Database.build;
    databaseParser.nextParser = inferenceParser;

    this.nextParser=databaseParser;
    this.recognize=()=>false;
}
ModelParser.prototype=Object.create(parsers.Parser.prototype)