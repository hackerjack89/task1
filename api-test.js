let Person = require('./person');

global.setT
Person.getAll().then(res => console.log("getAll(): ", res.length))
  .catch(err => {
    console.log(err)
  });

console.log('test')

/*
//for(i = 1; i < 4; i++){

p1 = new Person()
p1 = p1.set("name",`some${i}`)
p1 = p1.save()
.then(res => {
  console.log("response of save: ", res)
  return res
})
//}

p1 = p1.then(res => {
  res.set("age", 20);
  res.update().then(res => console.log("update: ", res));
});
*/
/*
Person.find({name: "someNew"})
.then(res => console.log("res of find: ", res))
*/
/*
Person.findOne('blte0d391ecdf8c335e')
.then(res => console.log("res of findOne: ", res))
*/
/*
Person.updateWithQuery({name: "someNew"}, {name: "modifiedSomeNew", salary: 1234})
.then(res => console.log("res of updatwWithQuery: ", res))
*/
/*
for(let i=0; i < 4; i++){
  
  p3 = new Person()

  p3
  .set("name", 'upsertCheck')
  .save()
  .then(res => console.log("saved person: ", res.toJSON()))
}
*/
/*
Person.upsert({name: 'someNew'},{gender: 'm'})
.then(res => {console.log("res of upsert for existing record: ", res)})

Person.upsert({name: 'upsertCheck'},{gender: 'm'})
.then(res => {console.log("res of upsert for multiple record: ", res)})

Person.upsert({name: 'non-existent'},{gender: 'm'})
.then(res => {console.log("res of upsert for non-existent record record: ", res)})
*/
/*
Person.upsertAll({name: 'someNew'},{gender: 'm'})
.then(res => {console.log("res of upsertAll for existing record: ", res)})

Person.upsertAll({name: 'non-existent'},{gender: 'm'})
.then(res => {console.log("res of upsertAll for non-existent record record: ", res)})
*/

Person.upsertAll({name: 'upsertCheck'},{gender: 'm'})
.then(res => {console.log("res of upsertAll for multiple record: ", res)})
