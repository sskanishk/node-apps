const add = (a, b)=> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject("number should not be less than 0")
            }
            resolve(a+b)
        }, 1000);
    })
}

const dowork = async () => {
    const temp = await add(1, 99)
    const temp2 = await add(temp, -1)
    const temp3 = await add(temp2, 99)
    return temp3
}

dowork().then((result) => {
    console.log('Result: ', result)
}).catch((e) => {
    console.log('e ', e)
})


// console.log(dowork())
// async - return promise