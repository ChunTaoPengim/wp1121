import cardModel from "../models/cardModel.js";
// import { ObjectId } from 'mongoose'

// Get all todos
export const getCard = async (req, res) => {
  try {
    // Find all todos
    const cards = await cardModel.find({});

    // Return todos
    return res.status(200).json(cards);
  } catch (error) {
    // If there is an error, return 500 and the error message
    // You can read more about HTTP status codes here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Or this meme:
    // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
    return res.status(500).json({ message: error.message });
  }
};
// Create a todo
export const createCard = async (req, res) => {
  const { title, description, rows } = req.body;
  
  console.log(req.body);
  // Check title and description
  if (!title || !description ) {
    return res
      .status(400)
      .json({ message: "date, mood, tag, description are required!" });
  }

  // Create a new todo
  try {
    const newCard = await cardModel.create({
        title, 
        description, 
        rows, 
    });
    return res.status(201).json(newCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateCard = async (req, res) => {
  const { id } = req.params;
  const { title, description, rows } = req.body;

  try {
    // Check if the id is valid
    const existedCard = await cardModel.findById(id);
    if (!existedCard) {
      return res.status(404).json({ message: "Diary not found!" });
    }

    // Update the todo
    if( title !== undefined) existedCard.title = title;
    if (description !== undefined) existedCard.description = description;
    if (rows !== undefined) existedCard.rows = rows;
    
    // Save the updated todo
    await existedCard.save();

    // Rename _id to id
    existedCard.id = existedCard._id;
    

    return res.status(200).json(existedCard);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a todo
export const deleteCard = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedCard = await cardModel.findById(id);
    if (!existedCard) {
      return res.status(404).json({ message: "card not found!" });
    }
    // Delete the todo
    await cardModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "card deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCardByID = async (req, res) =>{
  const { id } = req.params;

    try {
      // Find all todos
      const card = await cardModel.findById(id);
      if (!card) {
        // If the card is not found, return a 404 status code
        return res.status(404).json({ message: 'Card not found' });
      }
      // Return todos
      return res.status(200).json(card);
    } catch (error) {
      // If there is an error, return 500 and the error message
      // You can read more about HTTP status codes here:
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      // Or this meme:
      // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
      return res.status(500).json({ message: error.message });
    }
}