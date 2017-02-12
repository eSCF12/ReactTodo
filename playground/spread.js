// function add(a, b) {
// 	return a + b;
// }
// console.log(add(3, 1));
//
// var toAdd = [9, 5];
// console.log(add(...toAdd));

// var groupA = ['Jack', 'Cory'];
// var groupB = ['Vikram'];
// var final = [...groupB, 3, ...groupA];
//
// console.log(final);

var persion = ['Wong', 35];
var persionTwo = ['Jen', 32];

function greet(name, age) {
	console.log('Hi ' + name + ', you are ' + age + '.');
}

greet(...persion);
greet(...persionTwo);

var names = ['Mike', 'Ben'];
var final = ['Wong', ...names];

final.forEach(function (name) {
	console.log('Hi ' + name);
});
