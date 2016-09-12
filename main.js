const container = document.body;

function $(selector) {
    return container.querySelector(selector);
}

function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function pad(number, minLength) {
    const str = number.toString();
    const missing = minLength - str.length;
    return missing > 0 ? '0'.repeat(missing) + str : str;
}

function generateYear() {
    return random(1980, 2020);
}

function generateTime() {
    const hour = random(0, 23);
    const minute = pad(random(0, 59), 2);
    return hour + 'h' + minute;
}

function generatePrice() {
    const integer = random(1, 999);

    if (random(0,1)) {
        return integer + '€';
    }

    const fractional = pad(random(1, 99), 2);
    return integer + ',' + fractional + '€';
}

function generateNumber() {
    const r = random(0, 99);

    if (r < 25) {
        return generateYear();
    }

    if (r < 50) {
        return generateTime();
    }

    if (r < 75) {
        return generatePrice();
    }

    return random(0, 100000);
}

function speak() {
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = container.dataset.number;
    utterance.lang = 'fr-FR';
    window.speechSynthesis.speak(utterance);

    $('.answer').focus();
}

function next() {
    container.dataset.number = generateNumber();

    $('.answer').value = '';
    $('.result').classList.remove('result--ok', 'result--nok');
    $('.solution').classList.remove('solution--show');
    $('.solution__number').textContent = container.dataset.number;

    speak();
}

function checkAnswer() {
    const ok = $('.answer').value === container.dataset.number;
    $('.result').classList.toggle('result--ok', ok);
    $('.result').classList.toggle('result--nok', !ok);
}

function showSolution() {
    $('.solution').classList.add('solution--show');
}

$('.speak').addEventListener('click', speak);
$('.result__check').addEventListener('click', checkAnswer);
$('.solution__show').addEventListener('click', showSolution);
$('.next').addEventListener('click', next);

next();
