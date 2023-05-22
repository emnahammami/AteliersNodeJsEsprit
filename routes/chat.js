const express = require('express')
const router = express.Router();
const chat = require("../services/chatService.js");


router.get("/",(req, res, next) => {
    res.render("chat")
});

router.get("/all", chat.getAllMessages);

router.get("/chat/:Username", chat.getByUsername);

router.get("/getchatbetweentwodates", chat.getchatbetweentwodates);

router.post("/create", chat.createMessage);

router.put("/update/:id", chat.updateMessage);

router.delete("/delete/:id", chat.deleteMessage);

module.exports = router;