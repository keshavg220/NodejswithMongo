const express = require('express')
const Joi = require('@hapi/joi')

const router = express.Router()

const itemSchema = Joi.object().keys({
  name: Joi.string(),
  quantity: Joi.number().integer().min(0)
})
router.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html')
})
router.post('/item', (req, res) => {
  const item = req.body
  console.log(req.body)
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  const collection = db.collection('items')
  collection.insertOne(item).then(() => {
    res.send("Success")
    res.status(200).end()
  })
  .catch((err) => {
    console.log(err)
    res.send(err)
    res.status(500).end()
  })
})

router.get('/items', (req, res) => {
 const collection = db.collection('items')
 collection.find({}).toArray().then((items) => {
  res.send(items)
})
 .catch((err) => {
  console.log(err)
  res.send(err)
  res.status(500).end()
})
})

router.put('/item/:name/quantity/:quantity', (req, res) => {
  const { name, quantity } = req.params
  const collection = db.collection('items')
  var myquery = { name: name }
  var newValue = {$set: {quantity: quantity}}
  collection.updateOne(myquery, newValue).then(() => {
    res.send("updated")
    res.status(200).end()
  })
  .catch((err) => {
    console.log(err)
    res.send(err)
    res.status(500).end()
  })
})

module.exports = router
