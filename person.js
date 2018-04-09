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

  save(cb) {
    this.adapter.save(this.delta, (savedObj) => {
      this.delta = {};
      this.data = savedObj;
      if(typeof cb === 'function'){
        cb(this);
      }
    });
  }

  update(cb) {
    this.adapter.update(this.delta, (res) => {
      setTimeout( () => {
        this.data = res;
        this.delta = {}
        if (typeof cb === 'function') {
          cb(res);
        }
      },500)
    });
  }

  static updateWithQuery(query,changeset,cb, adapter=arrayAdapter){
    adapter.updateWithQuery(query, changeset, (res) => {
      if(typeof cb === 'function'){
        return cb(res);
      }
    });
  }

  static findOne(index, cb, adapter=arrayAdapter){
    adapter.findOne(index, (res) => {
      if(typeof cb === 'function'){
        cb(res);
      }
    });
  }

  static find(query, cb, adapter=arrayAdapter){
    adapter.find(query,(res) => {
      if(typeof cb === 'function'){
        cb(res)
      }
    })
    
  }

   static getAll(cb, adapter=arrayAdapter){
     adapter.getAll( (people) => {
       if(typeof cb === 'function'){
        return cb(people);
       }
    });
  }
}

module.exports = Person;