# database-sistem

jsonlu database sistemi

aşağıdaki kod sayesinde dosyayı oluşturabiliyorsunuz.

```js
const Db = require("database-sistem");
const db = new Db({
    path: `./database.json`,
    seperator: ".",
    spaces: 10
  });
```

path yani yol kısmında istediğiniz konumu seçiyorsunuz.

```js
const Db = require("database-sistem");
const db = new Db({
    path: `./database/database.json`,
    seperator: ".",
    spaces: 10
  });
```

gibi ama burada kullanacağınız klasörün olması gerekli, dosyayı ise kendisi oluşturuyor, dosyayı kendiniz oluşturmayınız.

```js
db.set(`a`,`a`) // şeklinde yazarsanız
```

aşağıdaki sonuç elde edilir.

```json
{
  "a":"a"
}
```

// Diğer Örnek

```js
db.set(`a.b`,`c`)
```

şeklinde olursa

```json
{
"a": {
  "b":"c"
  }
}
```

şeklinde olur.

## Matematiksel işlevler

### toplama

```js
db.add(`a`,1)
```

```json
{
  "a": 1
}
```

bunun aynısını bir daha yaparsak, toplarsak yine 1 le

```json
{
  "a": 2
}
```

şeklinde olur.

### çıkarma

```js
db.subtract("a",1)
```

sonuç

```json
{
  "a": 1
}
```

şeklinde olur.

## dizi işlemleri

### diziye veri eklemek

```js
db.push("a","a")
db.push("a","b")
db.push("a","c")
```

sonuç

```json
{
  "a": ["a","b","c"]
}
```

### diziden belirli bir elemanı çıkarmak

aşağıdaki fonksiyonlardan önceki array

```json
{
  "a": ["a","b","c"]
}
```

// splice fonksiyonu

```js
db.splice("a","b")
```

sonuç

```json
{
  "a": ["a","c"]
}
```

// pull fonksiyonu

```js
db.pull("a","b")
```

sonuç

```json
{
  "a": ["a","c"]
}
```

### dizide belirli bir eleman varmı diye bakmak

```js
console.log(db.has("a","a"))
```

sonuç

```console
true
```

// yeni gelen includes fonksiyonu

```js
console.log(db.includes("a","a"))
```

sonuç

```console
true
```

### dizideki elemanları yazdırmak

```js
console.log(db.fetch("a"))
```

sonuç

```console
["a","c"]
```

aynı şey diğer set olarak ayarladığımız veriye bakarken de geçerli

```js
console.log(db.get("a"))
```

sonuç

```console
["a","c"]
```

### dizide kaç eleman var diye bakmak

```js
console.log(db.size("a"))
```

sonuç

```console
1
```

## geliştirilmiş dizi özelliği

### find fonksiyonu

```js
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
```

sonuç

```console
{ username: 'bob', email: 'bob@example.com' }
```

databasedeki hali ise aşağıdaki şekildedir

```json
{
          "users": [
                    {
                              "username": "bob",
                              "email": "bob@example.com"
                    },
                    {
                              "username": "bila",
                              "email": "bila@example.com"
                    }
          ]
}
```

### update fonksiyonu

```js
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
```

sonuç

```console
{ username: 'bob', email: 'bob@example.com' }
{ username: 'bob', email: 'bobmarley@example.com', other: 'deneme' }
```

databasedeki hali ise aşağıdaki şekildedir

```json
{
          "users": [
                    {
                              "username": "bob",
                              "email": "bobmarley@example.com",
                              "other": "deneme"
                    },
                    {
                              "username": "bila",
                              "email": "bila@example.com"
                    }
          ]
}
```

## diğer özellikler ve ek database bilgileri

aşağıdaki özellikler teknik bilgilerdir, lütfen bu bilgileri dikkatlice inceleyiniz.

```js
const Db = require("database-sistem");
const db = new Db({
    path: `./database/database.json`,
    seperator: ".",
    spaces: 10
  });
db.set("aa.aa","a")
db.set("ab.ac","a")
db.add("ab.ae",3)
db.push("ab.ad","b")
```

sonuç

```json
{
    "aa": {
        "aa": "a"
    },
    "ab": {
        "ac": "a",
        "ad": [
            "b"
        ],
        "ae": 3

    }
}
```

Not: burada dosyayı çalıştırıp tekrardan kapattığınız var sayılıyor, eğer aynı dosya içerisinde veri değiştirilmeden aynı dosyayı gördüğü için eski değerden işlem yapacaktır.

bunu aşmanın yolları var tabi, yapacağınız işlem her neyse o işlem içinde dosyayı çekmek olacaktır.

gelelim discord.js(v14.7.1) de ile birlikte nasıl kullanılabilir.

aşağıda komutlar kısmındaki bir komut dosyasından örnek olarak atılmıştır, sizler farklı şekilde yapabilirsiniz.

### örnek kod 1

```js
// örnek komut
const discord = require("discord.js")
const config = require("../../config.json")

const { EmbedBuilder } = require('discord.js');

const Db = require('database-sistem')

exports.run = async(client, message, args) => {

const db = new Db({
    path: `./database.json`,
    seperator: ".",
    spaces: 10
});
message.channel.send({content : "selam"})
db.add("a",1)
}

exports.help = {
    name: "örnek", // Komutun İsmi
    aliases: ["örnek"] // Komutun Diğer Kullanım örnekleri Array İçinde yapınız
}
```

siz her örnek komutunu çalıştırdığınızda chate selam yazacak ve ayrıca databasede bulunan "a" değerini 1 arttıracak, ayrıca `database.json` isminde bir dosyanız da var.

eğer database.json isimli dosyayı açarsanız aşağıdaki görüntü karşınıza çıkacaktır.

```json
{
  "a": 1
}
```

siz derseniz bu databasedeki veriyi nasıl okuyup chate yazdırabilirim derseniz size bir örnek vereyim.

### örnek kod 2

```js
// örnek komut
const discord = require("discord.js")
const config = require("../../config.json")
// burada embed oluşturucusu
const { EmbedBuilder } = require('discord.js');
// databaseyi çağırıyoruz
const Db = require('database-sistem')

exports.run = async(client, message, args) => {
// burada databasenin bulunduğu dosyayı çağırıyoruz
const db = new Db({
    path: `./database.json`,
    seperator: ".",
    spaces: 10
});

const exampleEmbed = new EmbedBuilder()
// embedin kenarındaki renk
.setColor("Random")
.setAuthor({ name : `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true, size: 1024 })}`})
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
.setDescription(`paranız ${db.get("a")} kadardır`)
message.channel.send({content : "selam", embeds:[exampleEmbed]})

}

exports.help = {
    name: "test1", // Komutun İsmi
    aliases: ["test1"] // Komutun Diğer Kullanım örnekleri Array İçinde yapınız
}

```

sonucu ise aşağıdaki görseldeki gibidir, sizler istediğiniz gibi ayarlayabilirsiniz.

![alt text](https://cdn.discordapp.com/attachments/975398444233556069/1100904936608383126/image.png)

Not: Bu özellikler dahalen geliştirme aşamasındadır. lütfen daha iyi özellikler için bekleyiniz.

## iletişime geçmek için

[Discord sunucusu](https://discord.gg/YdVyqDscbb)

## güncelleme notları

### 1.0.4 & 1.0.5

- has fonksiyonu düzeltildi.
- pull fonksiyonu eklendi.
- find fonksiyonu eklendi.
- update fonksiyonu eklendi.

### 1.0.3

- has fonksiyonu geçici olarak kaldırıldı, lütfen alternatifini kullanın.
- includes fonksiyonu eklendi.
- bir web sayfası üzerinde çalışmalar yapılıyor.
- size fonksiyonu eklendi.

### 1.0.2

- bu sürümde readme sayfasındaki bilgiler arttırıldı.
- yeni özellik olan splice özelliği eklendi.
- örnekler eklendi.
