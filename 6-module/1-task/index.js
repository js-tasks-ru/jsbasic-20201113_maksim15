/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  remove(event) {
    if (event.target.closest('button')) {
      event.target.closest('tr').remove();
    }
  }

  render() {
    this.table = document.createElement('TABLE');

    const thead = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>`;
    this.table.insertAdjacentHTML('beforeend', thead);

    const tbody = document.createElement('TBODY');
    for (let row of this.rows) {
      let rowContent = `
        <tr>
          <td>${row.name}</td>
          <td>${row.age}</td>
          <td>${row.salary}</td>
          <td>${row.city}</td>
          <td><button>X</button></td>
        </tr>`;
      tbody.insertAdjacentHTML('beforeend', rowContent);
    };
    this.table.append(tbody);

    this.table.addEventListener('click', this.remove);

    return this.table;
  }
}
