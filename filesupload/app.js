const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const multer = require('multer');

const GridFsStorage = require('multer-gridfs-storage');

const Grid = require('gridfs-stream');

const methodOverride = require('method-override');

const cors=require('cors')

const app = express();



app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');


app.use(cors())

const mongoURI = 'mongodb+srv://todos:shubham@cluster0-vh32b.mongodb.net/test?retryWrites=true&w=majority';



// Create mongo connection

const conn = mongoose.createConnection(mongoURI);



// Init gfs

let gfs;



conn.once('open', () => {

  // Init stream

  gfs = Grid(conn.db, mongoose.mongo);

  gfs.collection('uploads');

});



// Create storage engine

const storage = new GridFsStorage({

  url: mongoURI,

  file: (req, file) => {

    return new Promise((resolve, reject) => {

        const filename = file.originalname;

        const fileInfo = {

          filename: filename,

          bucketName: 'uploads'

        };

        resolve(fileInfo);

    });

  }

});

const upload = multer({ storage });



// @route GET /

// @desc Loads form

app.get('/home', (req, res) => {

  gfs.files.find().toArray((err, files) => {

    // Check if files

    if (!files || files.length === 0) {

      res.render('index', { files: false });

    } else { 

      res.render('index', { files: files });

    }

  });

});

app.get('/',(req,res)=>{
  res.render('login')
  //res.sendfile('./index.html')
})

app.get('/qsession',(req,res)=>{
  res.sendfile('./qna.html')
})

// @route POST /upload

// @desc  Uploads file to DB



app.post('/upload', upload.single('file'), (req, res) => {

 //res.json({ file: req.file });

  res.redirect('/home');

});

app.get('/files/:filename', (req, res) => {

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {

    // Check if file

    if (!file || file.length === 0) {

      return res.status(404).json({

        err: 'No file exists'

      });

    }

    // File exists

    const readstream = gfs.createReadStream(file.filename);

    return readstream.pipe(res);

  });

});

app.delete('/files/:id', (req, res) => {

  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {

    if (err) {

      return res.status(404).json({ err: err });

    }

    res.redirect('/home');

  });

});
//start mongodb comment


const mongodb=require('mongodb')
const db_url="mongodb+srv://todos:shubham@cluster0-vh32b.mongodb.net/test?retryWrites=true&w=majority"
var urlencodedParser=bodyParser.urlencoded({extended:false})
mongodb.MongoClient.connect(db_url,(error,dbClient)=>{
  if(error){
      console.log('connection failed',error)
      return
  }
  //student info start
  let dbo=dbClient.db('comment')
  app.get('/comment/',(req,res)=>{
      const collection=dbo.collection('commentsec')
      collection.find({}).toArray().then(data => {
        // console.log(data)
        res.send({
            message: 'success',
            data: data
        })
      })
  })
  app.post('/comment/post',urlencodedParser,(req,res)=>{
    console.log(req.body)
      let obj={
          question:req.body.question,
          //name:req.body.name,
          answer:req.body.answer
      }
      //filename=req.body.filename
      dbo.collection('commentsec').insertOne(obj,(err,response)=>{
          if(err){
              console.log('some error in post',err)
              return
          }
          //res.send(obj)
          res.redirect('/qsession')
      })
  })
  app.post('/comment/post/:question?',urlencodedParser,(req,res)=>{
    question=req.params.question
    answer=req.body.comment
    findObj={question:question}
    dbo.collection('commentsec').find(findObj).toArray().then(data => {
      data.forEach(element => {
        //console.log(element._id)
        answer1=[]
        if(element.answer){
          answer1=answer1.concat(element.answer)
          answer1=answer1.concat(answer)
          //console.log(answer1,element.answer)
        }
        else{answer1=answer}
        //console.log(answer1)
        let obj={
          question:element.question,
          answer:answer1
        }
        dbo.collection('commentsec').update({_id:element._id},obj).then(data=>{
          res.redirect('/qsession')
        })
      });
    })
  })
  /* app.delete('/student/logindelete/:email?',(req,res)=>{
      let obj={email:req.params.email}
      dbo.collection('student').deleteOne(obj,(err,response)=>{
          if(err){
              console.log('some error in delete',err)
              return
          }
          res.send('data deleted')
      })
  }) */
  //student info end
})

//student api creation
var urlencodedParser=bodyParser.urlencoded({extended:false})
mongodb.MongoClient.connect(db_url,(error,dbClient)=>{
    if(error){
        console.log('connection failed',error)
        return
    }
    //student info start
    let dbo=dbClient.db('crud')
    app.get('/student/loginget/:email?',(req,res)=>{
        const collection=dbo.collection('student')
        const usename=req.params.email
        if(usename){
            const findObj = { 'email': usename }
            collection.find(findObj).toArray().then(data => {
                res.send({
                    message: 'success',
                    data: data
                })
            })
        }
        else{
            collection.find({}).toArray().then(data => {
                // console.log(data)
                res.send({
                    message: 'success',
                    data: data
                })
            })
        }
    })
    app.post('/student/login/posting',urlencodedParser,(req,res)=>{
      console.log(req.body)
      email=req.body.username
      password=req.body.password
      console.log(email,password)
      const collection=dbo.collection('student')
        const usename=email
        if(usename){
          var c=0
            const findObj = { "email": usename }
            collection.find(findObj).toArray().then(data => {
              data.forEach(function(data){
              //console.log(dataone)
              //console.log(dataone.password,password)
              if(data.password==password){
                //console.log('right')  
                res.redirect('/home')
              }
              else{
                res.redirect('/')
              } 
            })
            })
        }
    })
    app.post('/student/loginpost',urlencodedParser,(req,res)=>{
      console.log(req.body);
      //res.render('login',{qs:req.query})
      let obj={
            username:req.body.username,
            password:req.body.password,
            phone:req.body.phone,
            email:req.body.email,
            proffesion:req.body.proffesion
        }
        dbo.collection('student').insertOne(obj,(err,response)=>{
            if(err){
                console.log('some error in post',err)
                return
            }
            res.redirect('/')
        })
    })
    app.delete('/student/logindelete/:email?',(req,res)=>{
        let obj={email:req.params.email}
        dbo.collection('student').deleteOne(obj,(err,response)=>{
            if(err){
                console.log('some error in delete',err)
                return
            }
            res.send('data deleted')
        })
    })
    //student info end
})




const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));