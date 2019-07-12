'use strict';

// Объект с таймером
const timerConstructor = {
    // Функция запускает таймер. На входе newCount - количество товара; finishDate - финальная дата действия скидки;
    // indexTimer - номер найтмера, для которого указывается время.
    startTimer(count, finishDate, indexTimer) {
        let timer = document.querySelectorAll('.countdown');
        this.initializeClock(count, this.getFinishDate(finishDate), timer[indexTimer]);
    },

    // Функция возвращает Финальную дату. На входе target - фиальная дата действия скидки.
    getFinishDate(finishDate) {
        let year = parseInt(finishDate.split(', ')[2]); // вытаскиваем год из финальной даты
        // console.log(`Год ${year}`);
        let month = parseInt(finishDate.split(', ')[1]); // вытаскиваем месяц из финальной даты
        // console.log(`Месяц ${month}`);
        let days = parseInt(finishDate.split(', ')[0]); // вытаскиваем день из финальной даты
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

// let thisDate = new Date(); // сегодняшняя дата
// console.log(thisDate);
// let finishDate = '13, 07, 2020'.split(','); // финальная дата, вводят с клавиатуры
// console.log(finishDate);
// let year = parseInt(finishDate[2]); // вытаскиваем год из финальной даты
// console.log(`Год ${year}`);
// let month = parseInt(finishDate[1]); // вытаскиваем месяц из финальной даты
// console.log(`Месяц ${month}`);
// let days = parseInt(finishDate[0]); // вытаскиваем день из финальной даты
// console.log(`День ${days}`);
// let newFinishDate = new Date(year, month-1, days); // выводим финальную дату
// console.log(newFinishDate);
// let minusDate = Date.parse(newFinishDate) - Date.parse(thisDate); // осталось времени в милисекундах
// console.log(`Осталось ${minusDate} миллисекунд`);
// let daysLeft = Math.floor(minusDate / (1000 * 60 * 60 * 24)); // осталось времени в днях
// console.log(`Осталось ${daysLeft} дней`);
// let hoursLeft = Math.floor((minusDate / (1000 * 60 * 60)) % 24); // осталось времени в часах
// console.log(`Осталось ${hoursLeft} часов`);
// let minutesLeft = Math.floor((minusDate / 1000 / 60) % 60); // осталось времени в минутах
// console.log(`Осталось ${minutesLeft} минут`);
// let secondsLeft = Math.floor((minusDate / 1000) % 60);// осталось времени в секундах
// console.log(`Осталось ${secondsLeft} секунд`);
//
// let spanDays = document.querySelector('.days');
// spanDays.innerText = daysLeft;