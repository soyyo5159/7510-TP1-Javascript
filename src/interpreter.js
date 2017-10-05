const ModelParser=require("./modelParser")

var Interpreter = function () {
    let parser=new ModelParser();
    let db=null;

    this.parseDB = function (strDb) {
        db=parser.parse(strDb.join("\n"));
    }

    this.checkQuery = function (strQuery) {
        return db.ask(parser.parse(strQuery));
    }

}

module.exports = Interpreter;
