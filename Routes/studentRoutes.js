var express = require('express');
var routes = function (Student) {
    var studentRouter = express.Router();
    studentRouter.route('/')
        .post(function (req, res) {

            var student = new Student(req.body);

            student.save();
            res.status(201).send(student);


        })
        .get(function (req, res) {
            var query = {};
            if (req.query.genre) {
                //fix 
                query.genre = req.query.genre;
            }
            Student.find(query, function (err, students) {
                if (err)
                    res.status(500).send(err);

                else
                    res.json(students);


            });
        });

    studentRouter.use('/:studentId', function (req, res, next) {
        Student.findById(req.params.studentId, function (err, student) {
            if (err)
                res.status(500).send(err);

            else if (student) {

                req.student = student;
                next();
            }
            else {

                res.status(404).send('no student found');
            }


        });

    });
    studentRouter.route('/:studentId')
        .get(function (req, res) {

            res.json(req.student);

        })
        .put(function (req, res) {
            req.student.imageUrl = req.body.imageUrl;
            req.student.firstName = req.body.firstName;
            req.student.lastName = req.body.lastName;
            req.student.email = req.body.email;
            req.student.classes.push(req.body.classes);

            req.student.save();
            res.json(req.student);
        })
        .delete(function (req, res) {

            req.student.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else
                    res.status(204).send('Removed');
            });

        })


    return studentRouter;
};

module.exports = routes;