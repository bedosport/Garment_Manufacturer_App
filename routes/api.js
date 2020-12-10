var express = require('express');
var router = express.Router();

var garmentManufactureController = require('../controllers/garmentManufactureController');


router.get('/batchs', garmentManufactureController.getAllBatches);

router.get('/batchs/:batchId', garmentManufactureController.getAllBatchesById);

router.post('/batchs/add',garmentManufactureController.addNewBatchOptimized);

router.put('/batchs/update/:batchId', garmentManufactureController.updateBatchById);

router.delete('/batchs/delete/:batchId',garmentManufactureController.deleteBatchById);

module.exports = router;