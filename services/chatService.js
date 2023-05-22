const Chat = require('../models/chat');


// Get all chat messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ date: 'desc' });
    // res.json(messages);
    res.render("chat",{Chats:messages})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error get message' });
  }
};

// Get chat of user
exports.getByUsername = async (req, res) => {
  try {
    const Username=req.params.Username;
    const messages = await Chat.find({ Username: Username });
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error get message of '+Username });
  }
};

exports.getchatbetweentwodates = async (req, res) => {
  try {
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);

    const chats = await Chat.find({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    res.status(200).send(chats);
  } catch (error) {
    console.error(error);
    res.status(500).send("Couldn't get chats");
  }
};

// Create a new chat message
exports.createMessage = async (req, res) => {
  try {
    const Username=req.body.Username;
    const message=req.body.message;
    const newMessage = new Chat({ Username, message });
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error Create message' });
  }
};


// Update a chat message
exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const updatedMessage = await Chat.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    res.json(updatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error update message' });
  }
};

// Delete a chat message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error delete message' });
  }
};
