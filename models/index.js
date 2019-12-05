import mongoose from 'mongoose';

module.exports.connect = (uri) => {
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
    // plug in the promise library:
    mongoose.Promise = global.Promise;

    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);

    mongoose.connection.on('error', (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
    require('./user');
};
