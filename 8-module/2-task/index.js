import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
  }

  render() {
    if (!this.productsGrid) {
      this.productsGrid = document.createElement('DIV');
      this.productsGrid.classList.add('products-grid');
    }

    if (this.productsInner) {
      this.productsInner.remove();
    }

    this.productsInner = document.createElement('DIV');
    this.productsInner.classList.add('products-grid__inner');

    for (let product of this.products) {
      // Условия для фильтров - если условие выполняется, то продукт не попадает под фильтр (пропускается)
      if (this.filters.noNuts && product.nuts) { continue; }
      if (this.filters.vegeterianOnly && !product.vegeterian) { continue; }
      if (!!this.filters.maxSpiciness && product.spiciness > this.filters.maxSpiciness) { continue; }
      if (this.filters.category && product.category != this.filters.category) { continue; }

      let card = new ProductCard(product);
      this.productsInner.append(card.elem);
    }
    this.productsGrid.append(this.productsInner);

    return this.productsGrid;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.render();
  }
}
