document.addEventListener("DOMContentLoaded", async () => {
    const bookList = document.getElementById("book-list");
    const deleteModal = document.getElementById("delete-modal");
    const confirmDelete = document.getElementById("confirm-delete");
    const cancelDelete = document.getElementById("cancel-delete");
  
    const editModal = document.getElementById("edit-modal");
    const editForm = document.getElementById("edit-book-form");
    const cancelEdit = document.getElementById("cancel-edit");
  
    // Edit form f
    const editId = document.getElementById("edit-id");
    const editTitle = document.getElementById("edit-title");
    const editAuthor = document.getElementById("edit-author");
    const editDate = document.getElementById("edit-date");
    const editCategory = document.getElementById("edit-category");
  
    let bookToDelete = null;
  
    const fetchBooks = async () => {
      const res = await fetch("/api/books");
      const books = await res.json();
      bookList.innerHTML = "";
  
      books.forEach((book) => {
        const div = document.createElement("div");
        div.className = "bg-white rounded-lg shadow p-4";
        const image = book.image || "https://img.atom.com/story_images/visual_images/logo-image-83411-devbook.jpg";
  
        div.innerHTML = `
          <img src="${image}" alt="${book.title}" class="w-full h-40 object-cover rounded-md mb-4" />
          <h3 class="text-lg font-bold text-blue-600">${book.title}</h3>
          <p class="text-sm text-gray-600">${book.author || "Unknown Author"}</p>
          <p class="text-xs text-gray-500 mt-1">Published: ${book.date_publication || "N/A"}</p>
          <div class="mt-4 flex justify-between">
            <button data-id="${book.id}" class="edit-btn text-blue-600 hover:underline text-sm">Edit</button>
            <button data-id="${book.id}" class="delete-btn text-red-500 hover:underline text-sm">Delete</button>
          </div>
        `;
  
        bookList.appendChild(div);
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          bookToDelete = e.target.dataset.id;
          deleteModal.classList.remove("hidden");
        });
      });
  
      confirmDelete.addEventListener("click", async () => {
        if (!bookToDelete) return;
        await fetch(`/api/books/${bookToDelete}`, { method: "DELETE" });
        deleteModal.classList.add("hidden");
        fetchBooks();
      });
  
      cancelDelete.addEventListener("click", () => {
        deleteModal.classList.add("hidden");
        bookToDelete = null;
      });

      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const id = e.target.dataset.id;
          const res = await fetch(`/api/books/${id}`);
          const book = await res.json();
  

          editId.value = book.id;
          editTitle.value = book.title;
          editAuthor.value = book.author || "";

          editDate.value = book.date_publication 
          ? new Date(book.date_publication).toISOString().split("T")[0] : "";

          editCategory.value = book.category_id;
  
          editModal.classList.remove("hidden");
        });
      });
  
      cancelEdit.addEventListener("click", () => {
        editModal.classList.add("hidden");
      });
  
      editForm.addEventListener("submit", async (e) => {
        e.preventDefault();
  
        const id = editId.value;
        const body = {
          title: editTitle.value,
          author: editAuthor.value,
          date_publication: editDate.value,
          category_id: editCategory.value
        };
  
        await fetch(`/api/books/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
  
        editModal.classList.add("hidden");
        fetchBooks(); 
      });
    };
  
    fetchBooks(); 
  });
  