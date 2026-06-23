function delayFn(time){
    return new Promise((resolve) => setTimeout(resolve, time))
}

async function delayedGreet(name){
    await delayFn(2000)
    console.log(name)
}

delayedGreet("pankaj")

async function divison(num1,num2){
    try{
       if(num2 === 0) throw new Error('can not divide by 0');
        return num1 / num2
    }catch (error){
        console.error('error', error)
        return;
    }
}

async function mainFn(){
    console.log(await divison(10,2));
}

mainFn()