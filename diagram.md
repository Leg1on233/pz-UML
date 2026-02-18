# Практична робота: Проєктування системи виклику таксі

## 1. Діаграма варіантів використання (Use Case Diagram)

Ця діаграма відображає основних користувачів (Пасажир, Водій, Адмін) та їхні можливості в системі.

```mermaid
   flowchart TD
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
```

## 2. Діаграма послідовності (Sequence Diagram)

Ця діаграма демонструє покрокову взаємодію між пасажиром, додатком, сервером та водієм під час замовлення.

```mermaid
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

Ця діаграма показує алгоритм дій користувача та логіку системи (успішний пошук або відмова).

```mermaid
flowchart TD
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
```