import { stringify } from "csv/browser/esm";

import { EventEmitter } from "events";																				// Line 1
import fs from "fs";

const ev1 = new EventEmitter();																								// Line 2
const ev2 = new EventEmitter();																								// Line 3

// Define function tracing variables
const callStack = ["main()"];
const microQueue = [];
const macroQueue = [];
const allPromises = [];
const eventReg = [];

// Define output variables
const OUTPUT_FILEPATH = "./task-2-trace.csv";
const COLUMNS = {
	prog: "Program Counter (Line Number)",
	stack: "Call Stack",
	micro: "Micro Queue",
	prom: "Promises",
	macro: "Macro Queue",
	reg: "Event Registry",
	out: "Console Output"
};
const data = [];

/**
 * Prints a list according to the format "{ obj1, obj2, ..., objN }"
 *
 * @param {string[]} list The list of strings to format and print
 * @param {boolean} braces True if "{}" to be used, false if "[]" to be used
 *
 * @returns The formatted list
 */
function printList(list, braces) {
	return `${braces ? "{" : "["} ${list.join(", ")}${list.length > 0 ? " " : ""}${braces ? "}" : "]"}`;
}

/**
 * Adds an entry to the program trace output
 *
 * @param {string} lineNum The line number of the current executing function
 * @param {string} [output = ""] Console output, if any
 */
function addEntry(lineNum, output = "") {
	data.push([
		lineNum,
		printList(callStack, false),
		printList(microQueue, false),
		printList(allPromises, true),
		printList(macroQueue, false),
		printList(eventReg, true),
		output
	]);
}

let count = 0;																																// Line 4
let promise1 = new Promise( (resolve, reject) => {														// Line 5
	// Add new promise into promises
	allPromises.push("promise@5");
	addEntry("5");
  resolve(count);																															// Line 6
});																																						// Line 7
let promise2 = new Promise( (resolve, reject) => {														// Line 8
	// Add new promise into promises
	allPromises.push("promise@8");
	addEntry("8");
	resolve(count);																															// Line 9
});																																						// Line 10

function foo(x) {																															// Line 11
	// Push new call to foo() to the call stack
	callStack.push(`foo(${x})`);
	addEntry("11");

	return new Promise((resolve, reject) => {																		// Line 12
		// Add new promise into promises
		allPromises.push(`promise@${x % 2 ? 24 : 28}`);
		addEntry("12");

		if (x > 10) {																															// Line 13
			ev2.emit('done'); // EventEmitters are done with all events
			resolve();																															// Line 14
		}
		else if (x % 2 === 0) {																										// Line 15
			// Enqueue new emit to ev1.run() to macro queue
			macroQueue.push(`function@22(${++x})`);
			addEntry("16");
			// Finish foo(); pop it from the call stack
			callStack.pop();
			ev1.emit('run', x);																											// Line 16
		}
		else {																																		// Line 17
			// Enqueue new emit to ev2.run() to macro queue
			macroQueue.push(`function@26(${++x})`);
			addEntry("18");
			// Finish foo(); pop it from the call stack
			callStack.pop();
			ev2.emit('run', x);																											// Line 18
		}																																					// Line 19
	});																																					// Line 20
}																																							// Line 21

// Add the new event ev1.on() into the event registry
eventReg.push("ev1.run:function@22");
addEntry("22");
ev1.on('run', (data) => { setImmediate(() => {																// Line 22
	// Dequeue waiting ev1.run() event from the macro queue
	// and push it to the call stack for execution
	callStack.push(macroQueue.shift());
	addEntry("22");
	// Record console output
	console.log(`data ${data} received by ev1`);																// Line 23
	addEntry("23", `data ${data} received by ev1`);
	// Enqueue promise-related foo() callback to micro queue
	microQueue.push(`promise@8.resolve(${data}) = (${data}) => foo(${data})`);
	addEntry("24");

	promise2.then((x) => {																											// Line 24
		// Dequeue waiting promise-related foo() callback from the micro queue
		// and push it to the call stack for execution
		callStack.push(microQueue.shift());
		addEntry("24");
		foo(data);
		// Finish foo() callback; pop it from the call stack
		callStack.pop();
		addEntry("24");
		// Promise has ended = end-of-file
		callStack.pop();
		addEntry("eof");
	});

	// Finish ev1.on() event; pop it from the call stack
	// Event has ended = end-of-file
	callStack.pop();
	addEntry("eof");
}) });																																				// Line 25

// Add the new event ev2.on() into the event registry
eventReg.push("ev2.run:function@26");
addEntry("26");
ev2.on('run', (data) => { setImmediate(() => {																// Line 26
	// Dequeue waiting ev2.run() event from the macro queue
	// and push it to the call stack for execution
	callStack.push(macroQueue.shift());
	addEntry("26");
	// Record console output
	console.log(`data ${data} received by ev2`);																// Line 27
	addEntry("27", `data ${data} received by ev2`);
	// Enqueue promise-related foo() callback to micro queue
	microQueue.push(`promise@5.resolve(${data}) = (${data}) => foo(${data})`);
	addEntry("28");

	promise1.then((x) => {																											// Line 28
		// Dequeue waiting promise-related foo() callback from the micro queue
		// and push it to the call stack for execution
		callStack.push(microQueue.shift());
		addEntry("28");
		foo(data);
		// Finish foo() callback; pop it from the call stack
		callStack.pop();
		addEntry("28");
		// Promise has ended = end-of-file
		callStack.pop();
		addEntry("eof");
	});

	// Finish ev2.on() event; pop it from the call stack
	// Event has ended = end-of-file
	callStack.pop();
	addEntry("eof");
}) });																																				// Line 29

// Enqueue the first ev2.emit() call into the macro queue
macroQueue.push("function@26(0)");
addEntry("30");
// Remove the main() function from the call stack
callStack.pop();
addEntry("eof");
// Start emitting the 'run' event
ev2.emit('run', count);																												// Line 30

// Handle saving of the tracing data into CSV
ev2.on('done', () => {
	stringify(data, { header: true, columns: COLUMNS }, (err, output) => {
		if (err) throw err;
		fs.writeFileSync(OUTPUT_FILEPATH, output, err => {
			if (err) throw err;
			console.log("CSV file saved!");
		});
	});
});
