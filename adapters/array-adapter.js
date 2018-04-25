class ArrayAdapter {
  constructor() {
    this.collection = [];
    this.idField = '_id';
  }

  deleteAll(){
    this.collection = [];
    return Promise.resolve(null);
  }

  getAll() {
    return Promise.resolve(this.collection);
  }
  save(obj) {
    //array index used as id to locate an element in array
    if( obj && (Object.prototype.toString.call(obj) === '[object Object]') ){
      var _id = this.collection.length;
      obj['_id'] = _id;
      return Promise.resolve(this.collection[_id] = obj);
    }
    return Promise.reject(new Error('Parameter should be an Object.'));
  }

  updateWithQuery(query, changeset) {
    var keys = Object.keys(query);
    var index = this.collection.findIndex(x => x[keys[0]] == query[keys[0]]);
    if (index > -1) {
      //Element exists
      changeset['_id'] = index;
      return Promise.resolve(this.collection[index] = changeset);
    }
  }

  find(query) {
    var keys = Object.keys(query);
    return Promise.resolve(this.collection.filter(x => x[keys[0]] == query[keys[0]]));
  }

  update(delta) {
    //get an existing data using obj._id as a collection index id
    var data = this.collection[delta._id];
    //get all keys of object
    var keys = Object.keys(delta);
    keys.forEach(k => {
      data[k] = delta[k];
    });
    //replace old data with modified data and resolve
    return Promise.resolve((this.collection[delta._id] = data));
  }

  findOne(index) {
    if (this.collection[index] != undefined) {
      return Promise.resolve(this.collection[index]);
    }
    return Promise.resolve(null);
  }

  upsert(query, delta) {
    //check for query in collection,if found, act on it
    //otherwise create it.
    return this.find(query).then(res => {
      if (res.length == 0) {
        //record not found, create it
        let obj = query; //assigned to object because merge function modifies first object
        Object.assign(obj, delta);
        return this.save(obj).then(data => {return data;});
      } else if (res.length > 1) {
        //More than one records are found. return error
        return Promise.reject(
          new Error(`More than one records are found.
            Please use upserAll()`)
        );
      }
      //single record is found, update it.
      let obj = query;
      Object.assign(obj, { _id: res[0]['_id'] }, delta);
      return this.update(obj).then(res => {
        return res;
      });
    });
  }

  upsertAll(query, delta) {
    return this.find(query).then(res => {
      if (res.length == 0) {
        //record not found, create it
        let obj = query; //assigned to object because merge function modifies first object
        Object.assign(obj, delta);
        return this.save(obj).then(data => {return data;});
      } else if (res.length > 1) {
        //More than one records are found. return error
        let dataLength = res.length;
        let result = new Array(dataLength);
        let counter = 1;
        res.forEach((val, index) => {
          let obj = val;
          Object.assign(obj, { _id: val['_id'] }, delta);
          this.update(obj).then(res => {
            result[index] = res;
          });
          if (dataLength === counter) return(result);
          counter++;
        });
      }
      //single record is found, update it.
      let obj = query;
      Object.assign(obj, { _id: res[0]['_id'] }, delta);
      return this.update(obj).then(res => {
        return res;
      });
    });
  }
}

module.exports = ArrayAdapter;
