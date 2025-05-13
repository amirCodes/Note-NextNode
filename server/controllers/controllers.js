// server/controllers/noteController.js
const Note = require('../models/Note');

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a note
exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      description: req.body.description,
    });
    const newNote = await note.save();
    // console.log('data has been send to db')
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    console.log(req.params.id)
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await Note.findByIdAndDelete(id);
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};

// Toggle archive status
exports.toggleArchive = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note ID' });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.archived = !note.archived;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error('Toggle archive error:', error);
    res.status(500).json({ message: 'Error toggling archive status', error: error.message });
  }
};