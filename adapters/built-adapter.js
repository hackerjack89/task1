var Built = require('built.io')
var BuiltApp = Built.App('blt235f2d8cc1ce6005');
class BuiltAdapter {
  constructor(className, options) {
    this.Model = BuiltApp.Class(className).Object;
    this.query = BuiltApp.Class(className).Query;
    this.className = className;
    this.idField = "uid";
  }

  getAll() {
    return this.query().exec().then(res => {return res.map(x => x.toJSON());});
  }

  save(obj) {
    if(obj.uid === undefined){
      delete obj['uid']
    }
    return this.Model(obj).save().then(res => {return res.toJSON();});
  }

  update(obj) {
    return this.Model(obj).save().then(res => {return res.toJSON();});
  }

  updateWithQuery(query, changeset) {
    return this.find(query).then(res => {
      return this.update(Object.assign(changeset, { uid: res[0]["uid"] }));
    });
  }

  find(query) {
    let key = Object.keys(query)[0];
    let val = query[key];
    return this.query().where(key, val).exec().then(res => {
        return res.map(x => x.toJSON());
      });
  }

  findOne(id) {
    return BuiltApp.Class(this.className).Object(id).fetch().then(res => {
        return res.toJSON();
      });
  }

  upsert(query, delta) {
    let toUpsert = this.Model(Object.assign(delta, query));
    return toUpsert.upsert(query).save().then(res => {
      return res.toJSON();
    })
    .catch(err => { return Promise.reject(err) })
  }

  upsertAll(query, delta){
    return this.find(query).then(res => {
      let dataLength = res.length
      let result = []
      let counter = 1
      if(res.length > 1){
        return new Promise((resolve, reject) => {
          res.forEach(e => {
            console.log("Printing e:", e)
            let uid = e['uid']
            let toUpsert = this.Model(Object.assign(delta, query));
            return toUpsert.upsert(Object.assign(query, {uid: uid})).save().then(res => {
              result.push(res.toJSON())
              if(dataLength === counter) {
                resolve(result);
              }
              counter++
            })
          });
        })
      }else{
        let toUpsert = this.Model(Object.assign(delta, query));
        return toUpsert.upsert(query).save().then(res => {
          return new Array(res.toJSON());
        })
      }
    })
  }

}

module.exports = BuiltAdapter;