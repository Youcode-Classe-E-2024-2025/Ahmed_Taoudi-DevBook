document.getElementById("category-add-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("category-name").value.trim();

    if (!name) {
      alert("Please enter a category name.");
      return;
    }

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();
    alert(data.message || "Category added!");
  });

document.getElementById("book-add-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const image = document.getElementById("image").files[0];
    const category_id = document.getElementById("category_id").value;
    const date_publication = document.getElementById("date_publication").value;

    if (!title || !category_id) {
      alert("Please fill in required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("image", image);
    formData.append("category_id", category_id);
    formData.append("date_publication", date_publication);

    const res = await fetch("/api/books", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Book added!");
  });

async function loadCategories() {
  const select = document.getElementById("category_id");

  try {
    const res = await fetch("/api/categories");
    const categories = await res.json();

    select.innerHTML = "";
    
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat.id;
      option.textContent = cat.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Error loading categories:", err);
    select.innerHTML = `<option value="">Failed to load categories</option>`;
  }
}

document.addEventListener("DOMContentLoaded", loadCategories);
