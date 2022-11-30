import { select } from './utility-functions.js'

let output = select('.hackercode')

function randomString(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
}

function hackerText() {
    let stringOutput = btoa(randomString(3))
    output.innerHTML += stringOutput;

}

export { hackerText }