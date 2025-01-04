// Polyfills
// Polyfills are code that adds missing features to older browsers or environments.

// 1. Array.prototype.includes

if (!Array.prototype.includes) {
  // if Array.prototype.includes is not defined, we need to define it
  // so that it works in older browsers
  Array.prototype.includes = function (searchElement, fromIndex) {
    // If fromIndex is undefined, start from beginning
    if (fromIndex === undefined) {
      fromIndex = 0;
    }

    // Convert fromIndex to integer
    const startIndex = Math.floor(fromIndex);

    // Handle negative fromIndex
    const index =
      startIndex >= 0 ? startIndex : Math.max(0, this.length + startIndex);

    // Search for element
    while (index < this.length) {
      // Handle NaN case specially
      const element = this[index];
      if (
        searchElement === element ||
        (Number.isNaN(searchElement) && Number.isNaN(element))
      ) {
        return true;
      }
      index++;
    }

    return false;
  };
}

// Usage example:
const array = [1, 2, 3];
console.log(array.includes(2)); // true
console.log(array.includes(4)); // false

// 2. Object.assign

if (typeof Object.assign !== "function") {
  // if Object.assign is not defined, we need to define it
  // so that it works in older browsers
  Object.assign = function (target, ...sources) {
    // ...implementation here
  };
}
