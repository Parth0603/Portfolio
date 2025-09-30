/**
 * =================================================================
 * DOM Element Selections
 *
 * Caching all necessary DOM elements into constants for easy access
 * and better performance.
 * =================================================================
 */
const homePage = document.querySelector(".homePage");
const backgroundHomePage = document.querySelector(".home-page");
const rightMenu = document.querySelector(".rightMenu");
const selectBackgroundMenu = document.querySelector(".selectBackground");
const backgroundOption = document.querySelector(".background");
const inputImage = document.getElementById("inputImage");
const refreshButton = document.querySelector(".refresh");
const desktopIcons = document.querySelectorAll(".links");
const doubleClickIcons = document.getElementsByClassName("doubleClick");
const projectPage = document.querySelector(".projects-page");
const skillPage = document.querySelector(".skills-page");
const maximizeButtons = document.querySelectorAll(".maximize");
const exitButtons = document.querySelectorAll(".exit");
// const dateTime=document.querySelector("date-time")
const hover = document.querySelector(".hover-effect");
const hoverDiv = document.querySelector(".hover-div");
const aboutpage = document.querySelector(".about-page");
const contactpage = document.querySelector(".contact-page");
// aboutpage animation

const observerOptions = {
	threshold: 0.1,
	rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.style.animationPlayState = "running";
		}
	});
}, observerOptions);

// Observe timeline items when page loads
document.addEventListener("DOMContentLoaded", () => {
	const timelineItems = document.querySelectorAll(".timeline-item");
	timelineItems.forEach((item) => {
		item.style.animationPlayState = "paused";
		observer.observe(item);
	});
});

// add a hover style info above taskbar when hover on name
hover.addEventListener("mouseenter", () => {
	hoverDiv.style.display = "block";
});
hover.addEventListener("mouseleave", () => {
	hoverDiv.style.display = "none";
});
hoverDiv.addEventListener("mouseenter", () => {
	hoverDiv.style.display = "block";
});
hoverDiv.addEventListener("mouseleave", () => {
	hoverDiv.style.display = "none";
});

// date and time menu in taskbar
function updateDateTime() {
	const now = new Date();
	const options = { year: "numeric", month: "short", day: "numeric" };
	const dateStr = now.toLocaleDateString(undefined, options);
	const timeStr = now.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
	document.getElementById("date").textContent = dateStr;
	document.getElementById("time").textContent = timeStr;
}
setInterval(updateDateTime, 1000); // Update every minute
// updateDateTime()
/**
 * =================================================================
 * Desktop Right-Click (Context Menu) Functionality
 *
 * Handles the appearance and disappearance of custom context menus.
 * =================================================================
 */

// Show the custom right-click menu
homePage.addEventListener("contextmenu", (event) => {
	// Prevent the default browser context menu from appearing
	event.preventDefault();

	// Position and display the custom menu at the cursor's location
	rightMenu.style.top = `${event.clientY}px`;
	rightMenu.style.left = `${event.clientX}px`;
	rightMenu.style.display = "flex";

	// Ensure other menus are hidden when the context menu is opened
	selectBackgroundMenu.style.display = "none";
	// Assuming 'customize' is another menu element, hide it as well.
	// const customize = document.querySelector('.customize'); // If it exists
	// if (customize) customize.style.display = "none";
});

// Hide all menus when clicking anywhere on the home page
homePage.addEventListener("click", () => {
	rightMenu.style.display = "none";
	selectBackgroundMenu.style.display = "none";
	// if (customize) customize.style.display = "none";
});

/**
 * =================================================================
 * Change Desktop Background Functionality
 *
 * Allows the user to select a local image file to set as the
 * desktop background.
 * =================================================================
 */

// When the 'Change Background' option is clicked, show the file input menu
backgroundOption.addEventListener("click", (e) => {
	selectBackgroundMenu.style.display = "flex";
	selectBackgroundMenu.style.top = `${e.clientY}px`;
	selectBackgroundMenu.style.left = `${e.clientX}px`;
	rightMenu.style.display = "none"; // Hide the main context menu
});

// When a new file is selected in the input
inputImage.addEventListener("change", function (event) {
	const file = event.target.files[0];

	if (file) {
		const reader = new FileReader();

		// After the file is read, set it as the background image
		reader.onload = function (e) {
			backgroundHomePage.style.backgroundImage = `url(${e.target.result})`;
			backgroundHomePage.style.backgroundSize = "cover";
			backgroundHomePage.style.backgroundPosition = "center";
		};

		// Read the image file as a Data URL
		reader.readAsDataURL(file);
	}
});

/**
 * =================================================================
 * Desktop Refresh Functionality
 *
 * Simulates a "refresh" by making icons disappear and reappear.
 * =================================================================
 */
refreshButton.addEventListener("click", () => {
	desktopIcons.forEach((icon) => {
		rightMenu.style.display = "none"; // Hide context menu on refresh
		icon.style.display = "none";

		// After a short delay, make the icon visible again
		setTimeout(() => {
			icon.style.display = "flex";
		}, 200);
	});
});

/**
 * =================================================================
 * Desktop Icon Double-Click Functionality
 *
 * Opens application "windows" (like Projects or Skills) when an
 * icon is double-clicked.
 * =================================================================
 */

let zindex = 100000000;

Array.from(doubleClickIcons).forEach((icon) => {
	icon.addEventListener("dblclick", () => {
		const iconName = icon.lastElementChild.textContent.trim();

		// Define the animation properties
		const openAnimation = {
			from: { x: -300, scale: 0.5, transformOrigin: "130px 130px" },
			to: { x: 0, scale: 1, duration: 0.5, transformOrigin: "130px 130px" },
		};

		// Check which icon was clicked and open the corresponding window
		if (iconName === "PROJECTS") {
			projectPage.classList.remove("hidden", "fullscreen");
			projectPage.style.zIndex = zindex++; // Bring to front
			gsap.fromTo(".projects-page", openAnimation.from, openAnimation.to);
		} else if (iconName === "SKILLS") {
			skillPage.style.display = "grid"; // Make it visible before animating
			// console.log(skillPage.style.zIndex);
			skillPage.classList.remove("fullscreen");
			skillPage.style.zIndex = zindex++; // Bring to front

			gsap.fromTo(".skills-page", openAnimation.from, openAnimation.to);
		} else if (iconName === "ABOUT") {
			aboutpage.style.display = "block"; // Make it visible before animating
			// console.log(skillPage.style.zIndex);
			aboutpage.classList.remove("fullscreen");
			aboutpage.style.zIndex = zindex++; // Bring to front

			gsap.fromTo(".about-page", openAnimation.from, openAnimation.to);
		}
		else if (iconName === "CONTACT") {
			contactpage.style.display = "block"; // Make it visible before animating
			// console.log(skillPage.style.zIndex);
			contactpage.classList.remove("fullscreen");
			contactpage.style.zIndex = zindex++; // Bring to front

			gsap.fromTo(".contact-page", openAnimation.from, openAnimation.to);
		}
	});
});

/**
 * =================================================================
 * Window Controls (Maximize and Exit)
 *
 * Manages the behavior of the maximize and exit buttons on the
 * application windows.
 * =================================================================
 */

// Maximize button functionality for all windows
Array.from(maximizeButtons).forEach((button) => {
	button.addEventListener("click", (e) => {
		console.log(projectPage);
		// Find the parent window of the clicked button
		const windowToMaximize = e.target.closest(
			".projects-page, .skills-page ,.about-page,.contact-page"
		);
		if (windowToMaximize) {
			windowToMaximize.style.borderRadius = "0";
			windowToMaximize.classList.toggle("fullscreen");
			windowToMaximize.style.zIndex = zindex + zindex;
		}
	});
});

// Exit button functionality for all windows
Array.from(exitButtons).forEach((button) => {
  button.addEventListener("click", (e) => {
    // Find the parent window of the clicked button
    const windowToClose = e.target.closest(".projects-page, .skills-page, .about-page,.contact-page");

    if (windowToClose) {
      const windowSelector = `.${windowToClose.className.split(" ")[0]}`;

      // Animate the window closing
      gsap.to(windowSelector, {
        x: -300,
        scale: 0,
        duration: 0.5,
        transformOrigin: "130px 130px",
        onComplete: () => {
          windowToClose.classList.add("hidden");

          // Reset display for specific pages
          if (windowSelector === ".skills-page" || windowSelector === ".about-page") {
            windowToClose.style.display = "none";
          }
        },
      });
    }
  });
});


/**
 * =================================================================
 * Automatic Image Slideshows
 *
 * Generic function to create self-running slideshows for any
 * number of slide groups.
 * =================================================================
 */

/**
 * Creates and starts an automatic slideshow for a given element class.
 * @param {string} slideClassName - The CSS class name of the slide elements.
 */
function createSlideshow(slideClassName) {
	let slideIndex = 0;
	const slides = document.getElementsByClassName(slideClassName);

	// If no slides with the given class exist, do nothing.
	if (slides.length === 0) {
		return;
	}

	function showNextSlide() {
		// Hide all slides
		for (let i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}

		// Increment index and loop back to 1 if it exceeds the number of slides
		slideIndex++;
		if (slideIndex > slides.length) {
			slideIndex = 1;
		}

		// Display the current slide
		slides[slideIndex - 1].style.display = "block";

		// Call this function again after 3 seconds
		setTimeout(showNextSlide, 3000);
	}

	// Start the slideshow
	showNextSlide();
}

// Initialize the slideshows for different sets of slides
createSlideshow("slide");
createSlideshow("slide-four");
