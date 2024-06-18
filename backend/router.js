const express = require('express');
const router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post("/member", [validator.checkMemberAge, validator.checkFieldsNotNull, validator.checkUnique], controller.createMember);
router.get("/member", controller.getAllMembers);
router.get("/member/:id", controller.getMemberById);
router.get("/upcomingBirthdays", controller.getAllUpcomingBirthdays);
router.patch("/member/:id", controller.updateMember);
router.delete("/member/:id", controller.deleteMember);

module.exports = router;