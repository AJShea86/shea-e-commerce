const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({

      include:[{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }]
    })
    res.status(200).json(allTags)
  } catch (error) {
    console.log(error);

  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

try {
  const singleTag = await Tag.findOne({
    where: {id: req.params.id},
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"]      
    }

  })
  res.status(200).json(singleTag)
} catch (error) {
  
}


});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
