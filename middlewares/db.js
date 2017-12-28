var mongoose = require('mongoose');
const TodoSchema = require('../models/Todo');

module.exports = {
    // Connect/Disconnect middleware
    connectDisconnect: (req, res, next) => {
        // Create connection using Mongo Lab URL
        // available in Webtask context
        const connection = mongoose.createConnection(req.webtaskContext.secrets.MONGO_URL);
        // Create a mongoose model using the Schema
        req.TodoModel = connection.model('Todo', TodoSchema);
        req.on('end', () => {
            // Disconnect when request
            // processing is completed
            mongoose.connection.close();
        });
        // Call next to move to
        // the next Express middleware
        next();
    },
};