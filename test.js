const Db = require("./app.js");
const db = new Db({
    path: `./database.json`,
    seperator: ".",
    spaces: 10
  });
const veri = {
  username:"bob",
  email:"bob@example.com",
}
db.push("users",veri);
const veri2 = {
  username:"bila",
  email:"bila@example.com",
}
db.push("users",veri2);

const userToUpdate = db.find("users", user => user.username === "bob");
console.log(userToUpdate)
if (userToUpdate) {
  const updatedUser = db.update("users", user => user.username === "bob", { email: "bobmarley@example.com", other: "deneme" });
  console.log(updatedUser); // Güncellenmiş kullanıcı bilgisi
} else {
  console.log("Kullanıcı bulunamadı.");
}