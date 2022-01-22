const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const users = require('./routes/users')
const path = require('path')
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const user = require('./models/user')

app.use(bodyParser.json())

app.use(express.json())
const cors = require('cors');
app.use(cors())


app.use('/api/v1/users', users);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, './frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './frontend/dist/index.html'))
    })
}



sequelize.sync({
    force: true,
    logging: console.log
}).then(result => {
    console.log(result);
    app.listen(port, () => {
        console.log(`listening at port ${port}`)
    })
}).catch(error => {
    console.log(error);
});



