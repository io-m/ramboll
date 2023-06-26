class Person {
    constructor() {
        this.personName = {};
    }

    // Setter method for setting the prefix
    setPrefix(prefix) {
        this.personName.prefix = prefix;
    }

    // Getter method for getting the given name
    getGivenName() {
        return this.personName.givenName;
    }

    // Getter method for getting the prefix
    getPrefix() {
        return this.personName.prefix;
    }

    // Setter method for setting the given name
    setGivenName(givenName) {
        this.personName.givenName = givenName;
    }
}

// Since JS does not have interfaces we create another class that will be extended by another class
class PersonProvider {
    // Method to get a person by given name
    getPerson(persons, givenName) {
        // .map method would be more readable, but I wanted to be as much as possible 1 on 1 with php script
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].getGivenName() === givenName) {
                return persons[i];
            }
        }
    }

    // Method to filter persons by prefix
    filterPrefix(persons, prefix) {
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].getPrefix() === prefix) {
                filteredPersons.push(persons[i]);
            }
        }
        return filteredPersons;
    }
}

class LocatorPersonProvider extends PersonProvider {}

class PersonProviderFactory {
    static createProvider(type) {
        if (type === 'manual') {
            return new LocatorPersonProvider();
        } else {
            return null;
        }
    }
}

const person = new Person();
person.setPrefix("Mr.");
person.setGivenName("John");
const person1 = new Person();
person1.setPrefix("Ms.");
person1.setGivenName("Jane");
const person2 = new Person();
person2.setPrefix("Ms.");
person2.setGivenName("Valery");
const person3 = new Person();
person3.setPrefix("Mr.");
person3.setGivenName("Vincent");
const person4 = new Person();
person4.setPrefix("Mx.");
person4.setGivenName("Charlie");

const persons = [person, person1, person2, person3, person4];

const config = 'manual';

const provider = PersonProviderFactory.createProvider(config);

if (provider === null) {
    console.log("Provider is null");
    process.exit();
}

const retrievedPerson = provider.getPerson(persons, "John");
const filteredPersons = provider.filterPrefix(persons, "Ms.");

// If there is a John created we get the prefix and name
if (retrievedPerson) {
    console.log(retrievedPerson.getPrefix());
    console.log(retrievedPerson.getGivenName());
}
console.log("All ladies --> Ms(s):");

filteredPersons.forEach((person) => {
    console.log(person.getPrefix());
    console.log(person.getGivenName());
});
