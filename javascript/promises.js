// ==============================
// 5 - Promises
// ==============================

// A Promise is an object representing the eventual completion (or failure) of an asynchronous operation

// 1. Basic Promise Example
const simplePromise = newPromise((resolve, reject) => {
  // some async call here
  const success = true;
  success ? resolve("Operation Successfull") : reject("Failed");
});

simplePromise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));

// 2. Practical Example
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        id: id,
        name: "John Doe",
      };
      user ? resolve(user) : reject("User not found");
    }, 1000);
  });
};

// 3. Promise Chaining
fetchUser(1)
  .then((user) => {
    console.log(user);
    return user.name;
  })
  .then((name) => console.log(name))
  .catch((error) => console.log(error));

// 4. Promise.all - Waiting for multiple promises
const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(3);
const promise3 = Promise.resolve(2);

Promise.all([promise1, promise2, promise3])
  .then((values) => console.log(values)) // [1,3,2]
  .catch((error) => console.log(error));

// 5. Promise.race - First promise to complete wins
Promise.race([promise1, promise2, promise3])
  .then((values) => console.log(values)) // [1] => fastest to resovle
  .catch((error) => console.log(error));

// 6. Async/Await - Modern way to handle promises
async function getUserData(id) {
  try {
    const user = await fetchUser(id);
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// 7. Using async/await with multiple promises
async function getAllData() {
  try {
    const results = await Promise.all([
      fetchUser(1),
      fetchUser(3),
      fetchUser(2),
    ]);
    console.log(results); // [user1, user3, user2]
  } catch (error) {
    console.log(error);
  }
}
