import colors from "colors"; //Окрашивание сообщений терминала

//! Все мидлвары вызываются последовательно. Без вызова next процесс зависнет на текущем мидлваре

export function requestTime(request, response, next) {
	// Устанавливаем время выполнения запроса
	request.requestTime = Date.now();

	next();
}

export function logger(request, response, next) {

	console.log(colors.bgGreen.black(`Request time: ${request.requestTime}`));

	next();
}