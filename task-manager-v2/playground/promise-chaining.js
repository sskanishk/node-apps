require('../src/db/mongoose')
const User = require('../src/models/user')

// Promise Chaining
// 
// User.findByIdAndUpdate('5e47c00b39eba6b4dc7e58d2', { age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


// Async Await
// 
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age } )
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5e47afaa03f7c7aee01b1b1a', 0).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log('e', e)
})