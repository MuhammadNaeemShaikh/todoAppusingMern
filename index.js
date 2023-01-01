const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const routes = require('./router/routes');
const userSchema = require('./model/user');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cors());

//Db Connection

try {
    mongoose.connect('mongodb://127.0.0.1:27017/myDb', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
} catch (error) {
    console.log('Error in DB connection');
}

process.on('UnhandledRejection', error => {
    console.log('DB error', error);
});


// inserting data into database

app.post('/todo', (req, res) => {
    const {
        userId,
        input
    } = req.body;
    userSchema.updateOne({
        email:userId
    },{
        $push:{
            task:input
        }
    },
    function (error, success) {
        if (error) {
            res.send(error);
        } else {
            res.send(success);
        }
    })
})

//fetching data from data base

app.get('/todos/:getName', (req, res) => {
    // Get the userId from the request params
    const userId = req.params.getName;
    // Get the specific user from database
    userSchema.findOne({email:userId}, function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users.task);
        }
    });
});

// app.get('/dlttodos/:list', (req, res) => {

//     // console.log(req.params.getName);
//     console.log(req.params.list);
//     // userSchema.updateOne({
//     //     email:userId
//     // },{
//     //     $push:{
//     //         task:input
//     //     }
//     // },
//     // function (error, success) {
//     //     if (error) {
//     //         res.send(error);
//     //     } else {
//     //         res.send(success);
//     //     }
//     // })
// })

//delete array item from db

app.get('/dlttodos', (req, res) => {
    const {id,e} = req.query
    console.log("call",id);
    console.log("call",e);
    userSchema.updateOne(
        { _id: id },
        { $pull: { task:e } },
        (Err, result) => {
            if (Err) {
              console.error(Err);
              res.status(500).send({ error: 'Error deleting item from array' });
              return;
            }
    
            res.send(result);
          }
    )
   
});

// Create a schema for the todo list
// const todoSchema = new mongoose.Schema({
//     userId: {
//         type: String,
//         required: true,
//     },
//     input: {
//             type:String,
//             required:true
//         },
// });

// // Create a model for the todo list
// const Todo = mongoose.model('Todo', todoSchema);


// app.post('/todo', (req, res) => {
//     const {
//         userId,
//         input
//     } = req.body;

//     // Create a new todo
//     const todo = new Todo({
//         userId,
//         input,
//     });
//     console.log(todo);
//     // Save the todo to the database
//     todo.save((error) => {
//         if (error) {
//             res.send(error);
//         } else {
//             res.send('Todo added successfully');
//         }
//     });

// })





// app.get('/todos/:getName', (req, res) => {
//     // Get the userId from the request params
//     const userId = req.params.getName;
//     // Get the specific user from database
//     Todo.find({email:userId}, function(err, users){
//         if(err){
//             console.log(err);

//         }
//         else {
//             res.json(users);
//             console.log("users.input",users)
//         }
//     });
//     console.log("param user id",userId);
// });




app.use('/', routes);

app.listen(9000, () => {
    console.log("Server is running")
});