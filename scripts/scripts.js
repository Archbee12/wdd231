const courses = [
	{
		subject: 'CSE',
		number: 110,
		title: 'Introduction to Programming',
		credits: 2,
		certificate: 'Web and Computer Programming',
		description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
		technology: ['Python'],
		completed: true // Completed
	},
	{
		subject: 'WDD',
		number: 130,
		title: 'Web Fundamentals',
		credits: 2,
		certificate: 'Web and Computer Programming',
		description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
		technology: ['HTML', 'CSS'],
		completed: true // Completed
	},
	{
		subject: 'CSE',
		number: 111,
		title: 'Programming with Functions',
		credits: 2,
		certificate: 'Web and Computer Programming',
		description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
		technology: ['Python'],
		completed: true // Completed
	},
	{
		subject: 'CSE',
		number: 210,
		title: 'Programming with Classes',
		credits: 2,
		certificate: 'Web and Computer Programming',
		description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
		technology: ['C#'],
		completed: true // Completed
	},
	{
		subject: 'WDD',
		number: 131,
		title: 'Dynamic Web Fundamentals',
		credits: 2,
		certificate: 'Web and Computer Programming',
		description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
		technology: ['HTML', 'CSS', 'JavaScript'],
		completed: true, // Marked as completed 
	},
	{
		subject: 'WDD',
		number: 231,
		title: 'Frontend Web Development I',
		credits: 2,
		certificate: 'Web and Computer Programming',
		description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
		technology: ['HTML', 'CSS', 'JavaScript'],
		completed: false // Not completed
	}
];

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('nav ul');

document.addEventListener("DOMContentLoaded", () => {
	hamburger.addEventListener('click', () => {
		navLinks.classList.toggle('show');
		hamburger.classList.toggle('active');
	});

	const courseButtons = document.getElementById("course-cards");
	const filters = document.querySelectorAll(".course-filters button");
	const creditDisplay = document.createElement("p");
	creditDisplay.id = "credit-display";
	document.querySelector(".course-filters").after(creditDisplay);
	// courseButtons.parentElement.appendChild(creditDisplay);

	// Function to display courses
	const displayCourses = (filter) => {
		courseButtons.innerHTML = ""; // Clear previous courses
		const filteredCourses = courses.filter(course =>
			filter === "all" ? true : course.subject === filter
		);

		// Calculate total credits
		const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
		creditDisplay.textContent = `Total Credits: ${totalCredits}`;

		// Create course cards
		// filteredCourses.forEach(course => {
		// 	const card = document.createElement("div");
		// 	card.className = `course-card ${course.completed ? "completed" : "not-completed"}`;
		// 	card.innerHTML = `
		// 						<h3>${course.subject} ${course.number}</h3>
		// 						<p>Credits required: ${course.credits}</p>
		// 				`;
		// 	courseButtons.appendChild(card);
		// });
	};

	// Initial display
	displayCourses("all");

	// // Filter functionality
	// filters.forEach(filter => {
	// 	filter.addEventListener("click", (event) => {
	// 		const filterType = event.target.getAttribute("data-filter");
	// 		displayCourses(filterType);
	// 	});
	// });
});

// Initial display on page load with filter functionality
document.addEventListener("DOMContentLoaded", () => {
  displayCourses();

  // Attach filter event listeners properly
  document.querySelectorAll(".course-filters button").forEach(filterBtn => {
    filterBtn.addEventListener("click", (event) => {
      const filterType = event.target.getAttribute("data-filter");
      displayCourses(filterType); // Reapply event listeners inside displayCourses()
    });
  });
});

const courseList = document.getElementById("course-list");

courses.forEach(course => {
	const listItem = document.createElement("li");
	listItem.textContent = course.title;
	courseList.appendChild(listItem);
})


//Last Modified Date and Time
const currentYear = document.querySelector("#currentYear");

// use the date object
const today = new Date();

currentYear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

let oLastModif = new Date(document.lastModified);
lastModified.innerHTML = `Last Modified: <span class="highlight">${new Intl.DateTimeFormat(
	"en-US",
	{
		dateStyle: "medium",
		timeStyle: "medium",
	}
).format(today)}</span>`;

//Dialog Modal Functionality
const courseDialog = document.getElementById("course-details");
const courseCardsContainer = document.getElementById("course-cards");


// Function to display the modal with course details and added completion status
function displayCourseDetails(course) {
	const completionStatus = course.completed ? "✅ You have completed this course!" : "❌ This course is not yet completed.";
  const dialogContent = `
		<div>
      <button id="closeDialog">❌</button>
      <h2>${course.subject} ${course.number}</h2>
      <h3>${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Certificate:</strong> ${course.certificate}</p>
      <p>${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology}</p>
			<p><strong>Completion Status: </strong> ${completionStatus}
    </div>
		`;

  courseDialog.innerHTML = dialogContent;

  document.getElementById("closeDialog").addEventListener("click", () => courseDialog.close());
  courseDialog.showModal();

	courseDialog.addEventListener('click', (e) => {
    if (e.target === courseDialog) {
      courseDialog.close();
    }
  });
}

// Function to display courses while keeping event listeners active
function displayCourses(filter = "all") {
  courseCardsContainer.innerHTML = ""; // Clear previous course cards

  const filteredCourses = courses.filter(course => filter === "all" ? true : course.subject === filter);

  filteredCourses.forEach(course => {
    const card = document.createElement("div");
    card.className = `course-card ${course.completed ? "completed" : "not-completed"}`;
    card.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      <p>Credits required: ${course.credits}</p>
    `;

    // Attach event listener directly inside the loop
    card.addEventListener("click", () => displayCourseDetails(course));

    courseCardsContainer.appendChild(card);
  });
}




