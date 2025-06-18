async function fetchCourses() {
    try {
        const response = await fetch('data/courses.json');
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading courses:', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const courseList = document.getElementById('courseList');
    const saveBtn = document.getElementById('saveCoursesBtn');

    let courses = await fetchCourses();
    let selectedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];

    console.log("Previously selected courses:", selectedCourses);

    if (!courses.length) {
        courseList.innerHTML = `<p class='error'>No courses available.</p>`;
        return;
    }

    // const courseModal = document.getElementById('courseModal');


    courses.forEach(course => {
        const isSelected = selectedCourses.some(c => c.code === course.code);
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-option');

        courseItem.innerHTML = `
            <div class="course-details">
                <div><h2>${course.subject} (${course.credits} credits)</h2></div>
                <div class=button-card>
                <button class="add-btn" ${isSelected ? 'disabled' : ''}>${isSelected ? "Added" : "Add"}</button>
                <button class="drop-btn" ${isSelected ? "" : "disabled"}>Drop</button>
                </div>
            </div>
        `;
    courseItem.addEventListener('click', (e) => {
        // prevent modal from opening when clicking a button
        if (!e.target.classList.contains('add-btn') && !e.target.classList.contains('drop-btn')) {
            showModal(course);
        }
    });

    // Add course functionality (prevent duplicates)
    courseItem.querySelector('.add-btn').addEventListener('click', () => {
        if (!selectedCourses.some(c => c.code === course.code)) {
            selectedCourses.push(course);
            localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
            
            // Toggle UI buttons
            courseItem.querySelector('.add-btn').textContent = "Added";
            courseItem.querySelector('.add-btn').disabled = true;
            courseItem.querySelector('.drop-btn').disabled = false;
        }
    });

        // Drop course functionality
        courseItem.querySelector('.drop-btn').addEventListener('click', () => {
            selectedCourses = selectedCourses.filter(c => c.code !== course.code);
            localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));

            // Toggle UI buttons
            courseItem.querySelector('.add-btn').textContent = "Add";
            courseItem.querySelector('.add-btn').disabled = false;
            courseItem.querySelector('.drop-btn').disabled = true;
        });

        courseList.appendChild(courseItem);
    });

    // Save and return to class-schedule
    saveBtn.addEventListener('click', () => {
        localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
        window.location.href = "class-schedule.html";
    });
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