// backend/routes/api/index.js
const router = require('express').Router();

// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

router.get('/tests', (req, res) => {
    res.json('hello world');
})


module.exports = router;
