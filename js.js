function sds(button) {
    if(button.style.backgroundColor == 'green')
    button.style.backgroundColor = '#008CBA';
    else 
    button.style.backgroundColor = 'green';
}

function sds2(button) {
    if(button.style.backgroundColor == 'green')
    button.style.backgroundColor = '#008CBA';
    else 
    button.style.backgroundColor = 'green';
}

function formatMonth(date) {
    const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return monthNames[date.getMonth()];
  }
  
  function formatWeekday(date) {
    const weekdayNames = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return weekdayNames[date.getDay()];
  }
  
  function displayDates() {
    let currentDate = new Date();
  
    for (let i = 2; i <= 8; i++) {
      const cell = document.getElementById(`cell${i}`);
      const formattedDate = `${currentDate.getDate()} ${formatMonth(currentDate)}  ${formatWeekday(currentDate)}`;
      cell.textContent = formattedDate;
  
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  
  displayDates();

  let selectedSum = 0;
  function sds2(button) {
    button.classList.toggle("active");
    if (button.classList.contains("active")) {
      button.style.backgroundColor = "green";
    } else {
      button.style.backgroundColor = "#008CBA";
    }
    let time = button.parentElement.parentElement.firstElementChild.textContent;
    let endTime = calculateEndTime(time);
    let date = document.getElementById("cell2").textContent;
  
    if (button.classList.contains("active")) {
      selectedSum += 1200;
    } else {
      selectedSum -= 1200;
    }
  
    let selectedTimes =
      document.querySelectorAll(".table button.active").length > 0
        ? Array.from(document.querySelectorAll(".table button.active")).map(
            (button) => {
              return `${button.parentElement.parentElement.firstElementChild.textContent} до ${calculateEndTime(
                button.parentElement.parentElement.firstElementChild.textContent
              )};`;
            }
          ).join(", ")
        : "не выбрано";
  
    document.querySelector("#result").innerHTML =
      `Время: ${selectedTimes} <br> Дата: ${date} <br> Сумма: ${selectedSum} руб.;`;
  
    const confirmButton = document.createElement("button");
    confirmButton.classList.add("confirm-button");
    confirmButton.textContent = "Забронировать";
    confirmButton.addEventListener("click", () => {
      const popup = document.createElement("div");
      popup.classList.add("popup");
  
      const popupForm = document.createElement("form");
      popupForm.classList.add("popup-form");
  
      const nameInput = document.createElement("input");
      nameInput.classList.add("popup-input");
      nameInput.type = "text";
      nameInput.placeholder = "Фамилия Имя";
  
      const phoneInput = document.createElement("input");
      phoneInput.classList.add("popup-input");
      phoneInput.type = "tel";
      phoneInput.placeholder = "Телефон";
  
      const submitButton = document.createElement("button");
      submitButton.classList.add("submit-button");
      submitButton.textContent = "Отправить";
      submitButton.type = "submit";
  
      popupForm.appendChild(nameInput);
      popupForm.appendChild(phoneInput);
      popupForm.appendChild(submitButton);
  
      const closeButton = document.createElement("button");
      closeButton.classList.add("close-button");
      closeButton.textContent = "×";
      closeButton.addEventListener("click", () => {
        popup.remove();
      });
  
      popup.appendChild(closeButton);
      popup.appendChild(popupForm);
      document.body.appendChild(popup);
  
      popupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const phone = phoneInput.value;
  
        if (name && phone) {
          alert("Ожидайте подтверждения заявки");
          popup.remove();
          handleConfirmation(); // Вызов функции для изменения кнопок
        } else {
          alert("Пожалуйста, заполните все поля");
        }
      });
    });
  
    function handleConfirmation() {
      const selectedButtons = document.querySelectorAll(".table button.active");
      selectedButtons.forEach(button => {
        button.textContent = "Забронировано";
        button.style.backgroundColor = "gray";
      });
    }
  
    document.querySelector("#result").appendChild(confirmButton);
  }
  
  function calculateEndTime(startTime) {
    let [hours, minutes] = startTime.split(":").map(Number);
    let endTime = new Date(0, 0, 0, hours, minutes + 30);
    return endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
