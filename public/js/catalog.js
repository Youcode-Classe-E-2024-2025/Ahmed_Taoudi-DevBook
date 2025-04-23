document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.querySelector(".grid");
  
    try {
      const res = await fetch("/api/books");
      const books = await res.json();
  
      if (!Array.isArray(books)) throw new Error("Books data is invalid");
  
      grid.innerHTML = "";
  
      books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.className = "bg-white shadow-md rounded-lg overflow-hidden";
  
        const imageUrl = book.image ? book.image : "https://img.atom.com/story_images/visual_images/logo-image-83411-devbook.jpg";
        const status = "Available";
  
        bookCard.innerHTML = `
          <img src="${imageUrl}" alt="${book.title}" class="w-full h-48 object-cover" />
          <div class="p-4">
            <h3 class="text-lg font-semibold text-blue-600">${book.title}</h3>
            <p class="text-sm text-gray-600">${book.author || "Unknown Author"}</p>
            <p class="text-sm text-gray-500 mt-2">Published: ${book.date_publication || "N/A"}</p>
            <p class="text-sm font-semibold text-green-600 mt-4">${status}</p>
            <div class="mt-4 flex justify-between">
              <a href="#" class="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">View Details</a>
              <a href="#" class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition">Borrow</a>
            </div>
          </div>
        `;
  
        grid.appendChild(bookCard);
      });
    } catch (err) {
      console.error("Failed to load books:", err);
      grid.innerHTML = `<p class="text-red-500 col-span-full text-center">Failed to load books.</p>`;
    }
  });
  