class OldSystem {
    legacyRequest(): string {
        return "Дані у застарілому форматі";
    }
}

interface ModernInterface {
    request(): string;
}

class SystemAdapter implements ModernInterface {
    constructor(private oldSystem: OldSystem) {}

    request(): string {
        const result = this.oldSystem.legacyRequest();
        return `Адаптер: перетворюю "${result}" у сучасний JSON`;
    }
}
// --- Тест Adapter ---
const oldSystem = new OldSystem();
const adapter = new SystemAdapter(oldSystem);

console.log("--- Тест Adapter ---");
console.log("Результат через адаптер:", adapter.request());