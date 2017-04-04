var express = require('express');
var routes = function (Teacher) {
    var teacherRouter = express.Router();
    teacherRouter.route('/')
        .post(function (req, res) {

            var teacher = new Teacher(req.body);

            teacher.save();
            res.status(201).send(teacher);


        })
        .get(function (req, res) {
            var query = {};
            if (req.query.genre) {
                //fix 
                query.genre = req.query.genre;
            }
            Teacher.find(query, function (err, teachers) {
                if (err)
                    res.status(500).send(err);

                else
                    res.json(teachers);


            });
        });

    teacherRouter.use('/:teacherId', function (req, res, next) {
        Teacher.findById(req.params.studentId, function (err, teacher) {
            if (err)
                res.status(500).send(err);

            else if (teacher) {

                req.teacher = teacher;
                next();
            }
            else {

                res.status(404).send('no teacher found');
            }


        });

    });
    teacherRouter.route('/:teacherId')
        .get(function (req, res) {

            res.json(req.teacher);

        })
        .put(function (req, res) {
            req.teacher.firstName = req.body.firstName;
            req.teacher.lastName = req.body.lastName;

            req.teacher.save();
            res.json(req.teacher);
        });


    return teacherRouter;
};

module.exports = routes;