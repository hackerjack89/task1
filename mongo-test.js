let Person = require("./person");

let p1 = new Person();
p1
  .set("name", "test1")
  .set("age", 22)
  .set("salary", 16000)
  .set("gender", "m")
  .set("designation", "developer")
  .save()
  .then(res => {
    //console.log("Printing response of save: ", res);
    res.set("name", "test2");
    res
      .update()
      .then(res => {
        console.log("response of update: ", res);
        Person.updateWithQuery({name: "test2"},{name: "jack"})
        .then(res => {
          console.log("Response of updateWithQuery: ",res )
        })
        return res;
      })
      .catch(err => console.log("Some error occured: ", err));
      
  let p2 = new Person({name: "pqr", age: 35}).save()
  let p3 = new Person({name: "pqr", age: 40}).save()

  });
setTimeout(() => {
  console.log("Output of upsert");
  Person.upsert({ name: "jack" }, { age: 30 })
    .then(res => {
      console.log("Printing output of upsert for existing record: ", res);
    })
    .catch(err => {
      console.log(err);
    });

  Person.upsert({ name: "pqr" }, { age: 30 })
    .then(res => {
      console.log(
        "Printing output of upsert for query returning multiple records: ",
        res
      );
    })
    .catch(err => {
      console.log("output of multiple records");
      console.log(err);
    });

  Person.upsert({ name: "hackerjack" }, { age: 30 })
    .then(res =>
      console.log("Printing output of upsert for non-existing record: ", res)
    )
    .catch(err => {
      console.log(err);
    });
}, 200);

setTimeout(() => {
  console.log("Output of upsertAll");
  Person.upsertAll({ name: "jack" }, { age: 32 })
    .then(res =>
      console.log("Printing output of upsertAll for existing record: ", res)
    )
    .catch(err => {
      console.log(err);
    });

  Person.upsertAll({ name: "pqr" }, { age: 32 })
    .then(res =>
      console.log(
        "Printing output of upsertAll for query returning multiple records: ",
        res
      )
    )
    .catch(err => {
      console.log("output of multiple records");
      console.log(err);
    });

  Person.upsertAll({ name: "hackerjack" }, { age: 32 })
    .then(res =>
      console.log("Printing output of upsertAll for non-existing record: ", res)
    )
    .catch(err => {
      console.log(err);
    });
}, 300);
/*
Person
.getAll()
.then(res => {
  console.log("Response of getAll(): ", res);
})

Person
.find({name: "test1"})
.then((res) => {
  console.log("response of find: ", res)
  return res
})
.catch(err => console.log("Error occured: ", err))

Person
.findOne("5acef0261351465cb81ba926")
.then((res) => console.log("response of findOne: ", res))
.catch(err => console.log("some error occured: ", err))
*/