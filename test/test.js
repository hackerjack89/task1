var chai = require('chai')
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised')
var ArrayAdapter = require('../adapters/array-adapter')
chai.use(chaiAsPromised);

describe('arrayAdapter', function() {

  describe('#save', function() {
    it('should save and return object, if object is passed in the parameter.', function(){
      let arrayAdapter = new ArrayAdapter();
      let person = {name: "jack", age: 30}
      return expect(arrayAdapter.save(person)).to.eventually.be.an('object').equal(person)
    });

    it('should throw an error if object is not passed in parameter.', function() {
      let arrayAdapter = new ArrayAdapter();
      return expect(arrayAdapter.save('foo')).to.be.rejectedWith('Parameter should be an Object')
    });
  });

  describe('#getAll', function(){
    it('should return all objects if collection is not empty', function(){
      let arrayAdapter = new ArrayAdapter();
      let sampleData = [{name: "jack", age: 10}, {name: "mack"}]
      let promises = []

      sampleData.forEach(p => {
        promises.push(arrayAdapter.save(p))
      })

      return Promise.all(promises)
      .then(res => {
        return expect(arrayAdapter.getAll()).to.eventually.be.an('array').deep.equal(sampleData)
      });
    });

    it('should return empty array if nothing is saved.', function() {
     let arrayAdapter = new ArrayAdapter();
     return expect(arrayAdapter.getAll()).to.eventually.be.an('array').and.empty
    })
  });

  describe('#find', function() {
    it('should return an array of objects matching given query.', function(){
    })

    it('should return an empty array if nothing is found.', function(){
    })
  });

  describe("#findOne", function(){
    it('should find a single object if id is provided in parameter.', function(){
    })
    it('should return')
  })

  describe('#update', function() {
    it('should update the record and return updated object', function(){
    })

    it('should return error if object is not passed in parameter.', function(){
    })
  });

  describe('#updateWithQuery',function(){
    it('should update record if found and return updated object', function(){
    });
    it('should return record not found error if no record is found', function(){
    })
  })

});
