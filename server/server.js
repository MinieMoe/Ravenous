//IMPORT THE LIBRARIES AND DEPENDENCIES HERE
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

dotenv.config()

const app = express()
app.use(express.json())

const port = 1337
const url = process.env.DATABASE_URL

/* user schema
    correspond to user collection
    define the structure of the documents within user collection
*/
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:{
        type:String,
        unique: true
    },
    password: String,
})

//convert schema to model
const User = mongoose.model('User', userSchema)

//CONNECT THE MONGODB USING THE MONGOOSE
mongoose.set('strictQuery', false)
mongoose.connect(url,(err) => {
    if(err){
        console.log("err", err)
    }else{
        console.log("DB Connection established")
    }
})

//DEFINE A ROOT ROUTE THAT SENDS A HELLO WORLD REPONSE
app.get('/', function (req, res) {
    res.send("Hello World!")
})


app.post('/api/signup', function (req, res) {
    //Extract the required fields (firstName, lastName, email, password, and confirmPassword) from the request body and store them in separate variables.
    const {firstName, lastName, email, password, confirmPassword} = req.body

    //Check if all the required fields are present in the request body. If any of the fields is missing, the code returns a failure status and an error message indicating that all input fields are required.
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return res.json({
            status: 'fail',
            message: 'All input fields are required'
        })
    }

    //Use the bcrypt.hash function to hash the password before storing it in the database. The function takes the password and a salt value (12 in this case) as arguments, and returns the hashed password. If an error occurs while hashing the password, the code returns a failure status and an error message.
    bcrypt.hash(password, 12, function(err, hash){
        if(err){
            return res.json({
                status: 'fail',
                message:'Hasing password failed'
            })
        }

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
        })
        
        /* Use the User.create method to create a new user in the database. The method takes the request body as an argument and returns the newly created user. If an error occurs or the user is not created, the code returns a failure status and an error message.

            almost all mongoose query function (create()) has callback functions in formats (err, results)
            results is whatever the results of the query function (create()) returns

            in this create(), it creates a new user, and store the returning new user into the callback function 'user'
        */
        User.create(newUser, function(err, user){
            if (err){
                if(err.code === 11000){
                    const key = Object.keys(err.keyValue)[0]
                    const message = `Duplicated ${key} value: "${err.keyValue[key]}. Please use another value!"`
                    return res.json({
                        status: 'fail',
                        message,
                    })
                }
                return res.json({
                    status: 'fail',
                    message: 'Failed to create a new user!',
                })
            }
            //If the user is successfully created, the code returns a success status and the newly created user.
            res.json({
                status: 'success',
                data: {user}
            })
  
        })
    })

})

app.post('/api/login', function (req, res) {
    
    //Extract the required fields(email and password) from the request body and store them in separate variables.
    const {email, password} = req.body

    //If statement to check if both the email and password fields are present in the request body.If any of them is missing, the code returns a failure status and an error message indicating that all input fields are required.
    if (!email || !password){
        return res.json({
            status: 'fail',
            message: 'All input fields are required',
        })
    }

    //Use the User.findOne method to retrieve the user from the database based on the email.If an error occurs or the user is not found, the code returns a failure status and an error message indicating that the email or password is invalid.
    User.findOne({email}, function(err, user){
        if(err){
            return res.json({
                status: 'fail',
                message: 'Failed to find the user',
            })
        }
        //no user found in database
        if(!user){
            return res.json({
                status:'fail',
                message: 'Invalid email or password',
            })
        }


        /*if the user is found in the database, check if the entered password is correct
            Use the bcrypt.compare function to compare the password submitted by the user with the hashed password stored in the database.If the passwords do not match, the code returns a failure status and an error message indicating that the email or password is invalid.
        */
        bcrypt.compare(password, user.password, function(err, isCorrectPassword){
            if(err){
                return res.json({
                    status: 'fail',
                    message: 'Failed to compare password',
                })
            }
            if (!isCorrectPassword){
                return res.json({
                    status:'fail',
                    message: 'Invalid email or password',
                })
            }

            //If the email and password are correct, the code returns a success status and the user.
            res.json({
                status: 'success',
                data: {user},
            })
        })

    })

})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`)
})

















