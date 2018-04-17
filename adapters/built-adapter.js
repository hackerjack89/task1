var Built = require('built.io')
class BuiltAdapter {
  constructor(apiKey, className) {
    this.BuiltApp = Built.App(apiKey);
    this.Model = this.BuiltApp.Class(className).Object;
    this.query = this.BuiltApp.Class(className).Query;
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
      if(res.length > 0){
        return this.update(Object.assign(changeset, { uid: res[0]["uid"] }));
      }
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
    return this.BuiltApp.Class(this.className).Object(id).fetch().then(res => {
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
            let uid = e['uid']
            let toUpsert = this.Model(Object.assign(delta, query));
            return toUpsert.upsert(Object.assign(query, {uid: uid})).save().then(res => {
              result.push(res.toJSON())
              if(dataLength === counter) {resolve(result);}
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