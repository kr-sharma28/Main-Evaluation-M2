function createNavbar() {
    const navbar = `
      <nav>
        <a href="index.html">Home</a>
        <a href="admin.html">Admin</a>
        <a href="books.html">Books</a>
      </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', navbar);
  }
  createNavbar();
  