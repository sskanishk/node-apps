const express = require('express')
const Task = require('../models/task')
const router = new express.Router()



// app.post('/tasks', (req, res) => {
//     const task = new Task(req.body)

//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})




// read all value in database
// app.get('/tasks', (req, res) => {
//     Task.find({}).then((tasks) => {
//         res.send(tasks)
//     }).catch((e) => {
//         res.status(500).send(e)
//     })
// })

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})



// read particular value in database
// app.get('/tasks/:id', (req, res) => {
//     const _id = req.params.id
//     console.log(req.params)
//     Task.findById(_id).then((task) => {
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }).catch(() => {
//         res.status(500).send()
//     })
// })

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    console.log(req.params)

    try {
        const task = await Task.findById(_id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


// update indiviual by its id.
router.patch('/tasks/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation) {
        return res.status(400).send( { error: 'Invlaid Updates'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


// delete task
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send()
        }
        res.send(task)

    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router