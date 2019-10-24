const { createRouter } = require("noswbi");
// const { isOwner } = require("../utils/middlewares");
const { catchErrors } = require("../utils/handlers");
const {
  getSessions,
  getSessionById,
  addSession,
  updateSession,
  removeSession
} = require("../controllers/session.controllers");

const router = createRouter({ requireAuth: true });

router.get("/session", catchErrors(getSessions));
router.get("/session/:id", catchErrors(getSessionById));
router.post("/session", catchErrors(addSession));
// router.put("/session/:id", catchErrors(isOwner), catchErrors(updateSession));
router.put("/session/:id", catchErrors(updateSession));
// router.delete("/session/:id", catchErrors(isOwner), catchErrors(removeSession));
router.delete("/session/:id", catchErrors(removeSession));

module.exports = router;
