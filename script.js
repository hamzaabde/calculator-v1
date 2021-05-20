import calc from './calculator.js'

const input = document.querySelector('#input')
const output = document.querySelector('#output')
const buttons = Array.from(document.querySelectorAll('.key'))
const btn = buttons.concat(Array.from(document.querySelectorAll('.btn')))

// add keyboard events
document.addEventListener('keydown', writeFromKeyboard)

function writeFromKeyboard(e) {
    const regex = /^\d$|\(|\)|\.|[\+\-\*\/\÷\×\%]/
    const key = e.key

    if (regex.test(key)) {
        writeToInput(key)
    }

    if (key === 'Backspace') {
        del(input)
        del(output)
    }

    if (key === 'Enter' || key === '=') {
        writeResult()
    }
}

function writeToInput(key) {
    const str = input.textContent

    if (str === '0' && /\(|\)|\d/.test(key)) input.textContent = key

    if (/\.|[\+\-\*\/\÷\×\%]/.test(key)) input.textContent += key

    if (str !== '0' && !/\.|[\+\-\*\/\÷\×\%]/.test(key))
        input.textContent += key
}

function del(el) {
    const str = el.textContent
    el.textContent = str.slice(0, str.length - 1)

    if (str.length === 1 || el === output) {
        el.textContent = 0
    }
}

function writeResult() {
    let expr = input.textContent

    console.log(expr, calc(expr))

    output.textContent = calc(expr)
}

console.log()

// mouse events
document.addEventListener('click', writeFromMouse)

function writeFromMouse(e) {
    if (isButton(e.target)) {
        const regex = /^\d$|\(|\)|\.|[\+\-\*\/\÷\×\%]/
        let key = getBtnValue(e.target)

        if (regex.test(key)) {
            writeToInput(key)
        }

        if (key === 'C') {
            del(input)
            del(output)
        }

        if (key === '=') {
            writeResult()
        }
    }
}

function isButton(target) {
    if (btn.includes(target) && target.matches('div')) {
        return true
    }
    if (btn.includes(target) && target.matches('span')) {
        return true
    }

    return false
}

function getBtnValue(target) {
    if (btn.includes(target) && target.matches('div')) {
        return target.querySelector('.btn').textContent
    }

    if (btn.includes(target) && target.matches('span')) {
        return target.textContent
    }
}
