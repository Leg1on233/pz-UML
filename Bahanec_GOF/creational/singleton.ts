class DatabaseConnection {
    private static instance: DatabaseConnection;

    private constructor() {
        console.log("Встановлено нове з'єднання з БД");
    }

    public static getInstance(): DatabaseConnection {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    public query(sql: string): void {
        console.log(`Виконання запиту: ${sql}`);
    }
}


console.log("--- Тест Singleton (DatabaseConnection) ---");
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

db1.query("SELECT * FROM users");

console.log("Об'єкти однакові?", db1 === db2); // Має вивести true