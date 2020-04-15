document.addEventListener('DOMContentLoaded', () => {
    var form = document.forms[0];
    // Настройка AJAX запроса

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        // Добавляем обработчик на событие `submit`
        const ings_array = ingredients_temp_parser(
            document.getElementById('inputIngredients').value
        );
        if (ings_array.length != 0) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/recipes/search', true);
            xhr.setRequestHeader(
                'Content-Type',
                'application/json; charset=utf-8'
            );

            const json = JSON.stringify({ ings: ings_array });

            // Отправляем данные
            xhr.send(json);

            // Функция для наблюдения изменения состояния xhr.readyState обновления statusMessage соответственно

            xhr.onload = function() {
                console.log(xhr.responseText);
            };
        }
    });
});

function ingredients_temp_parser(ings_string) {
    const ings_array = ings_string.split(' ');
    return ings_array;
}
