const assert = require("chai").assert;
const Parser = require('./collection');

const makeBuildable = require("./makeBuildable");

describe("usage",function(){
    let Accumulator=function(args){
        this.args=args;
    }
    

    it("build an array",function(){
        makeBuildable(Accumulator);
        assert.deepEqual(Accumulator.build(1,2,3),new Accumulator([1,2,3]));
    })

    it("something else",function(){
        makeBuildable(Accumulator,(x)=>x);
        assert.deepEqual(Accumulator.build(1,2,3),[1,2,3]);
    })

})