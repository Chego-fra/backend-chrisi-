const db = require('../models/indexStart');
const createError = require('http-errors');

const Student = db.Student;
const Parent = db.Parent;
const Class = db.Class;
const Grade = db.Grade;
const Result = db.Result;
const Attendance = db.Attendance;

module.exports = {
  // Add a new student



    addStudent: async (req, res, next) => {
      try {
        const { username, name, surname, email, phone, address, bloodType, sex, birthday , parentId, classId, gradeId,} = req.body;
  
        // Get the filename of the uploaded image (if any)
        const photo = req.file ? req.file.filename : null;
  
        // Create a new student
        const newStudent = await Student.create({
          username,
          name,
          surname,
          email,
          phone,
          address,
          img: photo, // Store the filename of the uploaded image
          bloodType,
          sex,
          birthday,
          parentId,
          classId,
          gradeId,
        });
  
        res.status(201).json(newStudent);
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
  
    addStudentWithMultipleImages: async (req, res, next) => {
      try {
        const { username, name, surname, email, phone, address, bloodType, sex, birthday,parentId,classId, gradeId, } = req.body;
    
        // Get filenames of all uploaded images
        const photos = req.files ? req.files.map(file => file.filename) : [];
    
        // Create a new student
        const newStudent = await Student.create({
          username,
          name,
          surname,
          email,
          phone,
          address,
          img: photos, // Store array of filenames
          bloodType,
          sex,
          birthday,
          parentId,
          classId,
          gradeId,
        });
    
        res.status(201).json(newStudent);
      } catch (error) {
        console.error(error);
        next(error);
      }
    },
    

  // Get all students
  getAllStudents: async (req, res, next) => {
    try {
      const students = await Student.findAll({
        include: [
          {
            model: Parent,
            as: 'parent',
            attributes: ['id', 'name', 'surname', 'email', 'phone'],
          },
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'],
          },
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name', 'description'],
          },
        ],
      });

      res.status(200).send(students);
    } catch (error) {
      next(error);
    }
  },

  // Get a single student by ID
  getStudent: async (req, res, next) => {
    try {
      const { studentId } = req.params;

      const student = await Student.findOne({
        where: { id: studentId },
        include: [
          {
            model: Parent,
            as: 'parent',
            attributes: ['id', 'name', 'surname', 'email', 'phone'],
          },
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'],
          },
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name', 'description'],
          },
          {
            model: Result,
            attributes: ['id', 'subject', 'score', 'remarks'],
          },
          {
            model: Attendance,
            attributes: ['id', 'date', 'status'],
          },
        ],
      });

      if (!student) {
        throw createError(404, 'Student not found');
      }

      res.status(200).send(student);
    } catch (error) {
      next(error);
    }
  },

// Update a student
updateStudent: async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const {
      username,
      name,
      surname,
      email,
      phone,
      address,
      bloodType,
      sex,
      birthday,
      parentId,
      classId,
      gradeId,
    } = req.body;

    // Determine if single or multiple files are uploaded
    let photo = null;
    let photos = [];

    // If it's a single file upload
    if (req.file) {
      photo = req.file.filename; // Single file
    }

    // If it's a multiple file upload
    if (req.files && req.files.length > 0) {
      photos = req.files.map((file) => file.filename); // Array of filenames
    }

    // Update the student record
    const [updated] = await Student.update(
      {
        username,
        name,
        surname,
        email,
        phone,
        address,
        img: photo || photos[0] || undefined, // Use the first uploaded photo for the `img` field
        bloodType,
        sex,
        birthday,
        parentId,
        classId,
        gradeId,
      },
      { where: { id: studentId } }
    );

    if (updated === 0) {
      throw createError(404, 'Student not found or no changes made');
    }

    // Fetch the updated student record
    const updatedStudent = await Student.findOne({
      where: { id: studentId },
    });

    // Add the uploaded image(s) to the response (optional)
    updatedStudent.imgs = photos.length > 0 ? photos : photo;

    res.status(200).send(updatedStudent);
  } catch (error) {
    next(error);
  }
},



  // Delete a student
  deleteStudent: async (req, res, next) => {
    try {
      const { studentId } = req.params;

      const deleted = await Student.destroy({ where: { id: studentId } });

      if (!deleted) {
        throw createError(404, 'Student not found');
      }

      res.status(200).send({ message: `Student with ID ${studentId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },

  // Get all students with detailed relationships
  getAllStudentsWithDetails: async (req, res, next) => {
    try {
      const students = await Student.findAll({
        include: [
          {
            model: Parent,
            as: 'parent',
            attributes: ['id', 'name', 'surname', 'email', 'phone'],
          },
          {
            model: Class,
            as: 'class',
            attributes: ['id', 'name', 'capacity'],
          },
          {
            model: Grade,
            as: 'grade',
            attributes: ['id', 'name', 'description'],
          },
          {
            model: Result,
            attributes: ['id', 'subject', 'score', 'remarks'],
          },
          {
            model: Attendance,
            attributes: ['id', 'date', 'status'],
          },
        ],
      });

      res.status(200).send(students);
    } catch (error) {
      next(error);
    }
  },
};
