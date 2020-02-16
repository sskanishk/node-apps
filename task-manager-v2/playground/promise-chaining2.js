require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e47ba0f840a25b1f0e526c2').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


const deleteAndCount = async(id, completed) => {
    const del = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteAndCount('5e47b9b2050684b18963e7f3', true).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('e', e)
})