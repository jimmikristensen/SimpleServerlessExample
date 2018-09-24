'use strict';

const dynamoDB = require('../libs/dynamodb');

module.exports.execute = async (event) => {
  try {
    let itemList = await dynamoDB.getItems();

    return {
      statusCode: 200,
      body: JSON.stringify({
        count: itemList.Count,
        items: itemList.Items
      })
    };

  } catch (error) {
    console.error(error, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'Internal Server Error',
        message: 'Unable to retrieve items'
      })
    };
  }

};