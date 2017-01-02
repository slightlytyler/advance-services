export default (event, context, callback) => callback(null, {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({
    id: '4',
    completed: false,
    text: event.body.text,
  }),
});
