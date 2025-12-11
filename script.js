/* ===== RANDOM CATEGORY LOGIC FOR SPECIALS TILE ===== */

// This function chooses a random item from an array
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Set a safe fallback in case fetch fails
window.randomCategoryShortName = "SP";

// Fetch categories from Firebase, then pick a random category short_name
fetch(allCategoriesUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Convert object → array if needed
    var categories = Array.isArray(data) ? data : Object.values(data);

    // Filter only categories that have short_name
    var validCategories = categories.filter(function (cat) {
      return cat && cat.short_name;
    });

    // If we found valid categories, pick one randomly
    if (validCategories.length > 0) {
      var randomCat = pickRandom(validCategories);
      window.randomCategoryShortName = randomCat.short_name;
    }

    // IMPORTANT:
    // Your page will render AFTER this script loads,
    // so randomCategoryShortName will be ready before
    // home-snippet.html is injected.
  })
  .catch(function (error) {
    console.error("Error fetching categories:", error);
    // Fallback short_name stays "SP"
  });

/* ===== END RANDOM CATEGORY LOGIC ===== */
