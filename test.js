const Db = require("./app.js");
const db = new Db({
    path: `./database.json`,
    seperator: ".",
    spaces: 10
  });
db.set("aa.aa","a")
db.set("ab.ac","a")
db.add("ab.ae",3)
db.push("ab.ad","b")
console.log(db.size("ab.ad"))
console.log(db.includes("ab.ad","b"))