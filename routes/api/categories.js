const express = require("express");
const router = express.Router();
const Category = require("../../models/Category");
const validateCategoryInput = require("../../validation/categories");
const passport = require("passport");

//fetch all categories based on user id
router.get("/user/:user_id", (req, res) => {
    Category.find({user: req.params.user_id })
    .then(categories => res.json(categories))
    .catch(errors => res.status(400).json({ errors }));
});

router.get("/:id", (req, res) => {
    Category.findById(req.params.id)
    .then(category => res.json(category))
    .catch(errors => res.status(404).json({ errors }));
});

//passport.authenticate("jwt", { session: false }) <-- add this later
router.post("/", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const category = new Category({ 
        title: req.body.title,
        taskName: req.body.taskName,
        user: req.user.id
    });

    category.save()
    .then(category => res.json(category))
    .catch(errors => res.status(400).json({ errors }));
});

//updates title of category
router.patch("/:id", (req, res) => {
    const { errors, isValid } = validateCategoryInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Category.findById(req.params.id)
    .then(category => {
        category.title = req.body.title;
        category.actual = req.body.actual;
        category.expected = req.body.expected;
        category.progress = req.body.progress;
        category.timeLimit = req.body.timeLimit;
        category.save()
        .then(category => res.json(category));
    })
    .catch(errors => res.status(400).json({ errors }));
});

router.delete("/:id", (req, res) => {
    Category.deleteOne({ _id: req.params.id })
    .then(category => res.json(category))
    .catch(errors => res.status(404).json({ errors }));
});

module.exports = router;