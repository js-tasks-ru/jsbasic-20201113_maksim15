export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    let cartItem = this.cartItems.find(item => item.product.id == product.id);
    if (cartItem) {
      cartItem.count = cartItem.count + 1;
    } else {
      cartItem = { product: product, count: 1 };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // ваш код
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count = cartItem.count + amount;
    if (cartItem.count == 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    // ваш код
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    // ваш код
    return this.cartItems.reduce((count, item) => count + item.count, 0);
  }

  getTotalPrice() {
    // ваш код
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

