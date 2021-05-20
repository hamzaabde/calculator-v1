const toArray = str => Array.from(str)

const formatSyntax = str => {
    if (str.length === 0) return '0'

    const exprSyntaxReg = /(\d+\.*\d*)|^(\-\d+\.*\d*)|(?<=[\+\-\*\/\(\)])(\-\d+\.*\d*)|[\+\-\*\/](?![\+\*\/])|[\(\)\%]|(\d*)/g
    const bracketMultReg = /(\d(?=\())|(\)(?=\d))/g

    str = str.replaceAll(/(÷)/g, `/`)
    str = str.replaceAll(/(x)|(\×)/g, `*`)

    str = str.replaceAll(bracketMultReg, (match, d1, d2) => {
        return d1 ? `${d1}*` : `*${d2}`
    })

    const expression = toArray(str.match(exprSyntaxReg))

    return expression.join('')
}

export default expr => {
    const expression = formatSyntax(expr)

    return eval(expression)
}
