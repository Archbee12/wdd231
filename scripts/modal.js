const courseDiv = document.getElementById('course-cards');
const courseDialog = document.getElementById('course-details');

function displayCourseDetails(course) {
	const dialogContent = `
		<div>
			<h2>${course.title}</h2>
			<p>${course.description}</p>
			<button id="closeDialog">X</button>
		</div>
	`;

	courseDialog.innerHTML = dialogContent;

	// Add event listener for the close button after inserting content
	document.querySelector("#closeDialog").addEventListener("click", () => courseDialog.close());

	courseDialog.showModal();
}

// Listen for clicks on course cards
courseDiv.addEventListener('click', (event) => {
	// Check if the clicked element is a course card
	if (event.target.classList.contains("course-card")) {
		const course = {
			title: event.target.dataset.title,
			description: event.target.dataset.description
		};

		displayCourseDetails(course);
	}
});