let Person = require('./person')
/*
let p1 = new Person()
p1 = p1
.set("name","lol")
.set("age",20)
.save()
.then(res => {console.log("response of save: ", res.toJSON());return res }  )

p1 = p1.then(res => {
  res.assign({salary: 16000, gender: 'm'})
  console.log("Printing p1 after assign: ", res.toString())
  return res.update()
})

p1.then(res => {
  console.log("Response of update: ", res.toJSON())
})
Person.getAll()
.then(res => {
  console.log("Printing response of getAll(): ", res )
})
.catch(err => console.log("Error occured from getAll():  ", err))

Person.updateWithQuery({name: "lol"}, {name: "peter"})
.then(res => {
  console.log("output of update with query: ", res)
})
.catch(err => {
  console.log("Error occured from updatewithquery: ", err)
})

Person.find({name: 'lol'})
.then(res => {
  console.log("Output of find: ", res)
})
.catch(err => {
  console.log("Error occured find(): ", err)
})

Person.findOne('bltd30c933e9e9a543e')
.then(res => {
  console.log("Printing response of findOne(): ", res )
})
.catch(err => console.log("Error occured from findOne():  ", err))
*/

p2 = new Person()
/*
p2
.set("name", 'unique_person')
.save()
.then(res => {
   Person.upsert({name: 'unique_person'},{age: 1888})
   .then(res => {
     console.log("res of single record for upsert: ", res);
   })
   .catch(err => {
     console.log("Error occured in upsert for single record: ", err);
   })
})
.catch(err => console.log("Error occured in creating unique person:  ", JSON.stringify(err)))
*/
Person.upsert({name: 'unique_person'},{age: 1888})
.then(res => {
  console.log("res of single record for upsert: ", res);
})
.catch(err => {
  console.log("Error occured in upsert for single record: ", err);
})

Person.upsert({name: 'upsertCheck'}, {salary: 99})
.then(res => {
  console.log("output of more than record for upsert", res);
})
.catch(err => {
  console.log("Error occured in upsert for more than one record.Please use upsertAll");
});

Person.upsert({name: "non-existing"}, {age: 9999})
.then(res => {
  console.log("res of upsert for non-existing record: ", res)
})
.catch(err => {
  console.log("Error occured in upsert for non-existing record: ", err);
});
/*
for(let i=0; i < 6; i++){
  
  p3 = new Person()

  p3
  .set("name", 'upsertCheck')
  .save()
  .then(res => console.log("saved person: ", res.toJSON()))
}
*/
/*
Person.upsertAll({ name: "upsertCheck" }, { age: 999 })
.then(res => {
  console.log("res of multiple record for upsertAll(): ", res);
})
.catch(err => {
  console.log("Error occured in upsertAll for multiple record: ", err);
});
Person.upsertAll({name: 'unique_person'},{age: 100})
.then(res => {
  console.log("res of single record for upsertAll: ", res);
})
.catch(err => {
  console.log("Error occured in upsertAll for single record: ", err);
})

Person.upsertAll({name: "non-existing"}, {age: 9999})
.then(res => {
  console.log("res of upsert for non-existing record: ", res)
})
.catch(err => {
  console.log("Error occured in upsert for non-existing record: ", err);
});
*/