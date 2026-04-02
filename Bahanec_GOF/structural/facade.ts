class CPU { processData() { console.log("Процесор обробляє..."); } }
class Memory { load() { console.log("Пам'ять завантажує..."); } }
class HardDrive { read() { console.log("Диск зчитує..."); } }

class ComputerFacade {
    private cpu = new CPU();
    private memory = new Memory();
    private hd = new HardDrive();

    start() {
        console.log("Запуск комп'ютера:");
        this.hd.read();
        this.memory.load();
        this.cpu.processData();
    }
}
// --- Тест Facade ---
const computer = new ComputerFacade();

console.log("--- Тест Facade ---");
computer.start();