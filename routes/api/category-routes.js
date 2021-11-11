const router = require("express").Router(); // tool to communicate with your database
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// the / is refering to the endpoint /api/categories
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
  .then((categoryData) => {
    res.json(categoryData); 
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});
  
  router.get("/:id", (req, res) => {
    // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [Product],
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    await Category.create(req.body); // another way to send info from frintend to backend
    res.status(200).json("Data successfully added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json("Data successfully added!");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    }
  })
  .then((categoryData) => {
    res.json(categoryData); 
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;



// try {
//   const categoryData = await Category.findAll({
//     include: {
//       model: Product
//     }
//     res.status(200).json(categoryData);
//   } catch (err) {
//     res.status(500).json(err); // use 500 to show that browser didn't throw error by default
//   }
// });
