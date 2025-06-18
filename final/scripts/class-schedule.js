import { fetchCourses, displayCourses } from './course-utils.js';

document.addEventListener('DOMContentLoaded', async () => {
    const courseCards = document.getElementById('courses-details'); 
    const courseModal = document.getElementById('courseModal');
    const addCoursesBtn = document.querySelector('.button-card .button:nth-child(1) button');
    const dropCoursesBtn = document.querySelector('.button-card .button:nth-child(2) button');

  dropCoursesBtn.addEventListener('click', () => {
    window.location.href = "course-selection.html"; // Redirect to selection page
  });

    let courses = await fetchCourses();
    let selectedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];

    // Ensure the first 3 courses are stored in localStorage
    if (selectedCourses.length === 0) {
        selectedCourses = courses.slice(0, 3);
        localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
    }

    displayCourses(courseCards, selectedCourses, showModal);

    addCoursesBtn.addEventListener('click', () => {
        window.location.href = "course-selection.html";
    });

    function showModal(course) {
        courseModal.innerHTML = `
            <div class="heading">
                <div class="title">
                    <h3>${course.title}</h3> 
                </div>
                <div class="button">
                    <button id="closeModal">❌</button>
                </div>
            </div>
            <p><strong>Course Code:</strong> ${course.code}</p>
            <p><strong>Description:</strong> ${course.description}</p>
            <p><strong>Subject:</strong> ${course.subject}</p>
            <p><strong>Prerequisites:</strong> ${course.prerequisites}</p>
            <p><strong>Credits:</strong> ${course.credits}</p>
        `;

        courseModal.showModal();

        document.getElementById('closeModal').addEventListener('click', () => {
            courseModal.close();
        });
    }
});