module.exports = {
    entry: './src/index.js', // Your main entry point
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                type: 'asset/source'
            }
        ]
    }
};