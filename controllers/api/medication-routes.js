const router = require('express').Router();
const { Meds } = require('../../models');

router.post('/add', async (req, res) => {
    try {
      console.log(req.session.user_id)
      console.log(req.body['user_id'])
        req.body['user_id'] = req.session.user_id
        console.log(req.body)
        let medData = await Meds.create(req.body)
        res.status(200).json(medData)
      } catch (err) {
        res.status(400).json(err);
      }
})

router.post('/delete', async (req, res) => {
  Meds.destroy({
    where: {
      med_id: req.body['med_id']
    }
  })
})

router.get('/', async (req, res) => {
  res.end('this is the medication api page. post here to add a medication.')
})

module.exports = router