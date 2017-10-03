var assert = require("chai").assert;
var should = require('should');

var Premise = require('../src/premise');

describe("equality",function(){
    it("With many arguments",function(){
        assert.isTrue(
            (new Premise("a","b","c"))
            .equals(
                new Premise("a",["b","c"])
            )
        );
    })

    it("Different argument count",function(){
        assert.isFalse(
            (new Premise("a","b","d","g"))
            .equals(
                new Premise("a",["b","d"])
            )
        );
    })

    it("different arguments",function(){
        assert.isFalse(
            (new Premise("a","b","d"))
            .equals(
                new Premise("a",["b","c"])
            )
        );
    })

    it("With no arguments same name",function(){
        assert.isTrue(
            (new Premise("a"))
            .equals(
                new Premise("a")
            )
        );
    })

    it("With no arguments, different name",function(){
        assert.isFalse(
            (new Premise("k"))
            .equals(
                new Premise("a")
            )
        );
    })
})
