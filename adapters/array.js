
class ArrayAdapter{
    constructor(){
        this.collection=[];
    }

    getAll(){
        return this.collection;
    }


    save(obj){
        obj["_id"] = this.collection.length;
        this.collection.push(obj)
        return obj["_id"];
    }

    updateWithQuery(query, changeset){
        var keys = Object.keys(query);
        var index = this.collection.findIndex(x => x[keys[0]] == query[keys[0]]);
        if(index > -1){ //Element exists
            changeset["_id"]=index;
            this.collection[index]=changeset;
            return this.collection[index];
        }else{
            return null
        }
    }

    find(query){
        var keys = Object.keys(query);
        return this.collection.filter(x => x[keys[0]] == query[keys[0]])
    }

    update(obj) {
        this.collection[obj._id] = obj
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