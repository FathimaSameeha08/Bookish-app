const mongoose = require('mongoose');
mongoose.connect ('mongodb://localhost:27017/Bookish')
const User= mongoose.model('User',{   //model- User
    name:String, //
    email:String,   // schema
    passwd:String, //

})

const Track=mongoose.model('Track',{
    userId:String,
    bookName:String,
    authorName:String,
    genre:String,
    totalPages:Number,
    pagesRead:Number,
    quote:String,
    review:String,
    rating:Number,
    startingDate:Date,
    finishedDate:Date,
    status:String,
        
})

const ToRead=mongoose.model('ToRead',{
    userId:String,
    id:String,
    description:String,
    title:String,
    image_url:String,
    genres:String,
    authors:String,
    rating:String

})

const Quotes=mongoose.model('Quotes',{
    userId:String,
    quote:String,
    book:String,
    author:String
})
module.exports = {
    User,Track,ToRead,Quotes
}