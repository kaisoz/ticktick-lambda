var tick = require('tick')

exports.handler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Done!'),
    };
    return response;
};
