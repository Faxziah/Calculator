let buttons = document.getElementsByTagName ('button');
	
for (let i = 0; i < buttons.length; i++) {
	
// Кнопки удаления
	buttons[0].addEventListener ('click', delete_all);
	buttons[1].addEventListener ('click', delete_one);
	
// Кнопка степени
	// buttons[2].addEventListener ('click', delete_one);

// Кнопка запятая
	buttons[13].addEventListener ('click', comma);

// Кнопка ±
	buttons[15].addEventListener ('click', plus_minus);

// Кнопки цифр, математических знаков и равно
	if ((i >= 4 && i <= 14) || i == 14 || i == 3 || i == 16 || i == 17 || i == 18 || i == 19)
		buttons[i].addEventListener ('click', function () {add(this.innerText,i)});
}

// Добавление чисел
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
	else if (i == 16 && (typeof (sign) == "undefined" || String (sign) == "—" || String (sign) == "x" || String (sign) == "÷"))
		first_sign (number, one_number);

// — первый раз
	else if (i == 17 && (typeof (sign) == "undefined" || String (sign) == "+" || String (sign) == "x" || String (sign) == "÷"))
		first_sign (number, one_number);

// * первый раз
	else if (i == 18 && (typeof (sign) == "undefined" || String (sign) == "+" || String (sign) == "—" || String (sign) == "÷"))
		first_sign (number, one_number);

// / первый раз
	else if (i == 3 && (typeof (sign) == "undefined" || String (sign) == "+" || String (sign) == "—" || String (sign) == "x"))
		first_sign (number, one_number);

// + повторно
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
	if (typeof (sign) != "undefined" && (i == 3 || i == 16 || i == 17 || i == 18))
		number = undefined;
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
		number = number.slice (0, number.length-1)
		document.getElementById ('result').value = number;
		console.log (number)
	}
	
	if (number == "")
		document.getElementById ('result').value = 0;
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

// Положительное <-> отрицательное число
function plus_minus () {
	number = -(number)
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



	// 0 сейчас в начале экрана - это просто значение input, но оно не равно number_one и number, поэтому с этим нулем ничего нельзя сделать
	// Нужно написать 0, чтобы уже потом разделить, умножить и пр. на него
	// установить 0 в значение по умолчанию для number  