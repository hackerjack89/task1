let Mongo = require("mongodb");
let MongoClient = Mongo.MongoClient;

class MongoAdapter {
  constructor(dbName, collectionName) {
    this.dbName = dbName;
    this.db = "";
    this.collectionName = collectionName;
    this.collection = "";
  }

  connect() {
    return MongoClient.connect("mongodb://localhost:27017")
    .then(client => {
      this.db = client.db(this.dbName);
      this.collection = this.db.collection(this.collectionName);
      this.client = client;
      return;
    }).catch(err => {throw err;});
  }

  close() {
    this.client.close();
  }

  getAll() {
    return this.connect().then(() => {
      return this.collection.find({}).toArray().then(res => {this.close(); return res;});
    });
  }

  save(obj) {
    return this.connect().then(() => {
      return this.collection.insert(obj).then(res => {this.close(); return res.ops[0];});
    });
  }

  update(delta) {
    var o_id = new Mongo.ObjectID(delta["_id"]);
    delete delta["_id"];
    let selector = { _id: o_id };
    return this.connect().then(() => {
      return this.collection.findOneAndUpdate(selector, { $set: delta }, { returnOriginal: false })
      .then(res => {this.close(); return res.value;});
    });
  }

  updateWithQuery(query, changeset) {
    return this.connect().then(() => {
      return this.collection.findOneAndUpdate(query, { $set: changeset }, { returnOriginal: false })
      .then(res => {this.close();return res.value;});
    });
  }

  findOne(id) {
    return this.connect().then(() => {
      return this.collection.findOne({ _id: new Mongo.ObjectID(id) }).then(res => {this.close();return res;});
    });
  }

  find(query) {
    return this.connect().then(() => {
      return this.collection.find(query).toArray().then(res => {this.close();return res;});
    });
  }

  upsert(query, delta) {
    return this.connect().then(() => {
      return this.collection.find(query).toArray()
      .then(res => {
        if (res.length == 0) {
          return this.collection.findOneAndUpdate(query,{ $set: delta },{ returnOriginal: false, upsert: true })
          .then(data => {this.close();return data.value;});
        } else if (res.length > 1) {
          return new Error("More than one records are found. Use upsertAll() ")
        } else {
          return this.collection.findOneAndUpdate(query,{ $set: delta },{ returnOriginal: false, upsert: true })
          .then(data => {this.close();return data.value;});
        }
      });
    });
  }

  upsertAll(query, delta){
    return this.connect().then(() => {
      return this.collection.updateMany(query, {$set: delta},{upsert: true})
      .then((res) => {
          return this.collection.find(query).toArray()
          .then((res) => {this.close();return res})
      })
    })
  }

}//MongoAdapter class ends

module.exports = MongoAdapter;