const db = require('../models/indexStart'); 
const createError = require('http-errors');

const Teacher = db.Teacher; 
const Class = db.Class; 
const Subject = db.Subject;
const Lesson = db.Lesson;

module.exports = {
  // Add a new teacher
  addTeacher: async (req, res, next) => {
    try {
      const { username, name, surname, email, phone, address, bloodType, sex, birthday } = req.body;
  
      // Get the filename of the uploaded image (if any)
      const photo = req.file ? req.file.filename : null;
  
      // Create a new teacher
      const newTeacher = await Teacher.create({
        username,
        name,
        surname,
        email,
        phone,
        address,
        img: photo, // Store the filename
        bloodType,
        sex,
        birthday,
      });
  
      res.status(201).json(newTeacher);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  addTeacherWithMultipleImages: async (req, res, next) => {
    try {
      const { username, name, surname, email, phone, address, bloodType, sex, birthday } = req.body;
  
      // Get filenames of all uploaded images
      const photos = req.files ? req.files.map(file => file.filename) : [];
  
      // Create a new teacher
      const newTeacher = await Teacher.create({
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
      });
  
      res.status(201).json(newTeacher);
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  
  

  // Get all teachers
  getAllTeachers: async (req, res, next) => {
    try {
      const teachers = await Teacher.findAll({
        include: [
          {
            model: Class,
            as: 'supervisedClasses', // Update the alias to 'supervisedClasses'
            attributes: ['id', 'name', 'capacity'],
          },
          {
            model: Subject,
            as: 'subjects', // Use the alias defined in the model
            attributes: ['id', 'name', 'description'],
          },
          {
            model: Lesson,
            as: 'lessons', // Use the alias defined in the model
            attributes: ['id', 'topic', 'date', 'duration'],
          },
        ],
      });
      res.status(200).send(teachers);
    } catch (error) {
      next(error);
    }
  },

  // Get a single teacher by ID
  getTeacher: async (req, res, next) => {
    try {
      const { teacherId } = req.params;

      const teacher = await Teacher.findOne({
        where: { id: teacherId },
        include: [
          {
            model: Class,
            as: 'supervisedClasses', // Use the alias defined in the model
            attributes: ['id', 'name', 'capacity'],
          },
          {
            model: Subject,
            as: 'subjects', // Use the alias defined in the model
            attributes: ['id', 'name', 'description'],
          },
          {
            model: Lesson,
            as: 'lessons', // Use the alias defined in the model
            attributes: ['id', 'topic', 'date', 'duration'],
          },
        ],
      });

      if (!teacher) {
        throw createError(404, 'Teacher not found');
      }

      res.status(200).send(teacher);
    } catch (error) {
      next(error);
    }
  },

// Update a teacher
updateTeacher: async (req, res, next) => {
  try {
    const { teacherId } = req.params;
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

    // Update the teacher record
    const [updated] = await Teacher.update(
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
      },
      { where: { id: teacherId } }
    );

    if (updated === 0) {
      throw createError(404, 'Teacher not found or no changes made');
    }

    // Fetch the updated teacher record with related models
    const updatedTeacher = await Teacher.findOne({
      where: { id: teacherId },
      include: [
        {
          model: Class,
          as: 'supervisedClasses',
          attributes: ['id', 'name', 'capacity'],
        },
        {
          model: Subject,
          as: 'subjects',
          attributes: ['id', 'name', 'description'],
        },
        {
          model: Lesson,
          as: 'lessons',
          attributes: ['id', 'topic', 'date', 'duration'],
        },
      ],
    });

    // Add the uploaded image(s) to the response (optional)
    updatedTeacher.imgs = photos.length > 0 ? photos : photo;

    res.status(200).send(updatedTeacher);
  } catch (error) {
    next(error);
  }
},


  // Delete a teacher
  deleteTeacher: async (req, res, next) => {
    try {
      const { teacherId } = req.params;

      const deleted = await Teacher.destroy({ where: { id: teacherId } });

      if (!deleted) {
        throw createError(404, 'Teacher not found');
      }

      res.status(200).send({ message: `Teacher with ID ${teacherId} has been deleted` });
    } catch (error) {
      next(error);
    }
  },

  // Get all teachers with their supervised classes, subjects, and lessons
  getAllTeachersWithDetails: async (req, res, next) => {
    try {
      const teachers = await Teacher.findAll({
        include: [
          {
            model: Class,
            as: 'supervisedClasses', // Use the alias defined in the model
            attributes: ['id', 'name', 'capacity'],
          },
          {
            model: Subject,
            as: 'subjects', // Use the alias defined in the model
            attributes: ['id', 'name', 'description'],
          },
          {
            model: Lesson,
            as: 'lessons', // Use the alias defined in the model
            attributes: ['id', 'topic', 'date', 'duration'],
          },
        ],
      });

      res.status(200).send(teachers);
    } catch (error) {
      next(error);
    }
  },

  // Get a specific teacher with their supervised classes, subjects, and lessons
  getTeacherWithDetails: async (req, res, next) => {
    try {
      const { teacherId } = req.params;

      const teacher = await Teacher.findOne({
        where: { id: teacherId },
        include: [
          {
            model: Class,
            as: 'supervisedClasses', // Use the alias defined in the model
            attributes: ['id', 'name', 'capacity'],
          },
          {
            model: Subject,
            as: 'subjects', // Use the alias defined in the model
            attributes: ['id', 'name', 'description'],
          },
          {
            model: Lesson,
            as: 'lessons', // Use the alias defined in the model
            attributes: ['id', 'topic', 'date', 'duration'],
          },
        ],
      });

      if (!teacher) {
        throw createError(404, 'Teacher not found');
      }

      res.status(200).send(teacher);
    } catch (error) {
      next(error);
    }
  },
};
