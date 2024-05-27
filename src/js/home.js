

function showAlert() {
    alert('Hello!');
}

// Получаем ссылку на кнопку по ее id
const button = document.getElementById('button');

// Назначаем обработчик события (в данном случае, клика) на кнопку
button.addEventListener('click', showAlert);