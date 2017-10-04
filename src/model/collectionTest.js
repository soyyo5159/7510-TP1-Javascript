const assert = require("chai").assert;
const Parser = require('./collection');

const Disjunction = require("./collection").Disjunction;
const Conjunction = require("./collection").Conjunction;

describe("Usage of collections",function(){
    Number.prototype.satisfies=function(satisfier){
        return satisfier.ask(this.valueOf())
    }
    function even(x){
        return x % 2 ==0;
    }
    let s={
        ask:even
    }
    
    it("conjunctions",function(){
        assert.isTrue( (Conjunction.build(2,4,6)).satisfies(s));
        assert.isFalse((Conjunction.build(2,1,7)).satisfies(s));
        assert.isFalse((Conjunction.build(3,1,7)).satisfies(s));
    })
    it("disjunctions",function(){
        assert.isTrue( (Disjunction.build(2,4,6)).satisfies(s));
        assert.isTrue( (Disjunction.build(2,1,7)).satisfies(s));
        assert.isFalse((Disjunction.build(3,1,7)).satisfies(s));
    })
    it("equality of disjunctions",function(){
        assert.deepEqual(
            Disjunction.build( {a:true},"hola",17 ),
            Disjunction.build([{a:true},"hola",17])
        )
    })

    it("equality of conjunctions",function(){
        assert.deepEqual(
            Conjunction.build( {a:true},"hola",17 ),
            Conjunction.build([{a:true},"hola",17])
        )
    })
})