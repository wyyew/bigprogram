module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 3000),
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || 3030,
  app: {
    title: '经销商门户',
    description: 'React Redux 经销商门户',
    head: {
      titleTemplate: '经销商门户: %s',
      meta: [
        {
          name: 'description',
          content: 'React Redux 经销商门户'
        },
        { charset: 'utf-8' }
      ]
    }
  }
};
