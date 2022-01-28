const router = require('express').Router();
const crudController = require('../controller/crudController')

router.post('/add', crudController.add_task)
router.get('/add', crudController.add_task_get)
router.get('/', crudController.get_all_tasks)
router.get('/delete', crudController.delete)

router.param("taskId",crudController.getTaskById);
router.post("/update/:taskId",crudController.updateTask)
router.get("/update/:taskId",crudController.get_updateTask)
router.get("/error",crudController.get_error)

module.exports = router