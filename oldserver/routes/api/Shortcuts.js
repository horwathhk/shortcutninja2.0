const express = require("express");
const router = express.Router();

//Item Model

const Shortcut = require("../../models/Shortcuts");

//@route Get api/items
//Desc get all items

router.get("/", (req, res) => {
  Shortcut.find().then(shortcuts => res.json(shortcuts));
});

//@route Post api/items
//@Des create a shortcut

router.post("/", (req, res) => {
  const newShortcut = new Shortcut({
    keyName: req.body.keyName,
    keyCode: req.body.keyCode
  });

  newShortcut.save().then(shortcut => res.json(shortcut));
});

//@route Delete api/items
//@Des Delete a shortcut

router.delete("/:id", (req, res) => {
  Shortcut.findById(req.params.id)
    .then(shortcut => shortcut.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
