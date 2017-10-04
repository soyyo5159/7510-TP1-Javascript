const assert = require("chai").assert;
const should = require('should');

const Translator=require("./translator");
const Premise=require("./premise");

describe("translation of premises",function(){
    let translator=Translator.fromTo(
        Premise.build("name","X","Y","Z"),
        Premise.build("name","a","b","c")
    );

    it("all variables are known",function(){
        assert.deepEqual(
            translator.translate(Premise.build("fly","X","Y")),
            Premise.build("fly","a","b")
        );
    })

    it("some variables are known",function(){
        assert.deepEqual(
            translator.translate(Premise.build("fly","X","M")),
            Premise.build("fly","a","M")
        );
    })

    it("no variables are known",function(){
        assert.deepEqual(
            translator.translate(Premise.build("fly","N","M")),
            Premise.build("fly","N","M")
        );
    })

    it("test wrapping",function(){
        let goodGuy={
            askQuestion:(q)=>{
                console.log(q);
                return q.values[0]==="good";
            }
        }
        let evilTranslator = Translator.fromTo(Premise.build("x","bad","veryGood"),Premise.build("x","good","n"))
        let badGuy=evilTranslator.wrap(goodGuy);

        assert.isTrue(badGuy.askQuestion(Premise.build("p","bad")))
        assert.isTrue(badGuy.askQuestion(Premise.build("p","good")))
        assert.isFalse(badGuy.askQuestion(Premise.build("p","veryGood")))
    })

})
