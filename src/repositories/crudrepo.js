class crudrepo{
    constructor(model)
    {
        this.model=model;
    }
    async create(data){
     try{
        const response=await this.model.create(data)
        return response;
     }catch(error){
        console.error("Something went wrong in the crud repo");
        throw error;
     }
    }
}
module.exports=crudrepo