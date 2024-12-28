const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'admin@empher.com' && password === 'empher@123') {
    alert('Logged in as Admin.');
    localStorage.setItem('loginData', JSON.stringify({ email, role: 'admin' }));
    window.location.href = 'admin.html';
  } else if (email === 'user@empher.com' && password === 'user@123') {
    alert('Logged in as User.');
    localStorage.setItem('loginData', JSON.stringify({ email, role: 'user' }));
    window.location.href = 'books.html';
  } else {
    document.getElementById('errorMessage').textContent = 'Invalid credentials!';
  }
});

document.getElementById('addBookForm').addEventListener('submit', (e) => {
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
    fetch('https://<your-glitch-endpoint>/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    }).then(() => alert('Book Added Successfully'));
  });
  
  document.getElementById('showAvailableBooks').addEventListener('click', () => {
    fetch('https://<your-glitch-endpoint>/books?isAvailable=true')
      .then((res) => res.json())
      .then((books) => displayBooks(books));
  });
  
  function displayBooks(books) {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = books
      .map(
        (book) => `
      <div>
        <img src="${book.imageUrl}" alt="${book.title}" />
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.category}</p>
        <button>Borrow</button>
      </div>`
      )
      .join('');
  }
  