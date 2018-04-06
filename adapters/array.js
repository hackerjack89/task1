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
			this.collection.push(obj)
			resolve(this.collection[_id]);
		});
	}

	updateWithQuery(query, changeset) {
		return new Promise((resolve, reject) => {
			var keys = Object.keys(query);
			var index = this.collection.findIndex(x => x[keys[0]] == query[keys[0]]);
			if (index > -1) { //Element exists
				changeset["_id"] = index;
				this.collection[index] = changeset;
				resolve(this.collection[index]);
			}
		});
	}
	find(query) {
		return new Promise((resolve, reject) => {
			var keys = Object.keys(query);
			resolve(this.collection.filter(x => x[keys[0]] == query[keys[0]]))
		})
	}

	update(obj) {
		return new Promise((resolve, reject) => {
			var new_data = this.collection[obj._id];
			var keys = Object.keys(obj)
			keys.forEach(k => {
				new_data[k] = obj[k]
			});
			this.collection[obj._id] = new_data;
			resolve(this.collection[obj._id])
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

}

module.exports = ArrayAdapter;