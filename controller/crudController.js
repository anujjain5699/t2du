const Task = require("../models/Task");

module.exports.add_task = async (req, res) => {

    const title = req.body.title;
    const desc = req.body.desc;
    const date = req.body.date;

    try {
        const task = await Task.create({
            title,
            desc,
            date
        })
        res.status(201).redirect("/")
    } catch (err) {
        console.log(err);
        return res.status(500).render("error", {
            code: 500,
            message: "something went wrong while adding"
        });
    }
}

module.exports.add_task_get = (req, res) => {
    try {
        return res.status(200).render("add_user");
    } catch (err) {
        console.log(err);
        return res.status(500).render("error", {
            code: 500,
            message: "something went wrong while fetching"
        });
    }
}

module.exports.get_all_tasks = async (req, res) => {
    try {
        const taskList = await Task.find();
        res.status(200).render('home', {
            heading: "Home",
            task: taskList
        });
    } catch (err) {
        console.log(err);
        return res.status(500).render("error", {
            code: 500,
            message: "something went wrong"
        });
    }
}

module.exports.delete = async (req, res) => {
    try {
        //get if from query
        let id = req.query;
        let count = Object.keys(id).length;
        for (let i = 0; i < count; i++) {

            // finding and deleting tasks from the DB one by one using id
            Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
                if (err) {
                    console.log('error in deleting task');
                    return res.status(400).render("error", {
                        code: 400,
                        message: "something went wrong"
                    });
                }
            })
        }
        return res.redirect('back');
    } catch (err) {
        console.log(err);
        return res.status(400).render("error", {
            code: 400,
            message: "something went wrong"
        });
    }
}

module.exports.getTaskById = (req, res, next, taskId) => {
    try {
        Task.findById(taskId).exec((err, task) => {
            if (err || !task) {
                const error = {
                    code: 404,
                    message: "404 task not found"
                }
                return res.status(404).render("error", error)
            }
            req.task = task;
            next();
        })
    } catch (err) {
        console.log(err);
        const error = {
            code: 404,
            message: "404 task not found"
        }
        return res.status(404).render("error", error)
    }
}

module.exports.updateTask = (req, res) => {
    const task = req.task;
    task.desc = req.body.desc;
    task.title = req.body.title;
    task.date = req.body.date;
    task.save((err, task) => {
        if (err || !task) {
            return res.status(400).render("error", {
                code: 400,
                message: "something went wrong while updating"
            });
        }
        return res.redirect("/");
    });
}

module.exports.get_updateTask = (req, res) => {
    const taskId = req.params.taskId;
    try {
        Task.findById(taskId).exec((err, task) => {
            if (err || !task) {
                return res.status(404).render("error", {
                    code: 404,
                    error: "404 task not found"
                })
            }
            return res.status(200).render("update_task", {
                task: task
            })
        })
    } catch (err) {
        console.log(err);
        return res.status(500).redirect("error", {
            code: 500,
            error: "500 task not found"
        })
    }
}

module.exports.get_error = (req, res, error) => {
    return res.render("error", {
        code: error.code,
        message: error.message,
    })
}