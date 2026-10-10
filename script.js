// Open and close the navigation menu on small screens.
const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");

menuButton.addEventListener("click", function () {
  const menuIsOpen = siteNavigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", menuIsOpen);
  menuButton.setAttribute("aria-label", menuIsOpen ? "Close menu" : "Open menu");
  menuButton.textContent = menuIsOpen ? "×" : "☰";
});

// Let readers add or remove a heart from each story.
const likeButtons = document.querySelectorAll(".like-button");

likeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const isLiked = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", !isLiked);
    button.querySelector("span:first-child").textContent = isLiked ? "♡" : "♥";
    button.querySelector(".like-label").textContent = isLiked ? "Give this a heart" : "You gave this a heart";
  });
});

// Show a friendly message when a reader enters an email address.
const newsletterForm = document.querySelector(".newsletter-form");
const formMessage = document.querySelector(".form-message");

if (newsletterForm && formMessage) {
  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "You’re on the list. See you in your inbox!";
    newsletterForm.reset();
  });
}

// Keep the copyright year up to date automatically.
document.querySelector("#year").textContent = new Date().getFullYear();

// Add selected photos and videos to the top of the post list.
const addPostForm = document.querySelector("#add-post-form");
const postMediaInput = document.querySelector("#post-media");
const postCaptionInput = document.querySelector("#post-caption");
const postList = document.querySelector(".story-grid");
const postMessage = document.querySelector("#post-message");

const spotlightTitle = document.querySelector("#spotlight-title");
const spotlightText = document.querySelector("#spotlight-text");
const filterButtons = document.querySelectorAll(".filter-button");
const foodStories = document.querySelectorAll(".story");
const bookingForm = document.querySelector("#booking-form");
const bookingMessage = document.querySelector(".booking-message");

const spotlightContent = {
  all: {
    title: "Everything on the table",
    text: "Explore warm pasta, sweet treats, and cozy comfort meals with a little flavor in every bite."
  },
  pasta: {
    title: "Pasta favorites",
    text: "Rich sauces, tender noodles, and fresh herbs bring a comforting, satisfying finish to any dinner table."
  },
  dessert: {
    title: "Sweet little moments",
    text: "Golden bakes, soft cakes, and sugar-kissed treats for slow mornings, celebrations, and after-dinner cravings."
  },
  comfort: {
    title: "Comfort food classics",
    text: "Warm soups, savory bowls, and nostalgic favorites designed to feel like home in every spoonful."
  },
  fresh: {
    title: "Fresh and vibrant bites",
    text: "Bright greens, crisp textures, and citrusy flavors make clean, nourishing meals feel exciting and easy."
  }
};

if (filterButtons.length && spotlightTitle && spotlightText) {
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedType = button.dataset.foodType;

      filterButtons.forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });

      spotlightTitle.textContent = spotlightContent[selectedType].title;
      spotlightText.textContent = spotlightContent[selectedType].text;

      foodStories.forEach(function (story) {
        const matches = selectedType === "all" || story.dataset.foodType === selectedType;
        story.classList.toggle("is-hidden", !matches);
      });
    });
  });
}

if (bookingForm && bookingMessage) {
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const guestName = formData.get("guestName");
    const date = formData.get("date");
    const time = formData.get("time");
    const guests = formData.get("guests");

    bookingMessage.textContent = `Booked for ${guestName} on ${date} at ${time} for ${guests}. We’ll keep your table ready.`;
    bookingForm.reset();
  });
}

if (addPostForm && postMediaInput && postCaptionInput && postList && postMessage) {
  addPostForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedFiles = postMediaInput.files;
    const caption = postCaptionInput.value.trim();

    for (const file of selectedFiles) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        continue;
      }

      const post = document.createElement("article");
      post.className = "story user-post";
      post.dataset.foodType = "fresh";

      const media = document.createElement(isVideo ? "video" : "img");
      media.className = "user-post-media";
      media.src = URL.createObjectURL(file);

      if (isVideo) {
        media.controls = true;
      } else {
        media.alt = caption || "Food photo added to the blog";
      }

      const title = document.createElement("h3");
      title.textContent = caption || file.name;

      post.append(media, title);
      postList.prepend(post);
    }

    postMessage.textContent = selectedFiles.length + " post(s) added for this session.";
    addPostForm.reset();
  });
}
