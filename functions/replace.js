'use strict';

const dynamoDB = require('../libs/dynamodb');

module.exports.execute = async (event) => {
  const data = JSON.parse(event.body);

  if (data === null || typeof event.pathParameters.id !== 'string'
    || typeof data.item !== 'string' || typeof data.quantity !== 'number') {
    console.error('Validation error');
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 'Bad Request',
        message: 'Item id must be present in path, item must be a string and quantity must be a number'
      })
    };
  }

  try {
    let updatedItem = await dynamoDB.updateItem(event.pathParameters.id, data.item, data.quantity);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedItem)
    };

  } catch (error) {
    console.error(error, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'Internal server error',
        message: 'Unable to update item'
      })
    };
  }
};