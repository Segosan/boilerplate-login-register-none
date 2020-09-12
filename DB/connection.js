const mongoose = require('mongoose');
const url = "mongodb+srv://cluster0.t14da.mongodb.net/cuanto_sabes"


mongoose.connect(url, { useNewUrlParser: true, 
        useUnifiedTopology: true, useCreateIndex: true  })

const db = mongoose.connection
db.once('open', _ => {
    
  console.log('Database connected:', url)

})

db.on('error', err => {
  console.error('connection error:', err)
})
