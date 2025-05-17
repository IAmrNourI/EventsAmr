const Event = require("../models/Event");
const deleteImage = require("../utils/deleteImage");
const Booking = require("../models/Booking");
exports.getCards = async (req, res) => {
  try {
    const events = await Event.find().select('-__v -createdAt -updatedAt');

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const eventsWithUrl = events.map((card) => {
      const obj = card.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${card.image}`;
      return obj;
    });

    res.status(200).json({
      message: "Cards fetched successfully",
      data: eventsWithUrl,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.limitedEvents = async (req, res) => {
  try {
    const events = await Event.find({ type : "portfolio" }).sort({ createdAt: 1 }).limit(6).select('-__v -createdAt -updatedAt');

    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const eventsWithUrl = events.map((card) => {
      const obj = card.toObject();
      obj.imageUrl = `${baseUrl}/uploads/${card.image}`;
      return obj;
    });

    res.status(200).json({
      message: "Cards fetched successfully",
      data: eventsWithUrl,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.addEvent = async (req, res) => {
  try {
    const { title, description, image, titleAr, descriptionAr, date, category, price, venue } = req.body;
    const newCard = new Card({ title, description, image, titleAr, descriptionAr, date, category, price, venue });
    await newCard.save();
    res.status(201).json({
      message: "Card added successfully",
      data: newCard,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      titleAr,
      descriptionAr,
      date,
      category,
      price,
      venue,
    } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Card not found", error: true });
    }

    if (image && event.image && event.image !== image) {
      await deleteImage(event.image); 
    }

    Object.assign(event, {
      title,
      description,
      image,
      titleAr,
      descriptionAr,
      date,
      category,
      price,
      venue,
    });

    await card.save();

    res.status(200).json({
      message: "Card updated successfully",
      data: card,
      error: false,
    });

  } catch (error) {
    console.error("Update card error:", error);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Event.findById(id);
    if (!card) {
      return res.status(404).json({ message: "Card not found", error: true });
    }

    await Card.findByIdAndDelete(id);
    deleteImage(card.image);

    res.status(200).json({
      message: "Card deleted successfully",
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.book = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const booking = await Booking.findOne({ userId, cardId: id });
    const newDetails = new Booking({ userId, cardId: id });
    await newDetails.save();
    const card = await Event.findById(id);
    card.counter += 1;
    await card.save();
    res.status(201).json({
      message: "Details added successfully",
      data: newDetails,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
};

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    return res
      .status(200)
      .json({
        message: "File Successfully Uploaded",
        image: req.file.filename,
      }); 
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const details = await Booking.find({ userId }).select('-__v -createdAt -updatedAt');
    res.status(200).json({
      message: "Details fetched successfully",
      data: details,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
}

exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Event.findById(id).select('-__v -createdAt -updatedAt');
    res.status(200).json({
      message: "Card fetched successfully",
      data: card,
      error: false,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, error: true });
  }
}