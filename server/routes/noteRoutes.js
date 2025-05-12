// server/routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  toggleArchive
} = require('../controllers/controllers');

router.route('/').get(getNotes).post(createNote);
router.route('/:id')
  .put(updateNote)
  .delete(deleteNote);
router.route('/:id/toggle-archive').patch(toggleArchive);

module.exports = router;
