'use strict';

const dynamoDB = require('../libs/dynamodb');

module.exports.execute = async (event) => {
  try {
    if (typeof event.pathParameters.id === 'string') {
      await dynamoDB.deleteItem(event.pathParameters.id);

      return {
        statusCode: 204
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 'Bad Request',
        message: 'Path parameter for item ID is missing'
      })
    };

  } catch(error) {
    console.error(error, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'Internal Server Error',
        message: 'Unable to delete item'
      })
    };
  }
};