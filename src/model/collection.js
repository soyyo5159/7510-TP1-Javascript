const buildable=require("./makeBuildable");

function createCollectionType(combine){
    function Colection(elements){
        this.elements=elements;
    }
    Colection.prototype.satisfies=function(f){
        return combine(this.elements.map((x)=>x.satisfies(f)));
    }
    return buildable(Colection);

}


function combineAnd(arr){
    return arr.reduce((x,y)=>x && y,true);
}
module.exports.Conjunction=createCollectionType(combineAnd);



function combineOr(arr){
    return arr.reduce((x,y)=>x || y,false);
}
module.exports.Disjunction=createCollectionType(combineOr);
