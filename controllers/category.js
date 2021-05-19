const Category = require('../models/category');

exports.getCategoryById = (req, res) => {
    console.log(req.params);
    const id = req.params.categoryId;
    Category.findById(id).exec((err, cate) => {
        if (err || !cate) {
            return res.status(400).json({
                error: "Category not found in DB"
            });
        }
        req.category = cate;
        return res.json(req.category);
    })
}
exports.createCategory = (req, res) => {
    console.log(req.body);
    const category = new Category(req.body);
    category.save((err, cate) => {
        if (err) {
            return res.status(400).json({
                error: "Not able to save category in the DB "
            });
        }
        res.json({ cate });
    })
}

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, cat) => {
        if (err) {
            return res.status(400).json({ error: "Not able to find categpries" });
        }
        return res.json(cat);
    })
}


exports.updateCategory = (req, res) => {
    const id = req.params.categoryId;
    console.log(req.body)

    Category.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true, useFindAndModify: false }).exec((err, cat) => {
        if (err) {
            return res.status(400).json({ error: "Not able to find categpries" });
        }
        return res.json(cat);
    })
}
exports.deleteCategory = (req, res) => {
    const id = req.params.categoryId;
    Category.findByIdAndDelete({ _id: id }).exec((err, cat) => {
        if (err) {
            return res.status(400).json({ error: "Not able to delete categories" });
        }
        return res.json(cat);
    })
}