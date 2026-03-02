# Практична робота: Проєктування системи виклику таксі

## 1. Діаграма варіантів використання (Use Case Diagram)
```mermaid
flowchart TD
    classDef blue fill:#4A90D9,stroke:#2C5F8A,color:#fff
    classDef orange fill:#F5A623,stroke:#B87A10,color:#fff
    classDef red fill:#E74C3C,stroke:#A93226,color:#fff
    classDef green fill:#27AE60,stroke:#1A7A42,color:#fff
    classDef purple fill:#8E44AD,stroke:#5E2D73,color:#fff
    classDef teal fill:#1ABC9C,stroke:#148A70,color:#fff

    subgraph Пошук
        Start((Start)) --> App[Додаток]
        App --> Dest[Адреса]
        Dest --> Type[Клас авто]
        Type --> Check{Є авто?}
        Check -- Ні --> Fail[Немає авто]
        Fail --> Retry{Ще?}
        Retry -- Так --> Type
        Retry -- Ні --> Stop((Стоп))
    end

    subgraph Поїздка
        Check -- Так --> Found[Водій]
        Found --> Wait[Очікування]
        Wait --> Ride[Рух]
        Ride --> Pay{Оплата?}
        Pay -- Ні --> Cash[Готівка]
        Pay -- Так --> OK[OK]
        Cash --> Rate[Оцінка]
        OK --> Rate
        Rate --> End((Кінець))
    end

    class Start,App,Dest,Type blue
    class Check,Retry,Pay orange
    class Fail,Stop red
    class Found,Wait,Ride,OK green
    class Cash purple
    class Rate,End teal

    style Пошук fill:none,stroke:#aaa
    style Поїздка fill:none,stroke:#aaa
```

## 2. Діаграма послідовності (Sequence Diagram)
```mermaid
%%{init: {"theme": "base", "themeVariables": {"actorBkg": "#4A90D9", "actorBorder": "#2C5F8A", "actorTextColor": "#fff", "activationBkgColor": "#F5A623", "noteBkgColor": "#1ABC9C", "noteTextColor": "#fff", "signalTextColor": "#333"}}}%%
sequenceDiagram
    autonumber
    actor Pas as Пасажир
    participant App as Мобільний Додаток
    participant Server as Сервер
    participant Drv as Водій

    Pas->>App: Вводить адресу і натискає "Замовити"
    App->>Server: POST /request_ride (Location A -> B)
    activate Server
    Server->>Server: Пошук найближчого водія
    Server->>Drv: Сповіщення про нове замовлення
    Drv-->>Server: Підтвердження (Accept)
    Server-->>App: Водія знайдено! (Час подачі: 5 хв)
    App-->>Pas: Відображення авто на карті
    deactivate Server

    Note over Pas, Drv: Процес поїздки...

    Drv->>Server: Статус "Прибув у точку Б"
    Server->>App: Запит на оплату
    App->>Pas: Списання коштів
    Pas-->>App: Оплата успішна
    App->>Server: Транзакція OK
    Server-->>Drv: Зарахування коштів на баланс
```

## 3. Діаграма діяльності (Activity Diagram)
```mermaid
flowchart TD
    classDef blue fill:#4A90D9,stroke:#2C5F8A,color:#fff
    classDef orange fill:#F5A623,stroke:#B87A10,color:#fff
    classDef red fill:#E74C3C,stroke:#A93226,color:#fff
    classDef green fill:#27AE60,stroke:#1A7A42,color:#fff
    classDef purple fill:#8E44AD,stroke:#5E2D73,color:#fff
    classDef teal fill:#1ABC9C,stroke:#148A70,color:#fff

    Start((Початок)) --> OpenApp[Відкриття додатку]
    OpenApp --> EnterDest[Введення пункту призначення]
    EnterDest --> SelectCar[Вибір класу авто]
    SelectCar --> Search{Є вільні машини?}

    Search -- Ні --> Notify[Повідомлення: Авто не знайдено]
    Notify --> Retry{Спробувати ще?}
    Retry -- Так --> SelectCar
    Retry -- Ні --> End((Кінець))

    Search -- Так --> ConnectDriver[Призначення водія]
    ConnectDriver --> WaitCar[Очікування авто]
    WaitCar --> Ride[Поїздка]
    Ride --> Payment{Оплата пройшла?}

    Payment -- Ні --> CashPay[Оплата готівкою]
    CashPay --> FinishRide
    Payment -- Так --> FinishRide[Завершення замовлення]

    FinishRide --> Rate[Оцінка водія]
    Rate --> End

    class Start,OpenApp,EnterDest,SelectCar blue
    class Search,Retry,Payment orange
    class Notify red
    class ConnectDriver,WaitCar,Ride green
    class CashPay purple
    class FinishRide,Rate,End teal
```