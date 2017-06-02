const express = require('express');
const router = express.Router();

// запросы к API
router.get('/', (req, res) => {
  res.send('api works');
});



module.exports = router;
