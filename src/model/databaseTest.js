const assert = require("chai").assert;
const Database=require("./database");
const Premise=require("./premise");
const Inference=require("./inference");
const Conjunction=require("./collection").Conjunction;

describe("Database",function(){
    describe("only premises",function(){
        let db=Database.build(
            Premise.build("tall", "Martin"),
            Premise.build("short", "Florencia"),
            Premise.build("blonde", "Barbara"),
            Premise.build("blonde", "Matias"),
            Premise.build("blonde", "Turi")
        )

        it("true facts",function(){
            assert.isTrue(db.ask(Premise.build("blonde", "Matias")))
            assert.isTrue(db.ask(Premise.build("blonde", "Turi")))
            assert.isTrue(db.ask(Premise.build("tall", "Martin")))
        })
        it("false facts",function(){
            assert.isFalse(db.ask(Premise.build("blonde", "Florencia")))
            assert.isFalse(db.ask(Premise.build("tall", "Turi")))
            assert.isFalse(db.ask(Premise.build("short", "Martin")))
        })
    })

    describe("premises with many arguments",function(){
        let db=Database.build(
            Premise.build("likes", "Jose", "verde"),
            Premise.build("likes", "Juan", "azul"),
            Premise.build("likes", "Magnolia", "pink"),
        )

        it("true facts",function(){
            assert.isTrue(db.ask(Premise.build("likes", "Jose", "verde")))
            assert.isTrue(db.ask(Premise.build("likes", "Juan", "azul")))
            assert.isTrue(db.ask(Premise.build("likes", "Magnolia", "pink")))
        })
        it("false facts",function(){
            assert.isFalse(db.ask(Premise.build("likes", "Jose", "green")))
            assert.isFalse(db.ask(Premise.build("likes", "Turi")))
            assert.isFalse(db.ask(Premise.build("likes", "Magnolia", "rojo")))
        })
    })

    describe("premises with rules",function(){
        let db=Database.build(
            Premise.build("likes", "Jose", "b"),
            Premise.build("likes", "Jose", "y"),
            Premise.build("likes", "Jose", "r"),
            Premise.build("likes", "Juan", "b"),
            Premise.build("likes", "Magnolia", "r"),
            Inference.build(
                Premise.build("likesPrimaries","X"),
                Conjunction.build(
                    Premise.build("likes","X","b"),
                    Premise.build("likes","X","r"),
                    Premise.build("likes","X","y"),
                )
            )
        )

        it("true fact",function(){
            assert.isTrue(db.ask(Premise.build("likesPrimaries", "Jose")))
        })
        it("false facts",function(){
            assert.isFalse(db.ask(Premise.build("likesPrimaries", "Juan")))
            assert.isFalse(db.ask(Premise.build("likesPrimaries", "Magnolia")))
        })
    })
})