const mongoose = require('mongoose');
const env = require('./environment');
mongoose.connect(`mongodb://localhost/${env.db}`, {
useUnifiedTopology: true,
useNewUrlParser: true,
}).then(() => console.log('DB Connected!')).catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});


const db = mongoose.connection;

// db.on('error',console.error.bind(console,'Error connecting to mongodb'));

// db.once('open',function (){
//     console.log("Connected to database mongodb");
// });



module.exports = db;