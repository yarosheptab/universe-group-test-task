# Frontend Test Task

### Тестове завдання на позицію Middle Front-End розробника

Твоє завдання - створити простий React додаток, який дозволяє користувачам конвертувати введений текст у PDF документ.

### Вимоги

**Інтерфейс:** Інтерфейс користувача повинен містити текстове поле для введення тексту, кнопку "Конвертувати в PDF" та область для відображення результату - PDF файлу.

**Конвертація:** При натисканні на кнопку "Конвертувати в PDF", введений користувачем текст повинен бути конвертований у формат PDF. Для цього використовуйте HTTP API (нижче наведено приклад запиту).

**Відображення результату:** Після завершення конвертації, PDF файл повинен відобразитися у pdf переглядачі (Можеш використати будь-яку бібліотеку, наприклад [цю](https://github.com/ansu5555/pdf-viewer-reactjs)).

**Збереження результатів** Необхідно також реалізувати функціонал для збереження та відображення історії конвертацій (Список файлів, при кліку відображаємо зконвертований документ). Для збереження історії використай локальні браузерні сховища.

**Тести**: Опишіть базовий unit-тест, який покриває функціонал конвертації (Jest або React Testing Library).

**Документація**: Додайте коротку документацію, з описом стуктури та овновних модулів проекту.

### Додаткові вказівки

1. В якості бібліотеки UI компонентів використай - [Tailwind CSS](https://tailwindcss.com/)
2. Для ковертації використовуйте API запит:

```
POST http://95.217.134.12:4010/create-pdf?apiKey={YOUR_API_KEY}
Body: {
    "text": "Universe"
}

API_KEY = 78684310-850d-427a-8432-4a6487f6dbc4
```

Після завершення завдання, надішли посилання на репозиторій з вихідним кодом та відео з демонстрацію додатку.
