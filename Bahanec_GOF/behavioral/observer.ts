interface Subscriber {
    update(message: string): void;
}

class NewsAgency {
    private observers: Subscriber[] = [];

    subscribe(o: Subscriber) { this.observers.push(o); }

    notify(news: string) {
        this.observers.forEach(o => o.update(news));
    }
}

class NewsReader implements Subscriber {
    constructor(private name: string) {}
    update(message: string) {
        console.log(`${this.name} отримав новину: ${message}`);
    }
}
// --- Тест Observer ---
const subject = new NewsAgency();
const obs1 = new NewsReader("Підписник 1");
const obs2 = new NewsReader("Підписник 2");

subject.subscribe(obs1);
subject.subscribe(obs2);

console.log("--- Тест Observer ---");
subject.notify("Нове повідомлення!");