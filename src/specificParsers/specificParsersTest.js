const assert = require("chai").assert;
const should = require('should');
const specificParsers = require('./specificParsers');

describe("parsers",function(){
    let tokenParser=new (specificParsers.TokenParser)();
    const NothingParser=specificParsers.NothingParser;
    let nothingParser=new NothingParser();
    tokenParser.build=(x)=>x[0];
    tokenParser.nextParser=nothingParser;

    describe("parsing tokens",function(){
        it("valid token",function(){
            assert.equal(tokenParser.parse("asd"),"asd");
            assert.equal(tokenParser.parse("ASD"),"ASD");
            assert.equal(tokenParser.parse("18"),"18");
        })
    
        it("(?) token",function(){
            assert.throws(()=>tokenParser.parse("(?)"));
        })
        it("token with spaces",function(){
            assert.throws(()=>tokenParser.parse("a b c"));
        })
    
        it("token that isnt a string",function(){
            assert.throws(()=>tokenParser.parse(87));
        })
    })

    const premiseParser=new (specificParsers.PremiseParser)();
    premiseParser.parseParts=(x)=>x;
    premiseParser.cantRecognize=()=>"NOPE";
    premiseParser.build=(x)=>x;

    describe("parsing premises",function(){
        it("premise with no arguments",function(){
            assert.equal(premiseParser.parse("asd()"),"NOPE");
        })

        it("premise with arguments",function(){
            assert.deepEqual(premiseParser.parse("asd(a,b)"),["asd","a","b"]);
        })

        it("not a premise",function(){
            assert.deepEqual(premiseParser.parse("la pampa"),"NOPE");
        })
    })

    

    describe("parsing inferences",function(){
        const inferenceParser=new (specificParsers.InferenceParser)();
        inferenceParser.parseParts=(x)=>x;
        inferenceParser.cantRecognize=()=>"NOPE";
        inferenceParser.build=(x)=>x;

        it("inference with arguments",function(){
            assert.deepEqual(inferenceParser.parse("a(X):-p(X)"),["a(X)","p(X)"]);
        })

        it("premise with a conjunction",function(){
            assert.deepEqual(inferenceParser.parse("a(X):-q(X),p(X)"),["a(X)","q(X),p(X)"]);
        })

        it("not an inference",function(){
            assert.deepEqual(inferenceParser.parse("la pampa"),"NOPE");
        })
    })

    describe("parsing databases",function(){
        const databaseParser=new (specificParsers.DatabaseParser)();
        databaseParser.parseParts=(x)=>x;
        databaseParser.cantRecognize=()=>"NOPE";
        databaseParser.build=(x)=>x;
        it("database of two premises",function(){
            assert.deepEqual(databaseParser.parse("asd(q).p(x)."),["asd(q)","p(x)"])
        })
        it("database of other things",function(){
            assert.deepEqual(databaseParser.parse(".hola.chau."),["hola","chau"])
        })
        it("database with an inference",function(){
            assert.deepEqual(databaseParser.parse(".hola(a).p(X):-q(Y)."),["hola(a)","p(X):-q(Y)"])
        })
    })
    describe("parsing conjunctions",function(){
        const conjunctionParser=new (specificParsers.ConjunctionParser)();
        conjunctionParser.parseParts=(x)=>x;
        conjunctionParser.cantRecognize=()=>"NOPE";
        conjunctionParser.build=(x)=>x;
        it("csv",function(){
            assert.deepEqual(conjunctionParser.parse("a,b,c,d,e,"),"NOPE")
        })
        it("comma separated premises",function(){
            assert.deepEqual(conjunctionParser.parse("a(b),c(d),e(f,g,h)"),["a(b)","c(d)","e(f,g,h)"])
        })
        it("random",function(){
            assert.deepEqual(conjunctionParser.parse("random"),"NOPE");
        })
    })

    describe("parsing disjunctions",function(){
        const disjunctionParser=new (specificParsers.DisjunctionParser)();
        disjunctionParser.parseParts=(x)=>x;
        disjunctionParser.cantRecognize=()=>"NOPE";
        disjunctionParser.build=(x)=>x;
        it("csv",function(){
            assert.deepEqual(disjunctionParser.parse("a;b;c;d;e;;;"),["a","b","c","d","e"])
        })
        it("random",function(){
            assert.deepEqual(disjunctionParser.parse("random"),"NOPE");
        })
    })

    

})