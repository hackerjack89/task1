class ArrayAdapter {
  constructor() {
    this.collection = [];
  }

  getAll() {
    return Promise.resolve(this.collection)
  }

  save(obj) {
    //get the value of id attribute from array length, since array index can be used as an id to locate
    //an element in array
    var _id = this.collection.length;
    this.collection.push( Object.assign(obj,{_id: _id }) );
    return Promise.resolve(obj);
  }

  updateWithQuery(query, changeset) {
    var keys = Object.keys(query);
    var element = this.collection.find(x => {return x[keys[0]] == query[keys[0]]});
    if (!!element) {
      //Element exists
      keys.forEach(key => {
        element[key] = changeset[key]
      })
      this.collection[element._id] = element;
      return Promise.resolve(this.collection[element._id]);
    }
    return Promise.resolve(null)
  }
  find(query) {
    var keys = Object.keys(query);
    return Promise.resolve(this.collection.filter(x => x[keys[0]] == query[keys[0]]));
  }

  update(obj) {
    //get an existing data using obj._id as a collection index id
    var data = this.collection[obj._id];
    //get all keys of object
    var keys = Object.keys(obj);
    keys.forEach(k => {
      data[k] = obj[k];
    });
    //replace old data with modified data
    this.collection[obj._id] = data;
    return Promise.resolve(this.collection[obj._id]);
  }

  findOne(index) {
    if (this.collection[index] != undefined) {
      return Promise.resolve(this.collection[index]);
    }
    return Promise.resolve(null);
  }

  upsert(query, delta) {
    //check for query in collection,if found, act on it, otherwise create it.
    return this.find(query).then(res => {
      if (res.length == 0) {
        //record not found, create it
        return this.save(Object.assign(query, delta))
      } else if (res.length == 1) {
        //single record is found, update it.
        return this.update(Object.assign(query, { _id: res[0]["_id"] }, delta))
      } else {
        //More than one records are found. return error
        return Promise.reject(new Error("More than one records are found. Please use upserAll()"));
      }
    });
  }

  upsertAll(query, delta) {
    return this.find(query).then(res => {
      if (res.length == 0) {
        //record not found, create it
        return this.save(Object.assign(query, delta))
      } else if (res.length == 1) {
        //single record is found, update it.
        return this.update(Object.assign(query, { _id: res[0]["_id"] }, delta));
      } else {
        //More than one records are found. return error
        let result = []
        res.forEach(val => result.push(this.update(Object.assign(val, { _id: val["_id"] }, delta))))
        return Promise.all(result);
      }
    });
  }
}

module.exports = ArrayAdapter;