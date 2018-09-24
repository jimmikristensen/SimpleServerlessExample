'use strict';

const dynamoDB = require('../libs/dynamodb');

module.exports.execute = async (event) => {
  const data = JSON.parse(event.body);

  if (data === null || typeof data.item !== 'string' || typeof data.quantity !== 'number') {
    console.error('Validation error');
    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 'Bad Request',
        message: 'Item must be a string and quantity must be a number'
      })
    };
  }

  try {
    let createItem = await dynamoDB.putItem(data.item, data.quantity);

    return {
      statusCode: 201,
      body: JSON.stringify(createItem)
    };

  } catch (error) {
    console.error(error, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'Internal server error',
        message: 'Unable to store item'
      })
    };
  }
};