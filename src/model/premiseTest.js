var assert = require("chai").assert;
var should = require('should');

var Premise = require('./premise');

describe("equality",function(){
    it("With many arguments",function(){
        assert.isTrue(
            (Premise.build(["a","b","c"]))
            .equals(
                new Premise("a",["b","c"])
            )
        );
        assert.isTrue(
            (Premise.build("a","b","c"))
            .equals(
                new Premise("a",["b","c"])
            )
        );
        assert.isTrue(
            (Premise.build("a","b","c"))
            .equals(
                Premise.build(["a","b","c"])
            )
        );
    })

    it("Different argument count",function(){
        assert.isFalse(
            (Premise.build(["a","b","d","g"]))
            .equals(
                new Premise("a",["b","d"])
            )
        );
    })

    it("different arguments",function(){
        assert.isFalse(
            (Premise.build(["a","b","d"]))
            .equals(
                new Premise("a",["b","c"])
            )
        );
    })

    it("With no arguments same name",function(){
        assert.isTrue(
            (Premise.build("a"))
            .equals(
                new Premise("a")
            )
        );
    })

    it("With no arguments, different name",function(){
        assert.isFalse(
            (Premise.build("k"))
            .equals(
                new Premise("a")
            )
        );
    })
})
