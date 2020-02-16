const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000);
    })
}

// add(1, 3).then((sum) => {
//     console.log(sum)

//     add(sum, 3).then((sum2) => {
//         console.log(sum2)
//     }).catch((e) => {
//         console.log(e)
//     })

// }).catch((e) => {
//     console.log(e)
// })


// you can return a promise to allow to another chain promise
add(1,3).then((sum) => {
    console.log(sum)
    return add(sum, 3)

}).then((sum2) => {
    console.log(sum2)
}).catch((e)=> {
    console.log(e)
})