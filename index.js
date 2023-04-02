const table = document.querySelector('table');
const buttons = table.querySelectorAll('button');

// Fetch movie data from server and populate table
fetch('http://localhost:3000/films')
  .then(response => response.json())
  .then(data => {
    data.forEach(movie => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td><img src="${movie.poster}" alt="Poster"></td>
        <td>${movie.runtime}</td>
        <td>${movie.showtime}</td>
        <td>${movie.availableTickets}</td>
        <td><button class="button buy">Buy Ticket</button></td>
        <td><button class="button delete">Delete</button></td>
      `;

      table.appendChild(row);
    });

    // Add event listeners to buttons
    buttons.forEach(button => {
      if (button.classList.contains('buy')) {
        button.addEventListener('click', () => {
          const row = button.parentNode.parentNode;
          const id = row.querySelector('td').textContent;
          const availableTickets = row.querySelectorAll('td')[5];

          fetch(`http://localhost:3000/films`/${id}`, { method: 'POST' })
            .then(response => response.json())
            .then(data => {
              availableTickets.textContent = data.availableTickets;
            });
        });
      } else if (button.classList.contains('delete')) {
        button.addEventListener('click', () => {
          const row = button.parentNode.parentNode;
          const id = row.querySelector('td').textContent;

          fetch(`http://localhost:3000/films/${id}`, { method: 'DELETE' })
            .then(response => {
              if (response.status === 204) {
                row.remove();
              }
            });
        });
      }
    });
  });
