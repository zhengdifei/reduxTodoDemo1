var path = require('path');

var config = {
    entry : {
        app : path.resolve(__dirname,'./app/index.js')
    },
    output : {
        path : path.resolve(__dirname,'./app/build'),
        filename : 'app.js'
    },
    module : {
        loaders: [{
            test : /\.jsx?$/,
            exclude : /node_modules/,
            loader : 'babel?presets[]=react,presets[]=es2015'
        }]
    }
};

module.exports = config;