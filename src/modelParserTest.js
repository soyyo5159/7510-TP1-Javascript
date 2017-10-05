const assert = require("chai").assert;
const ModelParser=require("./modelParser");
const model=require("./model");
const Premise=model.Premise;
const Database=model.Database;
const Inference=model.Inference;

describe("ModelParser",function(){
    let parser=new ModelParser();
    it("A Dabase of 1 premise",function(){
        assert.deepEqual(
            parser.parse("asd(a,b)"),
            Premise.build("asd", "a", "b")
        )
    })
    it("A Dabase of 2 premises",function(){
        assert.deepEqual(
            parser.parse("asd(a,b).qwe(a,b)."),
            Database.build(
                Premise.build("asd", "a", "b"),
                Premise.build("qwe", "a", "b")
            )
        )
    })

    it("A multiline database",function(){
        assert.deepEqual(
            parser.parse("asd  (a    ,b).\n\n\nqw  e(a,b)."),
            Database.build(
                Premise.build("asd", "a", "b"),
                Premise.build("qwe", "a", "b")
            )
        )
    })

    it("A Dabase of a premise and an inference",function(){
        assert.deepEqual(
            parser.parse("asd(a,b).qwe(a,b).n(X):-q(X)."),
            Database.build(
                Premise.build("asd", "a", "b"),
                Premise.build("qwe", "a", "b"),
                Inference.build(
                    Premise.build("n", "X"),
                    Premise.build("q", "X")
                )
            )
        )
    })


})