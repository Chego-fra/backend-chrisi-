require('dotenv').config()
const teacherRoute = require('./routes/teacherRoute')
const subjectRoute = require('./routes/subjectRoute')
const lessonRoute = require('./routes/lessonRoute')
const examRoute = require('./routes/examRoute')
const parentRoute = require('./routes/parentRoute')
const resultRoute = require('./routes/resultRoute')
const studentRoute = require('./routes/studentRoute')
const gradeRoute = require('./routes/gradeRoute')
const eventRoute = require('./routes/eventRoute')
const classRoute = require('./routes/classRoute')
const attendanceRoute = require('./routes/attendanceRoute')
const announcementRoute = require('./routes/announcementRoute')
const assignmentRoute = require('./routes/assignmentRoute')
const express = require('express')
const app = express()


const helmet = require('helmet')
app.use(helmet())
const limit = require('express-rate-limit')
const limiter = limit({
    max: '100',
    windowMs: 60*60*1000,
    message: 'too many request from this ip, try again in an hour'
})
app.use('/api', limiter)


const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', teacherRoute)
app.use('/api', subjectRoute)
app.use('/api', lessonRoute)
app.use('/api', examRoute)
app.use('/api', parentRoute)
app.use('/api', resultRoute)
app.use('/api', studentRoute)
app.use('/api', gradeRoute)
app.use('/api', eventRoute)
app.use('/api', classRoute)
app.use('/api', attendanceRoute)
app.use('/api', announcementRoute)
app.use('/api', assignmentRoute)

// Error handling middleware
app.use((err, req, res, next) => {
    if (err.status === 401) {
        // Handle 401 Unauthorized error
        res.status(401).send({
            error: {
                status: 401,
                message: "Unauthorized: Invalid username/password"
            }
        });
    } else {
        // Handle other errors
        res.status(err.status || 500).send({
            error: {
                status: err.status || 500,
                message: err.message || "Internal Server Error"
            }
        });
    }
});



app.listen(process.env.port || 4000, function(){
    console.log('Now listenining For request on: http://localhost:4000');
    
})



