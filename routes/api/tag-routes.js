const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

//Declare a get function
router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: {
        model: Tag,
        through: ProductTag,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found" });
      return;
    }
    res.json(tagData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Declare a function for id
router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: Product,
        through: ProductTag,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag found" });
      return;
    }
    res.json(tagData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Declare a function for post
router.post("/", async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//Declare put request for id
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ error: "No tag found with this id" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Declare a function to delete a tag
router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedTag) {
      return res.status(404).json({ error: "No tag found with this id" });
    }
    res.status(200).json(deletedTag);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete a tag" });
  }
});

module.exports = router;
