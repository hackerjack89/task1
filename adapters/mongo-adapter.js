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
    return new Promise((resolve, reject) => {
      MongoClient.connect("mongodb://localhost:27017", (err, client) => {
        if (err) throw err;
        this.db = client.db(this.dbName);
        this.collection = this.db.collection(this.collectionName);
        this.client = client;
        resolve(this);
      });
    });
  }

  close() {
    this.client.close();
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.collection.find({}).toArray((err, docs) => {
          this.close();
          if (err) reject(new Error(err));
          resolve(docs);
        });
      });
    });
  }

  save(obj) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.collection.insert(obj, (err, res) => {
          this.close();
          if (err) reject(new Error(err));
          resolve(res.ops[0]);
        });
      });
    });
  }

  update(delta) {
    var o_id = new Mongo.ObjectID(delta["_id"]);
    delete delta["_id"];
    console.log("Printing delta:", delta);
    let selector = { _id: o_id };
    console.log("Printing selector: ", selector);
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.collection.findOneAndUpdate(
          selector,
          { $set: delta },
          { returnOriginal: false },
          (err, res) => {
            this.close();
            if (err) throw err;
            resolve(res.value);
          }
        );
      });
    });
  }

  updateWithQuery(query, changeset) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.collection.findOneAndUpdate(
          query,
          { $set: changeset },
          { returnOriginal: false },
          (err, res) => {
            this.close();
            if (err) throw err;
            resolve(res.value);
          }
        );
      });
    });
  }

  findOne(id) {
    return new Promise((resolve, rejecct) => {
      this.connect().then(() => {
        var o_id = new Mongo.ObjectID(id);
        this.collection.findOne({ _id: o_id }, (err, res) => {
          this.close();
          if (err) throw err;
          resolve(res);
        });
      });
    });
  }

  find(query) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.collection.find(query).toArray((err, docs) => {
          this.close();
          if (err) throw err;
          resolve(docs);
        });
      });
    });
  }

  upsert(query, delta) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.collection.find(query).toArray((err, res) => {
          if (res.length == 0) {
            console.log("in length == 0 block");
            this.collection.findOneAndUpdate(
              query,
              { $set: delta },
              { returnOriginal: false, upsert: true },
              (err, data) => {
                this.close();
                if (err) throw err;
                resolve(data.value);
              }
            );
          } else if (res.length > 1) {
            console.log("in length > 1 block");
            return reject(
              new Error("More than one records are found. Use upsertAll() ")
            );
          } else {
            console.log("in else block");
            console.log("query: ", query);
            console.log("delta: ", delta);
            this.collection.findOneAndUpdate(
              query,
              { $set: delta },
              { returnOriginal: false, upsert: true },
              (err, data) => {
                console.log("in callback");
                console.log(data);
                this.close();
                if (err) throw err;
                resolve(data.value);
              }
            );
          }
        });
      });
    });
  }

  upsertAll(query, delta) {
    return new Promise((resolve, reject) => {
      this.connect().then(() => {
        this.collection.find(query).toArray((err, res) => {
          if (res.length == 0) {
            console.log("in length == 0 block");
            this.collection.findOneAndUpdate(
              query,
              { $set: delta },
              { returnOriginal: false, upsert: true },
              (err, data) => {
                this.close();
                if (err) throw err;
                resolve(data.value);
              }
            );
          } else if (res.length > 1) {
            console.log("in length > 1 block");
            let dataLength = res.length;
            let result = new Array(dataLength);
            res.forEach((doc, index) => {
              let obj_id = doc["_id"];
              let selector = { _id: obj_id };
              this.collection.findOneAndUpdate(
                selector,
                { $set: delta },
                { returnOriginal: false, upsert: true },
                (err, data) => {
                  result[index] = data.value
                  if(dataLength == index+1){
                    resolve(result)
                  }
                }
              );
            });
          } else {
            this.collection.findOneAndUpdate(
              query,
              { $set: delta },
              { returnOriginal: false, upsert: true },
              (err, data) => {
                this.close();
                if (err) throw err;
                resolve(data.value);
              }
            );
          }
        });
      });
    });
  }
}

module.exports = MongoAdapter;
