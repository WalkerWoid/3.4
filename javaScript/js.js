'use strict';

// Крестик в модальном окне
let closeButton = document.body.querySelector('.close_pw');
console.log(closeButton);

// Модальное окно
let containerPaymentWindow = document.querySelector('.parent_container_pw');
// Главное окно со всеми карточками
let parentContainerItems = document.querySelector('.parent_container_items');
// Все кнопки "купить"
let button = document.querySelectorAll('.buy_link');
// Блок для закрытия модального окна
let containerClose = document.querySelector('.closeDiv');
// Все ссылки со способами оплаты
let paymentMethod = document.querySelectorAll('.payment_method_pw');

// Функция закрывает модальное окно при нажатии на керстик
function closePaymentWindow () {
    containerPaymentWindow.style.display = 'none';
    parentContainerItems.style.opacity = '1';
} closeButton.addEventListener('click', closePaymentWindow);


// Функция открывает модальное окно при нажатии на кнопки "купить"
function openWindow() {
    let display = containerPaymentWindow.style.display;

    if (display === 'none') {
        containerPaymentWindow.style.display = 'block';
        containerClose.style.display = 'block';
        parentContainerItems.style.opacity = '0.6';

    } else {
        containerPaymentWindow.style.display = 'none';
        containerClose.style.display = 'none';
        parentContainerItems.style.opacity = '1';
    }
}

button.forEach((idx) => {
    idx.addEventListener('click', openWindow);
});

// Функция закрывает модальное окно при нажатии на способ оплаты
function closePaymentwindowFromPaymentMethods() {
    let display = containerPaymentWindow.style.display;

    if (display === 'block') {
        containerPaymentWindow.style.display = 'none';
        containerClose.style.display = 'none';
        parentContainerItems.style.opacity = '1';
    }
}

paymentMethod.forEach((idx) => {
    idx.addEventListener('click', closePaymentwindowFromPaymentMethods);
});

// Функция закрывает модальное окно при нажатии вне модального окна
window.onclick = function (event) {
    if (event.target === containerClose) {
        containerPaymentWindow.style.display = 'none';
        containerClose.style.display = 'none';
        parentContainerItems.style.opacity = '1';
    }
};

// Объект с таймером
const timerConstructor = {
    // Функция запускает таймер. На входе newCount - количество товара; finishDate - финальная дата действия скидки;
    // indexTimer - номер найтмера, для которого указывается время.
    startTimer(count, finishDate, indexTimer) {
        let timer = document.querySelectorAll('.timer_container');
        this.initializeClock(count, this.getFinishDate(finishDate), timer[indexTimer]);
    },

    // Функция возвращает Финальную дату. На входе target - фиальная дата действия скидки.
    getFinishDate(finishDate) {
        let splitDate = finishDate.split(', ');
        let year = parseInt(splitDate[2]); // вытаскиваем год из финальной даты
        // console.log(`Год ${year}`);
        let month = parseInt(splitDate[1]); // вытаскиваем месяц из финальной даты
        // console.log(`Месяц ${month}`);
        let days = parseInt(splitDate[0]); // вытаскиваем день из финальной даты
        // console.log(`День ${days}`);

        if (Date.parse(new Date(year, month - 1, days)) < Date.parse(new Date())) {
            return new Date();
        } else {
            return new Date(year, month-1, days);
        }
    },

    // Функция инициализирует переменные
    initializeClock(count, finishDate, timerNumber) {
        let days = timerNumber.querySelector('.days');
        let hours = timerNumber.querySelector('.hours');
        let minutes = timerNumber.querySelector('.minutes');
        let seconds = timerNumber.querySelector('.seconds');
        timerNumber.querySelector('.count').innerText = count;

        // Функция обновляет часы
        function updateClock() {
            let timeArray = timerConstructor.getTimeRemaining(finishDate);
            console.log(timeArray);

            if (days === null) {
                console.log('Элемента Days не существует!');
            } else {
                if (days.length < 1) {
                    days.innerText = '0' + timeArray.days;
                } else {
                    days.innerText = timeArray.days
                }
            }

            if (hours === null) {
                console.log('Элемента Hours не существует!');
            } else {
                hours.innerText = ('0' + timeArray.hours).slice(-2);
            }

            if (minutes === null) {
                console.log('Элемента Minutes не существует!');
            } else {
                minutes.innerText = ('0' + timeArray.hours).slice(-2)
            }

            if (seconds === null) {
                console.log('Элемента Seconds не существует!');
            } else {
                seconds.innerText = ('0' + timeArray.seconds).slice(-2);
            }

            if (timeArray.total <= 0) {
                clearInterval(timeInterval);
            }
        }

        updateClock();
        let timeInterval = setInterval(updateClock, 1000);
    },

    // Функция возвращает разность вемен между настоящей датой и заданной
    getTimeRemaining(finishDate) {
        let milliSeconds = Date.parse(finishDate) - Date.parse(new Date());
        let seconds = Math.floor((milliSeconds / 1000) % 60);
        let minutes = Math.floor((milliSeconds / 1000 / 60) % 60);
        let hours = Math.floor((milliSeconds / (1000 * 60 * 60)) % 24);
        let days = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));
        return {
            'total': milliSeconds,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
};

// В таймер передается количество товара; дни действия скидки; номер таймера
timerConstructor.startTimer(2, '13, 09, 2019', 0);
timerConstructor.startTimer(4, '14, 07, 2020', 1);
timerConstructor.startTimer(4, '15, 07, 2019', 2);
