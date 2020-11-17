const express = require('express')
const Joi = require('@hapi/joi')

const router = express.Router()

const itemSchema = Joi.object().keys({
  email: Joi.string(),
  extraData: Joi.string()
})
router.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/')
})
router.post('/item', (req, res) => {
  const item = req.body
  console.log("got body")
  console.log(req.body)
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  const collection = db.collection('items')
  collection.find({email : req.body.email}).toArray().then((items) => {
    if (items.length == 0){
      collection.insertOne(item).then(() => {
        res.send("Success")
        res.status(200).end()
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
        res.status(500).end()
      })
    } else {
      res.send("Email already exist")
      res.status(500).end()
    }
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



router.get('/getParticularItem', (req, res) => {
 const collection = db.collection('items')
  console.log(req.query.email)
 collection.find({email : req.query.email}).toArray().then((items) => {
   if (items.length > 0){
      res.send(items[0]) 
   } else {
       res.send("user not found")
   }
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
