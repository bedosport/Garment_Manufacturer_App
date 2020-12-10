var Batch = require('../models/batch')


exports.getAllBatches = function(req, res, next) {
    Batch.find({},(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.send(result);
        }
    });
};

exports.getAllBatchesById = function(req, res, next) {
    Batch.findById(req.params.batchId,(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.json(result);
        }
    });
};

exports.getAllBatchesByColorAndSize = function(req, res, next) {
    Batch.find({projection: { color: newBatch.color, size: newBatch.size }},(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.send(result);
        }
    });
};

exports.addNewBatchOptimized = (req,res,next)=>{
    let newBatch = new Batch({
        _id: req.body._id,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity
    });

    if(!newBatch){
        console.log("error");
        res.send("error");

    }
    else{

        Batch.find({ color: newBatch.color, size: newBatch.size },(error,result)=>{
            if(error){
                console.log(error);
                res.send(error);
            }
            else{
                if(result.length > 0){
                    var batch = new Batch({
                        color: result[0].color,
                        size: result[0].size,
                        quantity: (result[0].quantity + newBatch.quantity)
                    });
                    
                    Batch.findOneAndUpdate(result[0]._id,batch,(error,result)=>{
                        if(error){
                            res.send(error);
                        }
                        else{
                            console.log("Updated");
                            res.json(result);
                        }
                    });
                    
                }
                else{
                    newBatch.save(function(err, task) {
                        if (err){
                            res.send(err);
                        }
                        else{
                            res.send("Added");
                            console.log("Added");
                            console.log(task);
                        }
                      });
                }
            }
        });
        
    }
};

exports.addNewBatch = (req,res,next)=>{
    let newBatch = new Batch({
        _id: req.body._id,
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity
    });

    if(!newBatch){
        console.log("error");
        res.send("error");

    }
    else{
        newBatch.save(function(err, task) {
            if (err){
                res.send(err);
                console.log(err);
            }
            else{
                res.send("Added");
                console.log("Added");
                console.log(task);
            }
          });
        
    }
};
exports.updateBatchById = function(req, res, next) {
    let batch = new Batch({
        color:req.body.color,
        size: req.body.size,
        quantity: req.body.quantity
    });
    
    Batch.findOneAndUpdate(req.params.batchId,batch,(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.json(result);
        }
    });

};

exports.deleteBatchById = (req, res) =>{

    Batch.remove({
      _id: req.params.batchId
    }, (err, task)=> {
      if (err)
        res.send(err);
      res.json({ message: 'Batch successfully deleted' });
    });
};

