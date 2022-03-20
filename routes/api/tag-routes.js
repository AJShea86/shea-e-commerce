const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });
    res.status(200).json(allTags);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  try {
    const singleTag = await Tag.findOne({
      where: { id: req.params.id },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    res.status(200).json(singleTag);
  } catch (error) {}
});

router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    console.log(newTag);
    res.status(200).json(newTag);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value

  try {
    console.log(req.params);
    const updatedTag = await Tag.findOne({ where: req.params });

    await updatedTag.update({ tag_name: req.body.tag_name });
    return res.status(200).json(updatedTag);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    console.log(req.params);
    const deletedTag = await Tag.findOne({ where: req.params });

    await deletedTag.destroy();
    return res.status(200).json(deletedTag);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
