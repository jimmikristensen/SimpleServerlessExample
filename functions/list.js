'use strict';

const dynamoDB = require('../libs/dynamodb');

module.exports.execute = async (event) => {
  try {
    let limit = 10;
    let exclusiveStartKey =  '' // Scan using the LastEvaluatedKey to gain pagination

    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
      let limitQuery = event.queryStringParameters.limit;

      if (!isNaN(limitQuery)
        && limitQuery <= 100
        && limitQuery > 0) {

        limit = limitQuery;
      }

      if (typeof event.queryStringParameters.next === 'string') {
        exclusiveStartKey = event.queryStringParameters.next;
      }
    }

    let itemList = await dynamoDB.getItems(limit, exclusiveStartKey);

    return {
      statusCode: 200,
      body: JSON.stringify({
        count: itemList.Count,
        items: itemList.Items,
        ...(itemList.LastEvaluatedKey !== undefined && {next: itemList.LastEvaluatedKey.id})
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