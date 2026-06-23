document.addEventListener('DOMContentLoaded', () => {
  const monthName = document.querySelector('.calendar-month');
  const yearName = document.querySelector('.calendar-year');
  const daysContainer = document.querySelector('.calendar-days');
  const prevButton = document.querySelector('.calendar-prev');
  const nextButton = document.querySelector('.calendar-next');

  if (!monthName || !yearName || !daysContainer || !prevButton || !nextButton) {
    return;
  }

  const today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  const events = [
    { date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-05`, title: 'Opening Reception' },
    { date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-14`, title: 'Family Program' },
    { date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-21`, title: 'Guided Tour' },
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function renderCalendar(month, year) {
    monthName.textContent = monthNames[month];
    yearName.textContent = year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevDaysInMonth = new Date(year, month, 0).getDate();

    daysContainer.innerHTML = '';

    const createRow = () => {
      const row = document.createElement('tr');
      daysContainer.appendChild(row);
      return row;
    };

    let currentRow = createRow();

    const appendCell = (cell) => {
      currentRow.appendChild(cell);
      if (currentRow.children.length === 7) {
        currentRow = createRow();
      }
    };

    for (let i = firstDay; i > 0; i--) {
      const emptyDay = document.createElement('td');
      emptyDay.classList.add('inactive');
      emptyDay.textContent = prevDaysInMonth - i + 1;
      appendCell(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      if (currentRow.children.length === 7) {
        currentRow = createRow();
      }

      const cell = document.createElement('td');
      const dayNumber = document.createElement('div');
      dayNumber.className = 'day-number';
      dayNumber.textContent = day;
      cell.appendChild(dayNumber);

      const isoDay = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const eventItem = events.find((event) => event.date === isoDay);
      if (eventItem) {
        cell.classList.add('event');
        cell.setAttribute('title', eventItem.title);
      }

      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      if (isToday) {
        cell.classList.add('today');
      }

      appendCell(cell);
    }

    while (currentRow.children.length > 0 && currentRow.children.length < 7) {
      const emptyDay = document.createElement('td');
      emptyDay.classList.add('inactive');
      appendCell(emptyDay);
    }
  }

  prevButton.addEventListener('click', () => {
    currentMonth -= 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
    renderCalendar(currentMonth, currentYear);
  });

  nextButton.addEventListener('click', () => {
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    renderCalendar(currentMonth, currentYear);
  });

  renderCalendar(currentMonth, currentYear);
});