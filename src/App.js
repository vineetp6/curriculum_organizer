// CurriculumOrganizer.js
import React, { useState, useEffect } from 'react';
import './CurriculumOrganizer.css'; // Import CSS file for styling

function CurriculumOrganizer() {
  const [courses, setCourses] = useState([]);
  const [newCourseName, setNewCourseName] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedCourseName, setEditedCourseName] = useState('');

  useEffect(() => {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const addCourse = () => {
    if (newCourseName.trim() !== '') {
      setCourses([...courses, { name: newCourseName }]);
      setNewCourseName('');
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedCourseName(courses[index].name);
  };

  const saveEdit = () => {
    if (editedCourseName.trim() !== '') {
      const updatedCourses = [...courses];
      updatedCourses[editingIndex].name = editedCourseName;
      setCourses(updatedCourses);
      setEditingIndex(null);
    }
  };

  const deleteCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
    setEditingIndex(null); // Ensure editingIndex is reset if a course being edited is deleted
  };

  return (
    <div className="curriculum-organizer">
      <div className="background"></div>
      <div className="content">
        <h1>Curriculum Organizer</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter course name"
            value={newCourseName}
            onChange={(e) => setNewCourseName(e.target.value)}
          />
          <button className="add-button" onClick={addCourse}>Add Course</button>
        </div>
        <ul className="course-list">
          {courses.map((course, index) => (
            <li key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editedCourseName}
                    onChange={(e) => setEditedCourseName(e.target.value)}
                  />
                  <button className="save-button" onClick={saveEdit}>Save</button>
                </>
              ) : (
                <>
                  <span>{course.name}</span>
                  <div>
                    <button className="edit-button" onClick={() => startEditing(index)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteCourse(index)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CurriculumOrganizer;
