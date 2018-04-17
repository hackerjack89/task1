let axios = require('axios');
let axiosConfig = {
  headers: {'application_api_key': '', 'Content-Type': 'application/json', authtoken: ''},
  baseURL: 'https://api.built.io/v1/'
};
let authToken = ''
class ApiAdapter {
  constructor(apiKey, className, email, password) {
    this.apiKey = apiKey;
    this.className = className;
    this.email = email;
    this.password = password;
    this.idField = "uid"
    axiosConfig.headers.application_api_key = this.apiKey;
  }

  login() {
    return axios
      .post("/application/users/login",
        {
          application_user: {
            email: this.email,
            password: this.password
          }
        },
        axiosConfig)
      .then(res => {
        authToken = res.data.application_user.authtoken;
        axiosConfig.headers.authtoken = authToken;
        return this.authToken;
      });
  }

  getAll() {
    return this.login().then(() => {
      return axios.get(`/classes/${this.className}/objects`, axiosConfig)
      .then(res => {return res.data.objects;});
    });
  }

  save(obj){
    let body = {
      "object": obj
    }
    return this.login().then(() => {
      return axios.post(`/classes/${this.className}/objects`, body, axiosConfig)
      .then(res => {return res.data.object;});
    });
  }

  update(obj){
    let obj_uid = obj["uid"]
    delete obj['uid']
    let body = {
      "object": obj
    }
    let url = `/classes/${this.className}/objects/${obj_uid}`
    return axios.put(url, body, axiosConfig)
    .then(res => {return res.data.object;})
    .catch(err => console.log("error occured: ", err))
  }

  updateWithQuery(query,delta){
    return this.find(query)
    .then(res => {
      if (res.length > 0){
        let uid = res[0]['uid']
        return this.update(Object.assign(query, delta, {uid: uid}))
      }
    })
  }

  find(query){
    let body = {
      "_method": "get",
      "query": query
    }
    let url = `/classes/${this.className}/objects/`
    return this.login().then(() => {
      return axios.post(url,body,axiosConfig)
      .then(res => {return res.data.objects})
    })

  }

  findOne(id){
    return this.find({uid: id}).then(res => {return res[0]})
  }

  upsert(query, delta){
    return this.login().then(() => {
      return this.find(query).then(res => {
        if(res.length == 0){
         return this.save(Object.assign(query,delta)) 
        }else if(res.length ==1){
          let uid = res[0]['uid']
          return this.update(Object.assign(query,delta,{uid: uid}))
        }else{
          return new Error("Multiple records found. Use upsertAll()")
        }
      });
    });
  }

  upsertAll(query, delta){
    return this.login().then(() => {
      return this.find(query).then(res => {
        if(res.length == 0){
          console.log("non existing record")
         return this.save(Object.assign(query,delta)).then(res => new Array(res))
        }else if(res.length == 1){
          console.log("single record")
          let uid = res[0]['uid']
          return this.update(Object.assign(query,delta,{uid: uid})).then(res => new Array(res))
        }else{
          console.log("multiple record")
          let result = []
          let counter = 1
          let dataLength = res.length
          return new Promise((resolve, reject) => {
            res.forEach(e => {
              let uid = e['uid']
              return this.update(Object.assign(query, delta, { uid: uid })).then(res => {
                result.push(res)
                console.log("IN then ", counter, dataLength)
                if (dataLength == counter) {
                  resolve(result);
                }
                counter++;
              })
            })
          });

        }
      })
    });
  }
}

module.exports = ApiAdapter;