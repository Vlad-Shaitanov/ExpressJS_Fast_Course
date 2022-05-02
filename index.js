import express from "express";
import path from "path"; // Работа с путями
import { requestTime, logger } from "./middlewares.js";// Мидлвары для расширения запросов
import serverRoutes from "./routes/servers.js";

// Определение директории
const __dirname = path.resolve();

//Если в переменных окружения есть переменная с портом, то возьмем ее, иначе 3000
const PORT = process.env.PORT ?? 3000;

//Инициализация приложения
const app = express();

/*=================================Пример работы со статичными страницами ================*/

/* Делаем папку статичной. Это позволяет нам не делать get-запрос к каждой
	странице, а работать сразу со всей папкой*/
// app.use(express.static(path.resolve(__dirname, "static")));
app.use(requestTime);
app.use(logger);
app.use(serverRoutes);


// обрабатываем get-запрос по указанному урлу
// app.get(("/"), (request, response) => {

// 	/*Устанавливаем ответ при запросе*/

// 	//(инлайн-метод)
// 	// response.send("<h1>Hello Express</h1>");

// 	// Установка через файл
// 	response.sendFile(path.resolve(__dirname, "static", "index.html"));
// });

// app.get(("/download"), (request, response) => {
// 	console.log(request.requestTime);
// 	// Скачивание определенной страницы
// 	response.download(path.resolve(__dirname, "static", "index.html"));
// });
/*=================================Конец примера работы со статичными страницами ================*/


/*==================================Пример работы с шаблонизатором EJS============================*/
//Переменные
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "ejs"));
// console.log(app.get("views"));

app.get("/", (req, res) => {
	res.render("index", { title: "Main page", active: "main" });
});

app.get("/features", (req, res) => {
	res.render("features", { title: "Features page", active: "features" });
});
/**/

//Задаем порт, на котором будем запускать
app.listen(PORT, () => {
	console.log(`Сервер был запущен на порте ${PORT}...`);
});