const baseUrl = 'https://your-deployed-json-server.glitch.me/books/';
const loginData = JSON.parse(localStorage.getItem('loginData'));

if (!loginData || loginData.email !== 'admin@empher.com') {
  alert('Admin Not Logged In');
  window.location.href = 'index.html';
}

document.getElementById('addBookForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const book = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    category: document.getElementById('category').value,
    isAvailable: true,
    isVerified: false,
    borrowedDays: null,
    imageUrl: 'https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg',
  };

  await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  alert('Book Added Successfully!');
  loadBooks();
});

async function loadBooks() {
  const response = await fetch(baseUrl);
  const books = await response.json();
  const grid = document.getElementById('booksGrid');
  grid.innerHTML = books
    .map(
      (book) => `
      <div class="card">
        <img src="${book.imageUrl}" alt="Book Image">
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <button onclick="verifyBook(${book.id})" ${
        book.isVerified ? 'disabled' : ''
      }>Verify Book</button>
        <button onclick="deleteBook(${book.id})">Delete Book</button>
      </div>`
    )
    .join('');
}

async function verifyBook(id) {
  if (confirm('Are you sure to Verify..?')) {
    await fetch(`${baseUrl}${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isVerified: true }),
    });
    loadBooks();
  }
}

async function deleteBook(id) {
  if (confirm('Are you sure to Delete..?')) {
    await fetch(`${baseUrl}${id}`, { method: 'DELETE' });
    loadBooks();
  }
}

loadBooks();
