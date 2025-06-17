export async function fetchCourses() {
    try {
        const response = await fetch('data/courses.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // console.log("Fetched courses:", data);
        // return await(response);
        return await response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        return [];
    }
}

export function displayCourses(courseListElement, courses, showModalCallback) {
    courseListElement.innerHTML = ""; // Clear previous content

    courses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-container');

        card.innerHTML = `
          <div class="classes class-card">
            <div class="course-title">${course.subject}</div>
            <span class="status">
                <span class="status-icon">+</span>
                Registered
            </span>
            <div class="course-credits">${course.credits} Credit(s)</div>
          </div>
        `;

        // Attach modal behavior
        card.addEventListener('click', () => {
            showModalCallback(course);
        });

        courseListElement.appendChild(card);
    });
}