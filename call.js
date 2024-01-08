let currentYear;

function generateCalendar() {
  const yearInput = document.getElementById('year');
  const year = parseInt(yearInput.value);

  if (isNaN(year) || year < 1900 || year > 2100) {
    alert('Please enter a valid year (1900-2100).');
    return;
  }

  currentYear = year;

  const calendarContainer = document.getElementById('calendarContainer');
  calendarContainer.innerHTML = '';

  for (let month = 0; month < 12; month++) {
    const monthCalendar = createMonthCalendar(currentYear, month);
    calendarContainer.appendChild(monthCalendar);
  }
}

function navigate(direction) {
  if (direction === 'back' && currentYear > 1900) {
    currentYear--;
    document.getElementById('year').value = currentYear;
    generateCalendar();
  }
}

function createMonthCalendar(year, month) {
  const monthContainer = document.createElement('div');
  monthContainer.classList.add('month');

  const monthHeader = document.createElement('h3');
  monthHeader.textContent = getMonthName(month) + ' ' + year;
  monthContainer.appendChild(monthHeader);

  const table = document.createElement('table');
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let dayCounter = 1;

  // Create the header row
  const headerRow = document.createElement('tr');
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (const dayName of dayNames) {
    const dayCell = document.createElement('th');
    dayCell.textContent = dayName;
    headerRow.appendChild(dayCell);
  }

  table.appendChild(headerRow);

  // Create the calendar days
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');

      if ((i === 0 && j < firstDay) || dayCounter > daysInMonth) {
        cell.textContent = '';
      } else {
        cell.textContent = dayCounter;

        const currentDate = new Date();
        if (
          year === currentDate.getFullYear() &&
          month === currentDate.getMonth() &&
          dayCounter === currentDate.getDate()
        ) {
          cell.classList.add('current-date');
        }

        dayCounter++;
      }

      row.appendChild(cell);
    }

    table.appendChild(row);
  }

  monthContainer.appendChild(table);

  return monthContainer;
}

function getMonthName(month) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return months[month];
}
