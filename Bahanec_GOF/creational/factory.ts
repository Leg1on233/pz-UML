interface Transport {
    deliver(): string;
}

class Truck implements Transport {
    deliver() { return "Доставка вантажівкою по дорозі"; }
}

class Ship implements Transport {
    deliver() { return "Доставка судном морем"; }
}

abstract class Logistics {
    abstract createTransport(): Transport;

    planDelivery(): string {
        const transport = this.createTransport();
        return transport.deliver();
    }
}

class RoadLogistics extends Logistics {
    createTransport() { return new Truck(); }
}

class SeaLogistics extends Logistics {
    createTransport() { return new Ship(); }
}

// --- Тест Factory ---
const roadLogistics = new RoadLogistics();
const seaLogistics = new SeaLogistics();

console.log("--- Тест Factory ---");
console.log(roadLogistics.planDelivery());
console.log(seaLogistics.planDelivery());