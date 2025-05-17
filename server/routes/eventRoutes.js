const express = require("express");
const router = express.Router();
const cardController = require("../controllers/eventController");
const { isAuth } = require("../middlewares/auth/isAuth");
const upload = require("../middlewares/multerMiddleware");

const isRole = require("../middlewares/auth/isRole");

const {
  eventValidationRules,
  updateEventValidationRule,
} = require("../middlewares/validation/eventValidation");

const {
  validationResults,
} = require("../middlewares/validation/validationResult");

router.get("/", cardController.getCards);
router.get("/limited-events", cardController.limitedEvents);

router.post(
  "/",
  isAuth,
  isRole("admin"),
  eventValidationRules,
  validationResults,
  cardController.addEvent
);

router.put(
  "/:id",
  isAuth,
  isRole("admin"),
  updateEventValidationRule,
  validationResults,
  cardController.updateEvent
);

router.post(
  "/upload",
  upload.single("image"),
  isRole("admin"),
  cardController.uploadFile
);

router.post("/book/:id", isAuth, cardController.book);

router.delete("/:id", isAuth, isRole("admin"), cardController.deleteEvent);

router.get("/my-events", isAuth, cardController.getMyEvents);

router.get("/:id", cardController.getEventById);

module.exports = router;
