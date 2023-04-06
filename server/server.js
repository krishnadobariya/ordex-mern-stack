const express = require('express')
const app = express();
require('dotenv').config();
const sequelize = require('./database/conn');
const cors = require('cors');
sequelize.sync();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('<h1> This Class About Sequelize </h1>')
});

const adminRouter = require("./routes/admin.routes");
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})