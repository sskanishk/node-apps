const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

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
app.post('/users', async (req, res) => {
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


app.get('/users', async (req, res) => {
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

app.get('/users/:id', async(req, res) => {
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
app.patch('/users/:id', async(req, res) => {
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
app.delete('/users/:id', async (req, res) => {
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



// app.post('/tasks', (req, res) => {
//     const task = new Task(req.body)

//     task.save().then(() => {
//         res.status(201).send(task)
//     }).catch((e) => {
//         res.status(400).send(e)
//     })
// })

app.post('/tasks', async (req, res) => {
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

app.get('/tasks', async (req, res) => {
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

app.get('/tasks/:id', async (req, res) => {
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
app.patch('/tasks/:id', async(req, res) => {
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
app.delete('/tasks/:id', async (req, res) => {
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






app.listen(port, () => {
    console.log('Server is up on port ' + port)
})