const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
// Declare get request
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No categories found" });
      return;
    }
    res.json(categoryData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Declare get request for id
router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No categories found" });
      return;
    }
    res.json(categoryData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Declare post request
router.post("/", async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//Declare put request for id
router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ error: "No category found with this id" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Declare delete command
router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    });
    if (!deletedCategory) {
      return res.status(404).json({ error: "No category found with this id" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;
