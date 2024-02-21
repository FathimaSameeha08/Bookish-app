const express = require('express');
const cors = require('cors');
const logic=require('./services/logic')
const serverApp = express()
serverApp.use(cors({
    origin:'http://localhost:3000' //connect react app
}))

serverApp.use(express.json())
serverApp.listen(8000,()=>{
    console.log('server listening on port 8000')
})

serverApp.post('/addUser',(req,res)=>{
    logic.addUser(req.body.name,req.body.email,req.body.passwd).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.get('/getUsers',(req,res)=>{
    logic.getAllUser().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.post('/addBook',(req,res)=>{
    logic.addTracking(req.body.userId,req.body.bookName,req.body.authorName,req.body.genre,req.body.totalPages,req.body.pagesRead,req.body.quote,req.body.review,req.body.rating,req.body.startingDate,req.body.finishedDate,req.body.status).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.get('/getTrackCard',(req,res)=>{
    logic.getTrackCard().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.delete('/deleteTrackingBook/:id',(req,res)=>{
    logic.deletTrackingBook(req.params.id).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.post('/editTracking/:id',(req,res)=>{
    logic.editTracking(req.params.id,req.body.bookName,req.body.authorName,req.body.genre,req.body.totalPages,req.body.pagesRead,req.body.quote,req.body.review,req.body.rating,req.body.startingDate,req.body.finishedDate,req.body.status).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.post('/addToRead',(req,res)=>{
    logic.addToRead(req.body.userId,req.body.id,req.body.title,req.body.image_url,req.body.genres,req.body.authors,req.body.description,req.body.rating).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.get('/getToRead',(req,res)=>{
    logic.getToRead().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.delete('/deleteToRead/:id',(req,res)=>{
    logic.deleteToRead(req.params.id).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

serverApp.post('/addQuotes',(req,res)=>{
    logic.addQuotes(req.body.userId,req.body.quote,req.body.book,req.body.author).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
serverApp.get('/getQuotes',(req,res)=>{
    logic.getQuotes().then((result)=>{
        res.status(result.statusCode).json(result)
    })
})
serverApp.delete('/deleteQuotes/:_id',(req,res)=>{
    logic.deleteQuotes(req.params._id).then((result)=>{
        res.status(result.statusCode).json(result)
    })
})