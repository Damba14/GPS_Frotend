// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Хранилище для пользователей (можно заменить на базу данных)
let users = [];

// Обработка POST-запроса на /login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Проверка на наличие пользователя
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Добавление нового пользователя
    users.push({ email, password });
    
    // Здесь можно добавить логику для сохранения данных в файл или БД
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2)); // Сохранение в файл

    return res.json({ message: 'Пользователь успешно зарегистрирован!' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});