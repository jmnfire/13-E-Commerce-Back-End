const router = require('express').Router();
const {
  Category,
  Product,
  Tag
} = require('../../models');

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    // res.status(200).json(categoryData);
    res.json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product]
    }).then(category => res.status(200).json(category))
    .catch(err => res.status(400).json(err))
})

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then(category => res.status(200).json(category))
    .catch(err => res.status(400).json(err))
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    },
  })
    .then(category => res.status(200).json(category))
    .catch(err => res.status(400).json(err))
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({
        message: 'No category found with this id!'
      });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;