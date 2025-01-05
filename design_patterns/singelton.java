/*
 * Singleton:
 * This design pattern restricts the instantiation of a class
 * and ensures that there is only one instance of the class in the JVM.
 * 
 * This is useful when you want to control the number of instances of a class
 * that can be created, or when you want to ensure that a class has a single
 * point of access.
 * 
 * The singleton class must provide a global access point to get the instance of
 * the class.
 * 
 * Useful for logging, drivers objects, caching, and thread pool.
 * 
 * JAVA singleton pattern Implementation:
 * 
 * There are multiple ways to implement the singleton pattern in Java.
 * 
 * 1- Eager Initialization
 * 2- Static block initialization
 * 3- Lazy Initialization
 * 4- Thread Safe Singleton
 * 5- Bill Pugh Singleton Implementation
 * 
 * All these methods have few things in common:
 * 1- Private constructor
 * 2- Private static variable
 * 3- Public static method to get the instance of the class(global access point)
 * 
 */

/*
 * 1 - Eager Initialization:
 * 
 * Eager initialization of singleton class creates the instance of the class
 * when it is being loaded. he drawback is that instance is created even if
 * it is not needed.
 * 
 * If the singelton class is not using too much resources, this is a good.
 */

// ============================================

// package com.journaldev.singleton;

public class EagerInitializedSingleton {

    private static final EagerInitializedSingleton instance = new EagerInitializedSingleton();

    // private constructor to avoid client applications using the constructor
    private EagerInitializedSingleton() {
    }

    public static EagerInitializedSingleton getInstance() {
        return instance;
    }
}

// ============================================

/*
 * 2 - Static block initialization:
 * 
 * Static block initialization of singleton class is similar to eager
 * initialization,
 * except that instance of class is created in the static block that provides
 * the
 * option for exception handling.
 * 
 * Both eager initialization and static block initialization create the instance
 * even before it’s being used and that is not the best practice to use.
 * 
 */

// ============================================

// package com.journaldev.singleton;

public class StaticBlockSingleton {

    private static StaticBlockSingleton instance;

    private StaticBlockSingleton() {
    }

    // static block initialization for exception handling
    static {
        try {
            instance = new StaticBlockSingleton();
        } catch (Exception e) {
            throw new RuntimeException("Exception occurred in creating singleton instance");
        }
    }

    public static StaticBlockSingleton getInstance() {
        return instance;
    }
}

// ============================================

/*
 * 3 - Lazy Initialization:
 * 
 * Lazy initialization of singleton class is when the instance of the class
 * is created in the global access method.
 * But this method doesn't provide thread safety.
 * If there is a single thread based app, this is a good approach.
 * But in multi-threaded and distributed environment, this is not a good
 * approach.
 * Because each thread will create its own instance of the class.
 * And this destroys the singleton paattern
 */

// ============================================

// package com.journaldev.singleton;

public class LazyInitializedSingleton {

    private static LazyInitializedSingleton instance;

    private LazyInitializedSingleton() {
    }

    public static LazyInitializedSingleton getInstance() {
        if (instance == null) {
            instance = new LazyInitializedSingleton();
        }
        return instance;
    }
}

// ============================================

/*
 * Thread Safe Initialization:
 * 
 * Thread safe initialization of singleton class is when the
 * gloabl access method is synchronized.
 * 
 * But this method is expensive because of the cost associated with the
 * synchronized method, and it reduces the performance of your program.
 * 
 * To avoid this, we have double checked locking principle.
 * In this approach, the synchronized block is used inside the if condition with
 * an additional check to ensure that only one instance of a singleton class is
 * created
 * 
 */

// ============================================

// package com.journaldev.singleton;

public class ThreadSafeSingleton {

    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton() {
    }

    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }
}

// to avoid the performance issue of synchronized method, we can use double
// checked locking principle

public class ThreadSafeSingleton {

    private static ThreadSafeSingleton instance;

    private ThreadSafeSingleton() {
    }

    // double checked locking principle
    public static ThreadSafeSingleton getInstanceUsingDoubleLocking() {
        if (instance == null) {
            synchronized (ThreadSafeSingleton.class) {
                if (instance == null) {
                    instance = new ThreadSafeSingleton();
                }
            }
        }
        return instance;
    }
}

// ============================================

/*
 * Bill Pugh Singleton Implementation:
 * 
 * This is the most popular method to implement the singleton pattern in Java.
 * 
 * This method uses the concept of inner static helper class to implement the
 * singleton pattern.
 * 
 * The inner static helper class is loaded only when the getInstance() method is
 * called. And not when the class is loaded. See the relevant code below
 * 
 * This is the best method to implement the singleton pattern in Java.
 */

// ============================================

// package com.journaldev.singleton;

public class BillPughSingleton {

    private BillPughSingleton() {
    }

    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = new BillPughSingleton();
    }

    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}
// ============================================