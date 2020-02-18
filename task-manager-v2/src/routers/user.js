const express = require('express')
const User = require('../models/user')
const router = new express.Router()


// dummy route for testing
// router.get('/test', (req, res) => {
//     res.send('From new file')
// }) 
// module.exports = router


// Normal 
// 
// app.post('/users', (req, res) => {
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

// Async Await
// 
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})






// read all value in database
// app.get('/users', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })

// })


router.get('/users', async (req, res) => {
    try{
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})




// read particular value in database
// app.get('/users/:id', (req, res) => {
//     const _id = req.params.id
//     console.log(req.params)
//     User.findById(_id).then((user) => {
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }).catch(() => {
//         res.status(500).send()
//     })
// })

router.get('/users/:id', async(req, res) => {
    const _id = req.params.id
    console.log(req.params)

    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})


// update indiviual by its id.
router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age', 'email']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperation) {
        return res.status(400).send( { error: "Invalid Updates"}) 
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if(!user) {
           return res.status(404).send() 
        }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)

    }

})


// delete
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// important
module.exports = router