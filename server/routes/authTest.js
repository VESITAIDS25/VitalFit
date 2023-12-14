const express = require("express");
const authorize = require("../middleware/authorize");
const { ROLES_LIST, ROLE_GROUPS } = require("../constants");
const auhtenticate = require("../middleware/authenticate");
const router = express.Router();
router.get("/", auhtenticate, (req, res) => {
  res.json({
    msg: "You are authenticated",
    sessionUser: req.session.user,
  });
});

router.get("/user", authorize(ROLE_GROUPS.Group1), (req, res) => {
  res.json({
    msg: "You are authorized",
  });
});

router.get("/nutrionist", authorize(ROLE_GROUPS.Group2), (req, res) => {
  res.json({
    msg: "You are authorized",
  });
});

// router.get(
//   "/role3",
//   authorize([ROLES_LIST.Role1, ROLES_LIST.Role2, ROLES_LIST.Role3]),
//   (req, res) => {
//     console.log(req.session.user.roles);
//     res.json({
//       msg: "You are authorized",
//     });
//   }
// );
module.exports = router;
