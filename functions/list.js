'use strict';

const dynamoDB = require('../libs/dynamodb');

module.exports.execute = async (event) => {
  try {
    let limit = 10;
    let exclusiveStartKey =  '' // Query using the LastEvaluatedKey to gain offset

    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
      if (Number.isInteger(event.queryStringParameters.limit)
        && event.queryStringParameters.limit < 100
        && event.queryStringParameters.limit > 0) {

        limit = event.queryStringParameters.limit;
      }

      if (typeof event.queryStringParameters.fromId === 'string') {

        exclusiveStartKey = event.queryStringParameters.fromId;
      }
    }

    let itemList = await dynamoDB.getItems(limit, exclusiveStartKey);

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