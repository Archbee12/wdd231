document.addEventListener('DOMContentLoaded', () => {
    const courseCards = document.getElementById('courses-details'); // Where cards go
    const courseModal = document.getElementById('courseModal'); // Modal

    let selectedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];

    if (!selectedCourses.length) {
        courseCards.innerHTML = `<p class='error'>No registered courses found.</p>`;
        return;
    }

    selectedCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');

        card.innerHTML = `
            <div class="courses">
                <div class="course">
                    <h4>${course.title}</h4>
                </div>
                <div class="tooltip">${course.title}</div>
            </div>
            <p>${course.code} - ${course.subject}</p>
        `;

        card.addEventListener('click', () => {
            showModal(course);
        });

        courseCards.appendChild(card);
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
        `;

        courseModal.showModal();

        document.getElementById('closeModal').addEventListener('click', () => {
            courseModal.close();
        });
    }
});
