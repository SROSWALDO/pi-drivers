const { Router } = require("express");
const getDriversHandler = require("../handlers/getDriversHandler");
const getIDDriversHandler = require("../handlers/IDDriversHandler");
const getNameDriverHandler = require("../handlers/NameDriverHandler");
const getTeamsHandler = require("../handlers/getTeamsHandler");
const { createDriverHandler } = require("../handlers/createDriverHandler");

const router = Router();

router.get("/drivers", getDriversHandler);
router.get("/drivers/name", getNameDriverHandler);
router.get("/drivers/:id", getIDDriversHandler);
router.get("/teams", getTeamsHandler);
router.post("/drivers", createDriverHandler)

module.exports = router;
