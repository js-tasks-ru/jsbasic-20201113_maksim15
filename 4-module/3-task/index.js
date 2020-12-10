/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];

        if (row.cells[3].getAttribute('data-available') === 'true') {
            row.classList.add('available');
        } else if (row.cells[3].getAttribute('data-available') === 'false') {
            row.classList.add('unavailable');
        } else row.setAttribute('hidden', true);

        if (row.cells[2].innerHTML === 'm') {
            row.classList.add('male');
        } else if (row.cells[2].innerHTML === 'f') {
            row.classList.add('female');
        }

        if (Number(row.cells[1].innerHTML) < 18) {
            row.style.textDecoration = 'line-through'
        }
    }
    return table;
}
