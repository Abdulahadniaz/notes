// Mixins

// Mixins are classes that provide additional functionality to other classes.
// They are used to add methods to a class without using inheritance.
// A Mixin is a class or object that contains methods that can be
// used by other classes without inheriting from that class.

// Example:

// Mixin 1: Adding logging capabilities
const LoggerMixin = {
  log(message) {
    console.log(`[${this.constructor.name}]: ${message}`);
  },
  warn(message) {
    console.warn(`[${this.constructor.name}]: ${message}`);
  },
  error(message) {
    console.error(`[${this.constructor.name}]: ${message}`);
  },
};

// Mixin 2: Adding event handling capabilities
const EventMixin = {
  events: {},
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  },
};

// Example class that will use the mixins in coming steps
class UserService {
  constructor() {
    // something
  }

  async fetchUser(id) {
    // fetch user from database
  }
}

// Apply mixins to UserService
Object.assign(UserService.prototype, LoggerMixin, EventMixin);

// Usage example
const userService = new UserService();

// UserService class using logger mixin functionality
userService.log("Service initialized"); // [UserService]: Service initialized

// UserService class using event mixin functionality
userService.on("userFetched", (user) => {
  console.log("User data received:", user);
});

userService.on("error", (error) => {
  console.log("Error occurred:", error); // [UserService]: Error occurred: Error: Failed to fetch user: 404
});
