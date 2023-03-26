# database-sistem

jsonlu database sistemi

aşağıdaki kod sayesinde dosyayı oluşturabiliyorsunuz.

```js
const Db = require("@koderbilal/database-sistem");
const db = new Db({
    path: `./database.json`,
    seperator: ".",
    spaces: 10
  });
```

path yani yol kısmında istediğiniz konumu seçiyorsunuz.

```js
const Db = require("@koderbilal/database-sistem");
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

Not: Bu özellikler dahalen geliştirme aşamasındadır. lütfen daha iyi özellikler için bekleyiniz.
