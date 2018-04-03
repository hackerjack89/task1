
class ArrayAdapter{
    constructor(){
        this.collection=[];
    }

    getAll(){
        return this.collection;
    }


    save(obj){
        this.collection.push(obj)
    }


    update(obj,old_obj) {
        var keys = Object.keys(old_obj);
        if(this.collection.some(function(o){return o[keys[0]] === old_obj[keys[0]];})){
            var index = this.collection.findIndex(x => x[keys[0]] === old_obj[keys[0]])
            this.collection[index] = obj;
        }
       
        return obj;
    }

    delete(index){
        console.log("delete")
    }

    findOne(index){
        if(this.collection[index] != undefined){
            return this.collection[index];
        }else{
            return null;
        }
    }
}


module.exports = ArrayAdapter;