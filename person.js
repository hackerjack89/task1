var ArrayAdapter = require('./adapters/array');
var arrayAdapter = new ArrayAdapter();

class Person {
  constructor(obj={}, adapter){
   this.data={}
   this.adapter = adapter || arrayAdapter;
   this.delta = obj;
  }

  toJSON() {
    return this.data
  }

  set(key, value){
    this.delta["_id"]= this.data._id;
    this.delta[key] = value;
    return this;
  }

  assign(obj){
    this.delta["_id"]=this.data._id;
    for(var i in obj){
      this.delta[i] = obj[i];
    }
    return this;
  }

  revert(){
    this.delta={}
    return this;
  }

  save() {
    return this.adapter
      .save(this.delta)
      .then((res) => {
        this.delta = {};
        this.data = res;
        return this;
      });
  };

  update() {
    return this.adapter
      .update(this.delta)
      .then((res) => {
        this.data = res;
        this.delta = {}
        return this;
      })
  }

  static updateWithQuery(query, changeset, adapter = arrayAdapter) {
    return adapter.updateWithQuery(query, changeset);
  }

  static findOne(index, adapter=arrayAdapter){
    return adapter.findOne(index);
  }

  static find(query, adapter=arrayAdapter){
    return adapter.find(query);
  }

   static getAll(adapter=arrayAdapter){
     return adapter.getAll();
  }
}

module.exports = Person;