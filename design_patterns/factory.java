/*
 * Factor Method Design Pattern
 * 
 * This design pattern is used when we have a super class
 * with multiple subclasses and we want to create an instance
 * of a subclass based on some input criteria.
 * 
 * This design pattern's implementation takes out the responsibility
 * of instantiating the subclass from client program to the factory class.
 * 
 * Factory method design pattern implementation can be done by
 * interfaces, or abstract classes, or a simple java class.
 * 
 * Follow the example below:
 * 
 * 
 */

public abstract class Computer {
    public abstract String getRAM();

    public abstract String getHDD();

    public abstract String getCPU();

    @Override
    public String toString() {
        return "RAM = " + this.getRAM() + ", HDD = " + this.getHDD() + ", CPU = " + this.getCPU();
    }
}

public class PC extends Computer {
    private String ram;
    private String hdd;
    private String cpu;

    public PC(String ram, String hdd, String cpu) {
        this.ram = ram;
        this.hdd = hdd;
        this.cpu = cpu;
    }

    @Override
    public String getRAM() {
        return this.ram;
    }

    @Override
    public String getHDD() {
        return this.hdd;
    }

    @Override
    public String getCPU() {
        return this.cpu;
    }
}

public class Server extends Computer {
    private String ram;
    private String hdd;
    private String cpu;

    public Server(String ram, String hdd, String cpu) {
        this.ram = ram;
        this.hdd = hdd;
        this.cpu = cpu;
    }

    @Override
    public String getRAM() {
        return this.ram;
    }

    @Override
    public String getHDD() {
        return this.hdd;
    }

    @Override
    public String getCPU() {
        return this.cpu;
    }
}

// Lets make A factory class to create instances of PC and Server

public class ComputerFactory {
    public static Computer getComputer(String type, String ram, String hdd, String cpu) {
        if ("PC".equalsIgnoreCase(type))
            return new PC(ram, hdd, cpu);
        else if ("Server".equalsIgnoreCase(type))
            return new Server(ram, hdd, cpu);
        return null;
    }
}

// Now lets test the factory class

public class Testfactory {
    public static void main(String[] args) {
        Computer pc = ComputerFactory.getComputer("PC", "2GB", "500GB", "2.4GHz");
        Computer server = ComputerFactory.getComputer("Server", "16GB", "1TB", "2.9GHz");
        System.out.println("Factory PC Config::" + pc); // Factory PC Config::RAM = 2GB, HDD = 500GB, CPU = 2.4GHz
        System.out.println("Factory Server Config::" + server); // Factory Server Config::RAM = 16GB, HDD = 1TB, CPU =
                                                                // 2.9GHz
    }
}

// When I give PC as input, it returns a PC object.
// When I give Server as input, it returns a Server object.
// This is the factory method design pattern.
// On basis of type variable, I am instantiating the relevant class.

/*
 * Advantages of Factory Method Design Pattern:
 * 1. It provides approach to code for interface rather than implementation.
 * 2. It makes our code more robust, maintainable and easy to extend.
 * 3. It provides abstraction between implementation and client classes through
 * inheritance.
 */