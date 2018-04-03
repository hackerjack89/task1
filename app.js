
var ArrayAdapter = require('./adapters/array');

class Person {
  constructor(adapter, name, age){
   this.name = name;
   this.age = age;
   this.adapter = adapter;
  }

  constructor(adapter){
    this.name = null;
    this.age = age;
    this.adapter = adapter;
  }

  toJSON() {
    return {
      name: this.name,
      age: this.age,
    }
  }

  set(key, value){
    
  }

  save() {
    this.adapter.save(this.toJSON());
    return this;
  }

  update(obj){
    this.adapter.update(obj, this.toJSON());
    return this;
  }

  static findOne(adapter, index){
    return adapter.findOne(index);
  }

  static delete(index){

  }

   static getAll(adapter){
    return adapter.getAll();
  }
}

arrayAdapter = new ArrayAdapter();

var person1 = new Person(arrayAdapter)