const router = require("express").Router()
const logs = require('../utils/logs_crud.util')

router.use(require('../middlewares/check_password.middleware'))

router.get('/', async (req, res) => {
  return res.json(await logs.read())
})

router.post('/', async (req, res) => {
  if (!req.body.message) return res.sendStatus(400)
  await logs.create(req.body.message)
  return res.sendStatus(200)
})

module.exports = router

