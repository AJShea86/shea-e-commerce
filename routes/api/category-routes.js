const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({ include: Product })
    .then((allCategories) => res.json(allCategories))
    .catch((err) => res.status(400).json(err));
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({ include: Product, where: { id: req.params.id } })
    .then((category) => {
      // console.log(category);
      if (!category) {
        res.status(404).end();
      } else {
        res.json(category);
      }
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    // console.log(newCategory);
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    // console.log(req.params);
    const updatedCategory = await Category.findOne({ where: req.params });

    await updatedCategory.update({ category_name: req.body.category_name });
    return res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    // console.log(req.params);
    const deletedCategory = await Category.findOne({ where: req.params });

    await deletedCategory.destroy();
    return res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
