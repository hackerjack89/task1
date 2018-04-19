var ArrayAdapter = require('./adapters/array-adapter');
var arrayAdapter = new ArrayAdapter();

const ADAPTER = arrayAdapter;

class Person {
  constructor(obj={}, adapter){
   this.data={}
   this.adapter = adapter || ADAPTER;
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

  static updateWithQuery(query, changeset, adapter = ADAPTER) {
    return adapter.updateWithQuery(query, changeset);
  }

  static findOne(index, adapter=ADAPTER){
    return adapter.findOne(index);
  }

  static find(query, adapter=ADAPTER){
    return adapter.find(query);
  }

   static getAll(adapter=ADAPTER){
     return adapter.getAll();
  }

  static upsert(query, delta, adapter=ADAPTER){
    return adapter.upsert(query, delta)
  }

  static upsertAll(query, delta, adapter=ADAPTER){
    return adapter.upsertAll(query, delta)
  }


}

module.exports = Person;