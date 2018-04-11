class ArrayAdapter {
  constructor() {
    this.collection = [];
  }

  getAll() {
    return new Promise((resolve, reject) => {
      resolve(this.collection);
    });
  }

  save(obj) {
    //get the value of id attribute from array length,
    //since array index can be used as an id to locate
    //an element in array
    return new Promise((resolve, reject) => {
      var _id = this.collection.length;
      obj["_id"] = _id;
      this.collection.push(obj);
      resolve(this.collection[_id]);
    });
  }

  updateWithQuery(query, changeset) {
    return new Promise((resolve, reject) => {
      var keys = Object.keys(query);
      var index = this.collection.findIndex(x => x[keys[0]] == query[keys[0]]);
      if (index > -1) {
        //Element exists
        changeset["_id"] = index;
        this.collection[index] = changeset;
        resolve(this.collection[index]);
      }
    });
  }
  find(query) {
    return new Promise((resolve, reject) => {
      var keys = Object.keys(query);
      resolve(this.collection.filter(x => x[keys[0]] == query[keys[0]]));
    });
  }

  update(obj) {
    return new Promise((resolve, reject) => {
      //get an existing data using obj._id as a collection index id
      var data = this.collection[obj._id];
      //get all keys of object
      var keys = Object.keys(obj);
      keys.forEach(k => {
        data[k] = obj[k];
      });
      //replace old data with modified data
      this.collection[obj._id] = data;
      resolve(this.collection[obj._id]);
    });
  }

  findOne(index) {
    return new Promise((resolve, reject) => {
      if (this.collection[index] != undefined) {
        resolve(this.collection[index]);
      } else {
        resolve(null);
      }
    });
  }

  upsert(query, delta) {
    //check for query in collection,
    //if found, act on it

    //otherwise create it.
    return new Promise((resolve, reject) => {
      this.find(query).then(res => {
        if (res.length == 0) {
          //not found
          //record not found, create it
          let obj = query; //assigned to object because merge function modifies first object
          Object.assign(obj, delta);
          this.save(obj).then(data => resolve(data));
        } else if (res.length > 1) {
          //More than one records are found. return error
          return reject(
            new Error("More than one records are found. Please use upserAll()")
          );
        } else {
          //single record is found, update it.
          let obj = query;
          Object.assign(obj, { _id: res[0]["_id"] }, delta);
          this.update(obj).then(res => {
            resolve(res);
          });
        }
      });
    });
  }

  upsertAll(query, delta) {
    return new Promise((resolve, reject) => {
      this.find(query).then(res => {
        if (res.length == 0) {
          //not found
          //record not found, create it
          let obj = query; //assigned to object because merge function modifies first object
          Object.assign(obj, delta);
          this.save(obj).then(data => resolve(data));
        } else if (res.length > 1) {
					//More than one records are found. return error
					let dataLength = res.length
					let result= new Array(dataLength)
					res.forEach((val, index)=> {
						console.log("Printing id: ", val["_id"])
						let obj = val
						Object.assign(obj, {_id: val["_id"]}, delta)
						this
						.update(obj)
						.then(res => {
								result[index] = res
						})
						if(dataLength === (index+1))
							resolve(result)
					})
        } else {
          //single record is found, update it.
          let obj = query;
          Object.assign(obj, { _id: res[0]["_id"] }, delta);
          this.update(obj).then(res => {
            resolve(res);
          });
        }
      });
    });
  }
}

module.exports = ArrayAdapter;