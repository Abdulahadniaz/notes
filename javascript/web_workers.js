// Web Workers

// Web Workers are a way to run JavaScript code in the background without blocking the main thread.
// So its a way of acheiving multithreading in js.
// The newly created web workers run in their own javascript context. They have their own varibales, event listeners, etc.
// data is sent to and from the web worker using messages.
// We have onmessage and postMessage.

// Benefits:
// 1. It allows for parallel execution of JavaScript code, which can help improve performance and responsiveness.
// 2. It allows for more efficient use of resources and can help improve the performance of web applications.

// Drawbacks:
// 1. It is not supported in all browsers.

// main.js file
const cryptoWorker = new Worker("cryptoTracker.js");

cryptoWorker.onmessage = function (e) {
  const { prices, trends } = e.data;
  updatePriceCharts(prices);
  updateTrendIndicators(trends);
};

function initializeCryptoTracker() {
  cryptoWorker.postMessage({
    type: "start",
    coins: ["BTC", "ETH", "DOGE"],
  });
}

function stopTracking() {
  cryptoWorker.postMessage({
    type: "stop",
  });
}

// cryptoTracker.js file
let isTracking = false;
let priceHistory = {};

self.onmessage = function (e) {
  switch (e.data.type) {
    case "start":
      isTracking = true;
      trackPrices(e.data.coins);
      break;
    case "stop":
      isTracking = false;
      break;
  }
};

const trackPrices = async (coins) => {
  while (isTracking) {
    try {
      const prices = await fetchPrices(coins);
      const trends = await analyzeTrends(prices);

      self.postMessage({
        prices,
        trends,
      });

      await StylePropertyMap(4000);
    } catch (error) {
      self.postMessage({
        error: error.message,
      });
    }
  }
};

// Helper functions (not shown in original example)
async function fetchPrices(coins) {
  // Example implementation
  const prices = {};
  for (const coin of coins) {
    // Fetch price from cryptocurrency API
    const response = await fetch(`https://api.example.com/price/${coin}`);
    prices[coin] = await response.json();
  }
  return prices;
}

function analyzeTrends(prices) {
  // Example implementation
  const trends = {};
  for (const [coin, price] of Object.entries(prices)) {
    // Compare with historical prices
    // Calculate moving averages
    // Determine trend indicators
    trends[coin] = {
      direction: price > previousPrice ? "up" : "down",
      strength: calculateTrendStrength(price),
      // ... other trend indicators
    };
  }
  return trends;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
