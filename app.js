
var ArrayAdapter = require('./adapters/array');
var arrayAdapter = new ArrayAdapter();

class Person {
  constructor(options={}){
   this.name = options.name || null;
   this.age = options.age || null;
   this._id = options._id;
   this.adapter = options.adapter || arrayAdapter;
  }

  toJSON() {
    return {
      name: this.name,
      age: this.age,
      _id: this._id

    }
  }

  set(key, value){
    if(key == "name"){
      this.name = value;
    }else if(key == "age"){
      this.age = value;
    }

    return this;
  }

  save() {
    this._id = this.adapter.save(this.toJSON());
    return this;
  }

  update(){
    this.adapter.update(this.toJSON());
    return this;
  }

  static updateWithQuery(adapter, query, changeset){
    return new Person(adapter.updateWithQuery(query, changeset));
  }

  static findOne(adapter, index){
    return new Person(adapter.findOne(index));
  }

  static find(adapter, query){
    return adapter.find(query).map(x=> new Person(x));
    
  }

  static delete(index){

  }

   static getAll(adapter){
    return adapter.getAll();
  }
}


var person1 = new Person()
var person2 = new Person()
var person3 = new Person({name: "pqr", age: 99})

person1 = person1.save()
person2 = person2.save()
person3 = person3.save()

person1
  .set("name", "abc")
  .set("age", 32)
  .update()

person2
  .set("name", "pqr")
  .update()

console.log("Output of person2: ", person2)

console.log("Output of getall: ",Person.getAll(arrayAdapter));

console.log("Output of updateWithQuery: ",Person.updateWithQuery(arrayAdapter, {name: "abc"}, {name: "lol"}));

console.log("Output of getAll: ",Person.getAll(arrayAdapter));

console.log("Output of findone: ", Person.findOne(arrayAdapter, 1))

console.log("Output of find: ", Person.find(arrayAdapter, {name: "fasfsad"}))
