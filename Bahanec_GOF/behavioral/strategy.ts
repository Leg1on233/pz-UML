interface PaymentStrategy {
    pay(amount: number): void;
}

class CreditCardPayment implements PaymentStrategy {
    pay(amount: number) { console.log(`Сплата ${amount} через Card`); }
}

class PayPalPayment implements PaymentStrategy {
    pay(amount: number) { console.log(`Сплата ${amount} через PayPal`); }
}

class ShoppingCart {
    private strategy: PaymentStrategy;

    setPaymentMethod(s: PaymentStrategy) { this.strategy = s; }
    checkout(amount: number) { this.strategy.pay(amount); }
}
// --- Тест Strategy ---
const cart = new ShoppingCart();
cart.setPaymentMethod(new CreditCardPayment());

console.log("--- Тест Strategy ---");
cart.checkout(100);

cart.setPaymentMethod(new PayPalPayment());
cart.checkout(200);