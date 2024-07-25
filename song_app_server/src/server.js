const app = require('./app');
const songRoutes = require('./routes/songRoutes.js');

const port = process.env.PORT || 8000;

module.exports = async (arg1, arg2, arg3) => {

  await app().then(async mongoose => {
      try{
          console.log('Connected to mongo!!');
          await command.execute(client, message, args);
      }
      finally{
          mongoose.connection.close();
      }
  });

};

app.get("/", (req, res) => {
    res.send("Here is Backend...");
  });

  app.use(songRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});