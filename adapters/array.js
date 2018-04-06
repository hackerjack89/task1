class ArrayAdapter {
	constructor() {
		this.collection = [];
	}

	getAll(cb) {
		if (typeof cb === 'function') {
			cb(this.collection);
		}
	}

	save(obj, cb) {
		//get the value of id attribute from array length,
		//since array index can be used as an id to locate
		//an element in array
		var _id = this.collection.length;
		obj["_id"] = _id;
		this.collection.push(obj)
		if (typeof cb === 'function') {
			cb(this.collection[_id])
		}
	}

	updateWithQuery(query, changeset, cb) {
		var keys = Object.keys(query);
		var index = this.collection.findIndex(x => x[keys[0]] == query[keys[0]]);
		if (index > -1) { //Element exists
			changeset["_id"] = index;
			this.collection[index] = changeset;
			if (typeof cb === 'function') {
				cb(this.collection[index]);
			}
		}
	}


	find(query, cb) {
		var keys = Object.keys(query);
		if(typeof cb === 'function'){
			cb( this.collection.filter(x => x[keys[0]] == query[keys[0]]) )
		}
	}

	update(obj, cb) {
		var new_data = this.collection[obj._id];
		var keys = Object.keys(obj)
		keys.forEach(k => {
			new_data[k] = obj[k]
		});
		this.collection[obj._id] = new_data;
		if(typeof cb === 'function'){
			cb(this.collection[obj._id])
		}
	}

	findOne(index, cb) {
		if (typeof cb === 'function') {
			if (this.collection[index] != undefined) {
				cb(this.collection[index]);
			} else {
				cb(null);
			}
		}
	}

}


module.exports = ArrayAdapter;