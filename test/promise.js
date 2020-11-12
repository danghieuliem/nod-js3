
// new Promise((res,rej)=>{

// })


const getRandomNumber = ([form, to]) => {
    return new Promise((res, rej) => {
        const number = Math.floor(Math.random() * to) + form;
        res(number);
    });
}

const checkOddNumder = (number) => {
    return new Promise((res, rej) => {
        if (number % 2 === 1)
            res(number);
        rej(number);
    });
}

getRandomNumber([1, 100])
    .then(checkOddNumder)
    .then((theNumder) => {
        console.log(`${theNumder} is an odd number`)
    })
    .catch((theNumder) => {
        console.log(`${theNumder} is not an odd number`)
    });