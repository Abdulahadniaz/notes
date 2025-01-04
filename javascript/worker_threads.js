/*
Overview of Worker Threads:

Purpose: Enables running JavaScript code in parallel threads,
allowing for concurrent execution in Node.js, which is traditionally single-threaded.

Use Cases: Computationally intensive tasks, such as image processing,
encryption, or data manipulation, without blocking the event loop.

Performance: Improves performance for CPU-bound operations
by offloading them to separate threads.

Key Features:

i - Multithreading Support: Provides an API to create and manage worker threads.

ii - Isolation: Each worker thread runs in its own V8 context with a separate memory heap.
with its own event loop.

iii - Communication: Uses message passing (postMessage and on('message'))
for communication between the main thread and worker threads.

iv - SharedArrayBuffer Support: Allows workers to share memory when required,
using SharedArrayBuffer.

v - Error Handling: Workers emit error events if an unhandled exception occurs within the thread.

vi - Thread Pool: Unlike the cluster module, 
worker threads share the same process but operate in separate threads.

API Methods:

i - Worker Class: Represents an individual worker thread.

ii - Worker(filename, options): Creates a new worker.

iii - .postMessage(data): Sends data to the worker thread.

iv - .on('message', callback): Listens for messages from the worker. used in parent thread

v - .terminate(): Stops the worker thread.

vi - parentPort.postMessage(data): Sends data from the worker to the parent thread.
used in worker thread

vii - parentPort.on('message', callback): Listens for messages from the parent thread in the worker.
used in worker thread

viii - Thread-safe Modules: Node.js includes thread-safe versions of libraries,
such as worker_threads and fs.promises.
*/

// Main thread (app.js)
const { Worker } = require("worker_threads");

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", { workerData });
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

(async () => {
  try {
    console.log("Main thread: Starting worker...");
    const result = await runWorker(42);
    console.log(`Main thread: Result from worker - ${result}`);
  } catch (err) {
    console.error("Main thread: Error from worker:", err);
  }
})();

// Worker thread (worker.js)
const { parentPort, workerData } = require("worker_threads");

// Perform computation
const computeFactorial = (num) => {
  if (num === 0 || num === 1) return 1;
  return num * computeFactorial(num - 1);
};

const result = computeFactorial(workerData);

// Send result back to the main thread
parentPort.postMessage(result);

/*
Steps to Run:

Create two files: app.js (main thread) and worker.js (worker thread).
Run the main thread: node app.js.
Observe the communication and result from the worker thread.
*/
