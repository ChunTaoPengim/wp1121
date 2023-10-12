import { createCard, getCard, updateCard, deleteCard , getCardByID} from "../controllers/card.js";
import express from "express";

// Create an express router
const router = express.Router();

// Every path we define here will get /api/todos prefix
// To make code even more cleaner we can wrap functions in `./controllers` folder

// GET /api/todos
router.get("/", getCard);
router.get("/:id", getCardByID);
router.post("/", createCard);
// PUT /api/todos/:id
router.put("/:id", updateCard);
// DELETE /api/todos/:id
router.delete("/:id", deleteCard);

// export the router
export default router;