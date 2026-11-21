const router = require('express').Router();
const Message = require('../models/Message');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, async (req, res) => {
  const uzenetek = await Message.find().sort({ createdAt: -1 }).lean();
  res.render('uzenetek', { uzenetek });
});

module.exports = router;
