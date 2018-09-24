'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const dynamoDbTable = process.env.DYNAMODB_TABLE;

let putItem = async (item, quantity) => {
  let timestamp = new Date().getTime();

  const params = {
    TableName: dynamoDbTable,
    Item: {
      id: uuid.v1(),
      item: item,
      qty: quantity,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  await dynamoDb.put(params, (err, data) => {}).promise();
  return params.Item;
}

let getItem = async (itemId) => {
  const params = {
    TableName: dynamoDbTable,
    Key: {
      id: itemId,
    }
  };

  let result = await dynamoDb.get(params, null).promise();
  return result;
}

let getItems = async () => {
  const params = {
    TableName: dynamoDbTable
  }

  let result = await dynamoDb.scan(params, null).promise();
  console.log(result);
  return result;
}

module.exports = {
  putItem: putItem,
  getItem: getItem,
  getItems: getItems
};