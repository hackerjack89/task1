let Person = require("./person");

let p1 = new Person();
p1 = p1
.set("name", "test1")
.set("age", 22)
.set("salary", 16000)
.set("gender", "m")
.set("designation", "developer")
.save()

p1.then((res) => {
  res.set("name", "test2");
  res
  .update()
  .then(res => {
    //console.log("response of update: ", res);
    return res;
  })
  .catch(err => console.log("Some error occured: ", err));
})
.catch(err => console.log("Printing error from test file: ", err));

let p2 = new Person({ name: "pqr", age: 35 }).save();
let p3 = new Person({ name: "pqr", age: 40 }).save();
/*
setTimeout(() => {
  Person.updateWithQuery({ name: "test2" }, { name: "jack" }).then(
    res => {
      console.log("Response of updateWithQuery: ", res);
    }
  );
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
*/
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
setTimeout(() => {
  Person.getAll().then(res => {
    console.log("Response of getAll(): ", res);
  });

  Person.find({ name: "test2" })
    .then(res => {
      console.log("response of find: ", res);
      return res;
    })
    .catch(err => console.log("Error occured: ", err));

  Person.findOne("5ad078b7f0f07e33ba07c47a")
    .then(res => console.log("response of findOne: ", res))
    .catch(err => console.log("some error occured: ", err));
}, 350);
*/