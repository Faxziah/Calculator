let buttons = document.getElementsByTagName ('button');
	
for (let i = 0; i < buttons.length; i++) {
	
// Кнопки удаления
	buttons[0].addEventListener ('click', delete_all);
	buttons[1].addEventListener ('click', delete_one);
	
// Кнопка степени
	buttons[2].addEventListener ('click', square);

// Кнопка запятая
	buttons[13].addEventListener ('click', comma);

// Кнопка ±
	buttons[15].addEventListener ('click', plus_minus);

// Кнопки цифр, математических знаков и равно
	if ((i >= 4 && i <= 14) || i == 14 || i == 3 || i == 16 || i == 17 || i == 18 || i == 19)
		buttons[i].addEventListener ('click', function () {add(this.innerText,i)});
}

// Добавление чисел, математических знаков и равно
function add (one_number, i) {

// Ввод первой цифры 
	if (typeof (number) == "undefined" && (i >= 4 && i <= 12 || i == 14)) {
		number = one_number;
		output (number);
	}

// Ввод последующих цифр
	else if (typeof (number) != "undefined" && (i >= 4 && i <= 12 || i == 14)) {
		if (number == "0") // Чтобы нельзя было писать 0000 или 05
			number = "";
		number += String (one_number);
		output (number);
		}

// + первый раз
	else if (i == 16 && (typeof (sign) == "undefined" || String (sign) == "—" || String (sign) == "x" || String (sign) == "÷")) {
		without_number ()
		first_sign (number, one_number);
	}

// — первый раз
	else if (i == 17 && (typeof (sign) == "undefined" || String (sign) == "+" || String (sign) == "x" || String (sign) == "÷")) {
		without_number ()
		first_sign (number, one_number);
	}
// * первый раз
	else if (i == 18 && (typeof (sign) == "undefined" || String (sign) == "+" || String (sign) == "—" || String (sign) == "÷")) {
		without_number ()
		first_sign (number, one_number);
	}

// / первый раз
	else if (i == 3 && (typeof (sign) == "undefined" || String (sign) == "+" || String (sign) == "—" || String (sign) == "x")) {
		without_number ()
		first_sign (number, one_number);
	}

// повторный математический знак
	else if ((i == 3 || i == 16 || i == 17 || i == 18 || i == 19) && typeof (number) != "undefined") {
		switch (String (sign)) {
			case "+": number = Number (previous_number) + Number (number); break;
			case "—": number = Number (previous_number) - Number (number); break;
			case "x": number = Number (previous_number) * Number (number); break;
			case "÷": number = Number (previous_number) / Number (number); break;
		}
		second_sing (number, one_number); 
	}

// number установить в undefined
	if (typeof (sign) != "undefined" && (i == 3 || i == 16 || i == 17 || i == 18)) {
		number_for_square = number;
		number = undefined;
	}
}

// Кнопка C
function delete_all () {
	document.getElementById ('result').value = "";
	delete number;
	delete previous_number;
	delete sign;
	document.getElementById ('result').value = 0;
}

// Кнопка ⌫
function delete_one () {
	if (typeof (number) != "undefined") {
		console.log (number)
		number = number.slice (0, number.length-1)
		document.getElementById ('result').value = number;
		console.log (number)
	}
	
	if (number == "" || number == "-")
		document.getElementById ('result').value = number = 0;
}

// Кнопка x<sup>2</sup>
function square () {
	if (typeof (number) != "undefined")
		number = number * number;
	else if (typeof (number) == "undefined")
		number = number_for_square * number_for_square;
	output (number)
}

// Кнопка ,
function comma () {
	if (typeof (number) == "undefined")
		number = "0.";
	else if (typeof (number) != "undefined" && !(number.includes (".")))
		number += ".";
	else if (typeof (number) != "undefined" && number.includes (".")) {}
output (number)
}

// Кнопка ±
function plus_minus () {
	number = String (-(number))
	output (number)
}

// Первое нажатие на математический знак
function first_sign (number, one_number) {
	if (typeof (number) != "undefined") { // потому что + -> (number = undefined) -> - -> previous_number = number = undefined -> NaN 
		if (typeof (sign) != "undefined") {
			switch (String (sign)) {
				case "+": number = Number (previous_number) + Number (number); break;
				case "—": number = Number (previous_number) - Number (number); break;
				case "x": number = Number (previous_number) * Number (number); break;
				case "÷": number = Number (previous_number) / Number (number); break;
			}
		}
		previous_number = number;
		output (number)
	}
	sign = one_number;
}

// Повторное нажатие на математический знак
function second_sing (number, one_number) {
	previous_number = number;
	sign = one_number;
	if (typeof (number) != "undefined")
			output (number)
}

// Вывод чисел и результата на экран
function output (number) {
		document.getElementById ('result').value = number;
}

// Если пользователь просто нажимает, например, - -> 5 (должно получить -5) или * => 5 (должно получиться 0)
function without_number () {
	if (typeof (number) == "undefined" && typeof (sign) == "undefined") 
		number = 0;
}

// Печать с клавиатуры
document.addEventListener ('keydown', function () {
	if (event.key >= 0 && event.key <=9 || event.key == "Enter" || event.key == "+" || event.key == "-" || event.key == "*" || event.key == "/" || event.key == "," || event.key == "." || event.key == "Backspace" || event.key == "Delete") {
		switch (event.key) {
			case "Enter": event.preventDefault(); add ("=", 19); break;
			case "+": add ("+", 16); break;
			case "-": add ("—", 17); break;
			case "*": add ("x", 18); break;
			case "/": add ("÷", 3); break;
			case ".": comma(); break; // английская раскладка
			case ",": comma(); break; // русская раскладка
			case "Backspace": delete_one (); break;
			case "Delete": delete_all (); break;
			default: add (event.key, 4); break; // 4 просто, чтобы был какой-то i числа (4-12,14)
		}
	}
});