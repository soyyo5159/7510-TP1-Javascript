var assert = require("chai").assert;
var should = require('should');

var Parser = require('../src/regexParser');

describe("parsing by using regex",function(){
    function csvParser(v){
        this.badValue=v;
    }
    csvParser.prototype=Object.create(Parser.prototype);
    csvParser.prototype.recognitionRegex=/,/;
    csvParser.prototype.separationRegex=/,/;
    csvParser.prototype.next={
        parse:(x)=>x
    }
    csvParser.prototype.build=(x)=>x;
    csvParser.prototype.cantRecognize=function(){return this.badValue};

    it("something with commas is separated",function(){
        assert.sameOrderedMembers((new csvParser(3)).parse("1,2,3"),["1","2","3"]);
    })

    it("something without commas isn't",function(){
        assert.equal((new csvParser(3)).parse("123"),3);
    })


})