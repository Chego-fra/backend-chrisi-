const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection successful...');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Admin = require('./adminModel.js')(sequelize, DataTypes);
db.Parent = require('./parentModel.js')(sequelize, DataTypes);
db.Student = require('./studentModel.js')(sequelize, DataTypes);
db.Teacher = require('./teacherModel.js')(sequelize, DataTypes);
db.Grade = require('./gradeModel.js')(sequelize, DataTypes);
db.Class = require('./classModel.js')(sequelize, DataTypes);
db.Subject = require('./subjectModel.js')(sequelize, DataTypes);
db.Lesson = require('./lessonModel.js')(sequelize, DataTypes);
db.Exam = require('./examModel.js')(sequelize, DataTypes);
db.Assignment = require('./assignmentModel.js')(sequelize, DataTypes);
db.Result = require('./resultModel.js')(sequelize, DataTypes);
db.Attendance = require('./attendanceModel.js')(sequelize, DataTypes);
db.Event = require('./eventModel.js')(sequelize, DataTypes);
db.Announcement = require('./announcementModel.js')(sequelize, DataTypes);

// Define relationships
// Parent - Student
db.Parent.hasMany(db.Student, { foreignKey: 'parentId' });
db.Student.belongsTo(db.Parent, { foreignKey: 'parentId' });

// Grade - Student
db.Grade.hasMany(db.Student, { foreignKey: 'gradeId', as: 'students' });
db.Student.belongsTo(db.Grade, { foreignKey: 'gradeId', as: 'grade' });

// Class - Event
db.Class.hasMany(db.Event, { foreignKey: 'classId', as: 'events' });
db.Event.belongsTo(db.Class, { foreignKey: 'classId', as: 'class' });

// Class - Announcement
db.Class.hasMany(db.Announcement, { foreignKey: 'classId', as: 'announcements' });
db.Announcement.belongsTo(db.Class, { foreignKey: 'classId', as: 'class' });

// Grade - Class
db.Grade.hasMany(db.Class, { foreignKey: 'gradeId', as: 'classes' });
db.Class.belongsTo(db.Grade, { foreignKey: 'gradeId', as: 'grade' });

// Class - Lesson
db.Class.hasMany(db.Lesson, { foreignKey: 'classId', as: 'lessons' });
db.Lesson.belongsTo(db.Class, { foreignKey: 'classId', as: 'class' });

// Class - Student
db.Class.hasMany(db.Student, { foreignKey: 'classId', as: 'students' });
db.Student.belongsTo(db.Class, { foreignKey: 'classId', as: 'class' });

// Teacher - Subject
db.Teacher.hasMany(db.Subject, { foreignKey: 'teacherId', as: 'subjects' });
db.Subject.belongsTo(db.Teacher, { foreignKey: 'teacherId', as: 'teacher' });

// Teacher - Lesson
db.Teacher.hasMany(db.Lesson, { foreignKey: 'teacherId' });
db.Lesson.belongsTo(db.Teacher, { foreignKey: 'teacherId' });

// Teacher - Class (supervisor relationship)
db.Teacher.hasMany(db.Class, { foreignKey: 'supervisorId', as: 'supervisedClasses' });
db.Class.belongsTo(db.Teacher, { foreignKey: 'supervisorId', as: 'supervisor' });

// Subject - Lesson
db.Subject.hasMany(db.Lesson, { foreignKey: 'subjectId', as: 'lessons' });
db.Lesson.belongsTo(db.Subject, { foreignKey: 'subjectId', as: 'subject' });

// Lesson - Exam
db.Lesson.hasMany(db.Exam, { foreignKey: 'lessonId' });
db.Exam.belongsTo(db.Lesson, { foreignKey: 'lessonId' });

// Exam - Result
db.Exam.hasMany(db.Result, { foreignKey: 'examId' });
db.Result.belongsTo(db.Exam, { foreignKey: 'examId' });

// Lesson - Assignment
db.Lesson.hasMany(db.Assignment, { foreignKey: 'lessonId' });
db.Assignment.belongsTo(db.Lesson, { foreignKey: 'lessonId' });

// Assignment - Result
db.Assignment.hasMany(db.Result, { foreignKey: 'assignmentId' });
db.Result.belongsTo(db.Assignment, { foreignKey: 'assignmentId' });

// Student - Result
db.Student.hasMany(db.Result, { foreignKey: 'studentId' });
db.Result.belongsTo(db.Student, { foreignKey: 'studentId' });

// Student - Attendance
db.Student.hasMany(db.Attendance, { foreignKey: 'studentId' });
db.Attendance.belongsTo(db.Student, { foreignKey: 'studentId' });

// Lesson - Attendance
db.Lesson.hasMany(db.Attendance, { foreignKey: 'lessonId' });
db.Attendance.belongsTo(db.Lesson, { foreignKey: 'lessonId' });

// Sync database
db.sequelize.sync({ force: false }).then(() => {
  console.log('Re-sync done');
});

module.exports = db;
