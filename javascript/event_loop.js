// Event Loop

/*
Event loop is a js mechanism that allows it to perform non-blocking operations
despite the fact that js is single-threaded.

1. Call Stack: Where JavaScript code is executed (one line at a time)
2. Callback Queue: Where callbacks from async operations wait
3. Microtask Queue: Where Promises and queueMicrotask callbacks wait
4. Event Loop: Constantly checks if Call Stack is empty and moves tasks from queues to call stack

*/

// Example 1: Basic Event Loop demonstration
console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout callback");
}, 0);

Promise.resolve().then(() => console.log("3. Promise callback"));

console.log("4. End");

// Output:
// 1. Start
// 4. End
// 3. Promise callback
// 2. Timeout callback

// Example 2: Multiple queues and priorities
console.log("1. Script start");

setTimeout(() => {
  console.log("2. setTimeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise 1");
  setTimeout(() => {
    console.log("4. setTimeout 2");
  }, 0);
  Promise.resolve().then(() => {
    console.log("5. Promise 2");
  });
});

console.log("6. Script end");

// Output:
// 1. Script start
// 6. Script end
// 3. Promise 1
// 5. Promise 2
// 2. setTimeout 1
// 4. setTimeout 2

// Example 3: Real-world scenario with API calls
function fetchUserData() {
  console.log("1. Fetching user data...");

  // Simulated API call
  setTimeout(() => {
    const userData = { id: 1, name: "John" };
    console.log("2. User data received");

    // Process user data
    Promise.resolve(userData)
      .then((user) => {
        console.log("3. Processing user:", user.name);
        return user;
      })
      .then((user) => {
        console.log("4. Saving to cache...");
        // Simulate cache operation
        setTimeout(() => {
          console.log("5. Cache updated");
        }, 0);
      });
  }, 1000);

  console.log("6. Initial setup complete");
}

fetchUserData();

// Output:
// 1. Fetching user data...
// 6. Initial setup complete
// 2. User data received
// 3. Processing user: John
// 4. Saving to cache...
// 5. Cache updated

// Key Takeaways:
/*
Execution Order:
    1. Synchronous code executes immediately
    2. Microtasks (Promises) execute before macrotasks (setTimeout, setInterval)
    3. All microtasks complete before the next macrotask begins

Queue Priority:
    1. Call Stack (immediate execution)
    2. Microtask Queue (Promises, queueMicrotask)
    3. Callback Queue (setTimeout, setInterval, DOM events)
*/
