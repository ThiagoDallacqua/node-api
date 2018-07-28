const app = require('./config/express')();
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server Running at port ${port}`);
});

app.get('/', (req, res) => {
  res.status(302).redirect('https://github.com/ThiagoDallacqua/node-api/blob/master/README.md');
});
