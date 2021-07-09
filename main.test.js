const { transformFile } = require('@babel/core')
const options = {
    plugins: [
        ['@babel/plugin-syntax-jsx'],
        ['./main.js', {
            path: './lib',
            name: 'createElement'
        }],
    ]
}

transformFile('./main.test.code.js', options, function(err, result) {
    console.log(err)
    console.log(result.code)
})