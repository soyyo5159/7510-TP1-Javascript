const assert = require("chai").assert;
const Inference=require("./inference");
const Premise=require("./premise");
const Conjunction=require("./collection").Conjunction;
const Disjunction=require("./collection").Disjunction;
const Answerer=require("./database");

describe("Inference with a conjunction",function(){
    let inference=new Inference(
        Premise.build("awesome", "X", "Y"),
        Conjunction.build(
            Premise.build("good", "X", "Y"),
            Premise.build("smart", "X", "Y"),
        )
    )

    let hateKevin=new Answerer();
    hateKevin.askQuestion=function(q){
        if(q.name==="good" && q.values.includes("kevin")){
            return false;
        }else{
            return true;
        }
    }

    let honest={
        ask:()=>true
    }

    it("false because header fails: wrong name",function(){
        assert.isFalse(inference.verifies(Premise.build("good","dog","jose"),honest))
    })
    it("false because header fails: wrong number of args",function(){
        assert.isFalse(inference.verifies(Premise.build("awesome","dog"),honest))
    })
    it("good because header succeeds",function(){
        assert.isTrue(inference.verifies(Premise.build("awesome","dog","you"),honest))
    })

    it("Bad because kevin",function(){
        assert.isFalse(inference.verifies(Premise.build("awesome","kevin","dog"),hateKevin))
    })
    it("Good no kevin",function(){
        assert.isTrue(inference.verifies(Premise.build("awesome","cat","dog"),hateKevin))
    })
})