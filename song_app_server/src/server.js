const app = require('./app');
const songRoutes = require('./routes/songRoutes.js');

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Here is Backend...");
  });

  app.use('/song_app', songRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
