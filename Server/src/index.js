const server = require('./app')
const PORT = 3001;
const { conn } = require('./DB_connection')


// server.listen(PORT, async() => {
//    await conn.sync({force: false})
//    console.log('todo ok');
//    console.log(`Server raised in port ${PORT}`);
// });

conn.sync({force: false}).then(value=>{
   server.listen(PORT, ()=>{
      console.log(`Server raised in port ${PORT}`);
   })
}).catch(error => console.log(error));