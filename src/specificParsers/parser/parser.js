

function Parser(){

}

Parser.prototype.parse=function(str){
    if(this.recognizes(str)){
        let separated=this.separate(str);
        let parsed=separated.map(this.parseParts,this);
        return this.build(parsed);
    }else{
        return this.cantRecognize(str);
    }
}


module.exports=Parser;

/*
//LO QUE QUIERO HACER
//PARA CONSTRUIRLO sería Object.create(Parser)

let Parser=Object.create({},{
    parse:function(str){
        if(this.recognizes(str)){
            let separated=this.separate(str);
            let parsed=separated.map(this.parseParts,this);
            return this.build(parsed);
        }else{
            return this.cantRecognize(str);
        }
    }
});

module.exports=Parser;
*/