const db = require ('./db')


const addUser=(name,email,passwd)=>{
    return db.User.findOne({email}).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"User already exists"
            }
        }
        else{
            const newUser= db.User({name,email,passwd})
            newUser.save()
            return{
                statusCode:200,
                message:"Registration successful"
            }
        }
    })
}

const getAllUser=()=>{
    return db.User.find().then((response)=>{
        if(response){
            return{
                statusCode:200,
                user:response //array of employees
            }
        }
        else{
            return{
                statusCode:400,
                message:"Register before login"
            }
        }
    })
}
const addTracking=(userId,bookName,authorName,genre,totalPages,pagesRead,quote,review,rating,startingDate,finishedDate,status)=>{
    return db.Track.findOne({bookName,userId}).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"Book already added"
            }
        }
        else{
            const newBook= db.Track({userId,bookName,authorName,genre,totalPages,pagesRead,quote,review,rating,startingDate,finishedDate,status})
            newBook.save()
            return{
                statusCode:200,
                message:"Book added to track."
            }
        }
    })
}
const getTrackCard=()=>{
    return db.Track.find().then((response)=>{
        if(response){
            return{
                statusCode:200,
                track:response
            }
        }
        else{
            return{
                statusCode:400,
                message:'No Book Added'
            }
        }
    })
}
const deletTrackingBook=(_id)=>{
    return db.Track.deleteOne({_id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Book Deleted"
            }
        }
        else{
            return{
                statusCode:400,
                message:"Book not found"
            }
        }
    })
}

const editTracking=(_id,bookName,authorName,genre,totalPages,pagesRead,quote,review,rating,startingDate,finishedDate,status)=>{
    return db.Track.findOne({_id}).then((result)=>{
        if(result){
            result._id=_id;
            result.bookName=bookName;
            result.authorName=authorName;
            result.genre=genre;
            result.totalPages=totalPages;
            result.pagesRead=pagesRead;
            result.quote=quote;
            result.review=review;
            result.rating=rating;
            result.startingDate=startingDate;
            result.finishedDate=finishedDate;
            result.status=status
            result.save()
            return{
                statusCode:200,
                message:"Data updated successfully"
            }
        }
        else{
            return{
                statusCode:404,
                message:"Book not found"
            }
        }
    })
}

const addToRead=(userId,id,title,image_url,genres,authors,description,rating)=>{
    return db.ToRead.findOne({id,userId}).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"Book already added"
            }
        }
        else{
            const newBook= db.ToRead({userId,id,title,image_url,genres,authors,description,rating})
            newBook.save()
            return{
                statusCode:200,
                message:"Book added in to read list."
            }
        }
    })
}
const getToRead=()=>{
    return db.ToRead.find().then((response)=>{
        if(response){
            return{
                statusCode:200,
                toread:response
            }
        }
        else{
            return{
                statusCode:400,
                message:'No Book Added'
            }
        }
    })
}
const deleteToRead=(id)=>{
    return db.ToRead.deleteOne({id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Book Deleted"
            }
        }
        else{
            return{
                statusCode:400,
                message:"Book not found"
            }
        }
    })
}

const addQuotes=(userId,quote,book,author)=>{
    return db.Quotes.findOne({userId,quote}).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:"Quote already added"
            }
        }
        else{
            const newBook= db.Quotes({userId,quote,book,author})
            newBook.save()
            return{
                statusCode:200,
                message:"Quote added."
            }
        }
    })
}
const getQuotes=()=>{
    return db.Quotes.find().then((response)=>{
        if(response){
            return{
                statusCode:200,
                quote:response
            }
        }
        else{
            return{
                statusCode:400,
                message:'No quotes Added'
            }
        }
    })
}
const deleteQuotes=(_id)=>{
    return db.Quotes.deleteOne({_id}).then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Quote Deleted"
            }
        }
        else{
            return{
                statusCode:400,
                message:"quote not found"
            }
        }
    })
}
module.exports={
    addUser,
    getAllUser,
    addTracking,
    getTrackCard,
    deletTrackingBook,
    editTracking,
    addToRead,
    getToRead,
    deleteToRead,
    addQuotes,
    getQuotes,
    deleteQuotes
}