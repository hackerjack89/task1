let Person = require('./person');

/*Creating person instaces*/
console.log("Creating person instances...");
var p1 = new Person();
console.log("Created Person 1", p1);
var p2 = new Person();
console.log("Created Person 2", p2);
var p3 = new Person({ name: "pqr", age: 99 });
console.log("Created Person 3", p3);
var p4 = new Person({ name: "lmn", age: 55 });
console.log("Created Person 4", p4);

//Saving
console.log("Saving person");
p1
  .save()
  .then((res) => {
    console.log("saved person1: ", res);
    return res;
  })
  .then((res) => {
    console.log("setting person attribute");
    res
      .set("name", "abc")//Setting person attributes
      .set("age", 22)
      .set("gender", "male")
      .set("designation", "developer")
      .set("salary", 1600)
    return res;
  })
  .then((res) => {
    return res.update()
  })
  .then((res) => {
    console.log("Updated person 1: ", res);
  });

p2
  .save()
  .then((res) => {
    console.log("saved person2: ", res);
    return res;
  })
  .then((res) => {
    return res.set("name", "pqr")//Setting person attributes
  })
  .then((res) => {
    return res.update();
  })
  .then((res) => {
    console.log("Updated person 2: ", res);
  });

p3
  .save()
  .then((res) => {
    console.log("saved person3: ", res);
    return res;
  });

p4
  .save()
  .then((res) => {
    console.log("saved person4: ", res);
    return res;
  })
  .then((res) => {
    console.log("updating person with name lmn, to name lol");
    Person
      .updateWithQuery({ name: "lmn" }, { name: "lol" })
      .then((res) => {
        console.log("Output of updateWithQuery: ", res);
      });
  })

console.log("Printing p1: ", p1);
console.log("Printing p2: ", p2);
console.log("Printing p3: ", p3);
console.log("Printing p4: ", p4);

setTimeout(() => {
  //Finding person
  Person
    .findOne(1)
    .then((res) => {
      console.log("Output of findOne: ", res);
    })

  Person
    .getAll()
    .then((res) => {
      console.log("Output of getAll: ", res)
    })

  Person
    .find({ name: "pqr" })
    .then((res) => {
      console.log("Output of find: ", res);
    })

}, 1000);
//assign method testing
console.log("now testing assign method");
var p5 = new Person();
p5.save()
  .then((res) => {
    res
      .set("name", "mack")
      .set("age", 22)
      .set("gender", "male")
      .set("designation", "developer")
      .set("salary", 1600)
    console.log("Printing person before assign: ", res)
    console.log("assiging object", {name: "jack", age: 99})
    res.assign({name: "jack", age: 99})
    console.log("Printing person after assign: ", res)
    return res
  })

