/**
 * By default uses array adapter, but adapter can also be supplied from 
 * constructor
 */
let ArrayAdapter = require('./adapters/array-adapter')
let arrayAdapter = new ArrayAdapter();

let MongoAdapter = require('./adapters/mongo-adapter')
let mongoAdapter = new MongoAdapter('task1', 'Persons')

let BuiltAdapter = require('./adapters/built-adapter')
let builtAdapter = new BuiltAdapter('blt235f2d8cc1ce6005', 'person')

let ApiAdapter = require('./adapters/api-adapter')
let apiAdapter = new ApiAdapter('blt235f2d8cc1ce6005', 'person', 'test2@mail.com', 'test123')

//const ADAPTER = arrayAdapter;
const ADAPTER = apiAdapter;

/**
 * Represents a person. Person can have any number of attributes. Number of 
 * attributes are arbitrary
 * 
 * @constructor
 * @param {Object} obj - An object with person attributes.
 * @param {Object} adapter - Adapter is used to specify which backend we want 
 * to use
 * @returns {Object} Returns a new person object
 * @example
 * p1 = new Person()
 * 
 * p2 = new Person({name: "jack", age:30})
 * 
 * p3 = new Person({name: "lol", age: 22}, myAdapter)
 */
class Person {
  constructor(obj = {}, adapter) {
    this.data = {};
    this.adapter = adapter || ADAPTER;
    this.idField = this.adapter.idField;
    this.delta = obj;
  }

  /**
   * used to return data of person
   * @returns {Object} This object contains saved person data.
   * @example
   *
   * p1 = new Person({name: "jack", age: 29}).save()
   * p1.toJSON()
   * => {name: "jack", age: 29}
   */
  toJSON() {
    return this.data;
  }

  /**
   * sets the changes to person in delta. Person needs to be saved first
   * before calling this method.
   *
   * @param {String} key - name of the attribtute to set on person
   * @param {Any} value - value to be saved against the key on person
   *
   * @returns {Object} - Returns the current person object with supplied
   * attributs saved in delta
   *
   * @example
   *
   * p1 = new Person().save()
   * => Person{
   *      ...
   *      delta: {}
   *    }
   * p1.set("name", "lol")
   * => Person{
   *      ...
   *      delta: {name: "jack"}
   *    }
   *
   */
  set(key, value) {
    this.delta[this.idField] = this.data[this.idField];
    this.delta[key] = value;
    return this;
  }

  /**
   * Assigns an object with multiple or single attributes. If attribute(s) are
   * present in delta, then attributes assigned using this method
   * overrides attributes assing using set(key,val). If attribute(s) are not
   * present in delta, they are created
   *
   * @param {Object} obj - An object with set of attributes
   *
   * @returns {Object} Returns current person object with delta set using
   * contents of given object parameter
   *
   * @example
   *
   * p1 = new Person().save()
   * p1.set("name","jack")
   * p1.set("age",20})
   * => Person {
   *      ...
   *      delta: {name: "jack", age: 20}
   *    }
   *
   * p1.assign({age: 25, gender: 'm'})
   * => Person{
   *      ...
   *      delta:{name: "jack", age: 25, gender: 'm'}
   *    }
   */
  assign(obj) {
    this.delta[this.idField] = this.data[this.idField];
    for (var i in obj) {
      this.delta[i] = obj[i];
    }
    return this;
  }

  /**
   * Rollbacks all the changes that are set on person using either set() or
   * assign() method.
   *
   * @returns {Object} Returns current person object after emptying delta.
   *
   * @example
   * p1 = new Person().save()
   * p1.set("name", "jack")
   * => Person{
   *      ...
   *      delta: {name: "jack"}
   *    }
   * p1.revert()
   * => Person{
   *      ...
   *      delta:{}
   *    }
   */
  revert() {
    this.delta = {};
    return this;
  }

  /**
   * Saves the current person in storage defined
   * by adapter(default array adpter) this object with data property set
   * with the id along with other attributes(if any) passed in constructor
   *
   * @returns {Object} Returns current person object after saving
   *
   * @example
   *
   * p1 = new Person({name: "jack"})
   * p1.save()
   * => Person{
   *      ...
   *      data: {_id: 1}
   *    }
   */
  save() {
    return this.adapter.save(this.delta).then(res => {
      this.delta = {};
      this.data = res;
      return this;
    });
  }

  /**
   * Updates current person object using the values in delta. Person should be
   * saved first, before calling this method on it.
   *
   * @returns {Object} Returns current person object after successful updation
   *
   * @example
   *
   * p1 = new Person({name: "jack"}).save()
   * => Person{
   *      ...
   *      data: {_id: 1, name: "jack"}
   *    }
   * p1
   * .assign({name: "lol", age: 20})
   * .update()
   * => Person{
   *      ...
   *      data:{_id: 1, name: "lol", age: 20}
   *    }
   */
  update() {
    return this.adapter.update(this.delta).then(res => {
      this.data = res;
      this.delta = {};
      return this;
    });
  }

  /**
   * A static method to update person based on given query.
   * @param {Object} query - Object having key value to search against
   * @param {Object} changeset - Changes that are to be commited
   * @param {Object} adapter - Optional adapter, if not specifed defaults to
   * arrayAdapter
   *
   * @returns {Object} - Returns a promise object having a JSON response.
   *
   * @example
   *
   *
   */
  static updateWithQuery(query, changeset, adapter = ADAPTER) {
    return adapter.updateWithQuery(query, changeset);
  }

  /**
   *
   * @param {String|Number} index - primary key for identifying record
   * @param {Object} adapter - Optional argument to specify adapter.
   */
  static findOne(index, adapter = ADAPTER) {
    return adapter.findOne(index);
  }

  static find(query, adapter = ADAPTER) {
    return adapter.find(query);
  }

  static getAll(adapter = ADAPTER) {
    return adapter.getAll();
  }

  static upsert(query, delta, adapter = ADAPTER) {
    return adapter.upsert(query, delta);
  }

  static upsertAll(query, delta, adapter = ADAPTER) {
    return adapter.upsertAll(query, delta);
  }

  toString() {
    return {
      data: this.data,
      delta: this.delta
    };
  }
}

module.exports = Person;