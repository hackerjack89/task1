let Person = require('./person');

/*Creating person instaces*/
console.log("Creating person instances...");
var p1= new Person();
console.log("Created Person 1", p1);
var p2 = new Person();
console.log("Created Person 2", p2);
var p3 = new Person({name: "pqr", age: 99});
console.log("Created Person 3", p3);

//Saving
console.log("Saving person");
p1.save()
console.log("saved person1: ", p1);
p2.save()
console.log("saved person2: ", p2);
p3 = p3.save();
console.log("saved person3: ", p3);

//Setting person attributes
p1.set("name","abc")
  .set("age",22)
  .set("gender","male")
  .set("designation","developer")
  .set("salary",1600)

p2.set("name", "pqr")

//updating person
console.log("Updating people")
p1.update();
console.log("Updated person 1: ", p1);
p2.update();
console.log("Updated person 2: ", p2);
console.log("updating person with name abc, to name lol");
console.log("Output of updateWithQuery: ")
Person.updateWithQuery({name: "abc"}, {name: "lol"}, (res) => {
    console.log(res);
});


//Finding person
console.log("Output of findOne:");
Person.findOne(1, (res) => {
    console.log(res);
})

console.log("Output of getAll: ")
Person.getAll((data) => {
    console.log(data);
});

console.log("Output of find: ")
Person.find({name: "pqr"}, (res) => {
    console.log(res)
});

//assign method testing
console.log("now testing assign method")
var p5= new Person();
p5.save()
    .set("name","mack")
    .set("age",22)
    .set("gender","male")
    .set("designation","developer")
    .set("salary",1600)


console.log("Printing person: ", p5)
console.log("assiging object", {name: "jack", age: 99})
p5.assign({name: "jack", age: 99})
console.log("Printing person after assign: ", p5)