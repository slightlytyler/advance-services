'use strict';

module.exports = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      pagination: {
        currentPage: 1,
        perPage: 20,
        totalElements: 3,
        totalPages: 1,
      },
      records: [
        {
          id: '1',
          completed: true,
          text: 'Try out AWS',
        },
        {
          id: '2',
          completed: true,
          text: 'Try out Serverless',
        },
        {
          id: '3',
          completed: false,
          text: 'Sell out',
        },
      ],
    }),
  };

  callback(null, response);
};
