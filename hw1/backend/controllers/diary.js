import DiaryModel from "../models/diaryModel.js";

// Get all todos
export const getDiaries = async (req, res) => {
  try {
    // Find all todos
    const diaries = await DiaryModel.find({});

    // Return todos
    return res.status(200).json(diaries);
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
export const createDiary = async (req, res) => {
  const { date, mood, tag, description } = req.body;
  

  // Check title and description
  if (!date || !description || !mood || !tag) {
    return res
      .status(400)
      .json({ message: "date, mood, tag, description are required!" });
  }

  // Create a new todo
  try {
    const newDiary = await DiaryModel.create({
        date, 
        mood, 
        tag, 
        description,
    });
    return res.status(201).json(newDiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateDiary = async (req, res) => {
  const { id } = req.params;
  
  const { date, mood, tag, description } = req.body;

  try {
    // Check if the id is valid
    const existedDiary = await DiaryModel.findById(id);
    if (!existedDiary) {
      return res.status(404).json({ message: "Diary not found!" });
    }

    // Update the todo
    if( date !== undefined) existedDiary.date = date;
    if (mood !== undefined) existedDiary.mood = mood;
    if (tag !== undefined) existedDiary.tag = tag;
    if (description !== undefined) existedDiary.description = description;

    // Save the updated todo
    await existedDiary.save();

    // Rename _id to id
    existedDiary.id = existedDiary._id;
    delete existedDiary._id;

    return res.status(200).json(existedDiary);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a todo
export const deleteDiary = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedDiary = await DiaryModel.findById(id);
    if (!existedDiary) {
      return res.status(404).json({ message: "Diary not found!" });
    }
    // Delete the todo
    await DiaryModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Diary deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};