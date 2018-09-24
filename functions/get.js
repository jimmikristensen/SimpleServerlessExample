'use strict';

const _ = require('lodash');
const dynamoDB = require('../libs/dynamodb');

module.exports.execute = async (event) => {
  try {
    if (typeof event.pathParameters.id === 'string') {
      let item = await dynamoDB.getItem(event.pathParameters.id);

      if (_.isEmpty(item)) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            status: 'Not Found',
            message: 'Item not found'
          })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify(item.Item)
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({
        status: 'Bad Request',
        message: 'Path parameter for item ID is missing'
      })
    };

  } catch (error) {
    console.error(error, error.stack);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: 'Internal Server Error',
        message: 'Unable to retrieve item'
      })
    };
  }


};