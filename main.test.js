const { transformFile } = require('@babel/core')
const options = {
    plugins: [
        ['@babel/plugin-syntax-jsx'],
        ['./main.js', {
            module: 'lib',
            import: 'createElement'
        }],
    ]
}

transformFile('./main.test.code.js', options, function(err, result) {
    console.log(err)
    console.log(result.code)
})