class Person {
  private personName: { prefix?: string; givenName?: string } = {}

  // Setter method for setting the prefix
  setPrefix(prefix: string): void {
    this.personName.prefix = prefix
  }

  // Getter method for getting the given name
  getGivenName(): string | undefined {
    return this.personName.givenName
  }

  // Getter method for getting the prefix
  getPrefix(): string | undefined {
    return this.personName.prefix
  }

  // Setter method for setting the given name
  setGivenName(givenName: string): void {
    this.personName.givenName = givenName
  }
}

interface PersonProvider {
  // Method to get a person by given name
  getPerson(persons: Person[], givenName: string): Person | undefined

  // Method to filter persons by prefix
  filterPrefix(persons: Person[], prefix: string): Person[]
}

class LocatorPersonProvider implements PersonProvider {
  // Method to get a person by given name
  getPerson(persons: Person[], givenName: string): Person | undefined {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].getGivenName() === givenName) {
        return persons[i]
      }
    }
  }

  // Method to filter persons by prefix
  filterPrefix(persons: Person[], prefix: string): Person[] {
    const filteredPersons: Person[] = []
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].getPrefix() === prefix) {
        filteredPersons.push(persons[i])
      }
    }
    return filteredPersons
  }
}

class PersonProviderFactory {
  static createProvider(type: string): PersonProvider | null {
    if (type === 'manual') {
      return new LocatorPersonProvider() // Create a LocatorPersonProvider instance
    } else {
      return null // Return null if the type is not supported
    }
  }
}

// Create instances of Person and set their prefixes and given names
const person = new Person()
person.setPrefix('Mr.')
person.setGivenName('John')
const person1 = new Person()
person1.setPrefix('Ms.')
person1.setGivenName('Jane')
const person2 = new Person()
person2.setPrefix('Ms.')
person2.setGivenName('Valery')
const person3 = new Person()
person3.setPrefix('Mr.')
person3.setGivenName('Vincent')
const person4 = new Person()
person4.setPrefix('Mx.')
person4.setGivenName('Charlie')

const persons: Person[] = [person, person1, person2, person3, person4] // Array of persons

const config = 'manual' // Configuration for creating the provider

// Create a provider using the PersonProviderFactory
const provider: PersonProvider | null =
  PersonProviderFactory.createProvider(config)

if (provider === null) {
  console.log('Provider is null')
  process.exit()
}

// Retrieve a person with the given name "John"
const retrievedPerson: Person | undefined = provider.getPerson(persons, 'John')

// Filter persons with the prefix "Ms."
const filteredPersons: Person[] = provider.filterPrefix(persons, 'Ms.')

// Print the retrieved person's prefix and given name
if (retrievedPerson) {
  console.log(retrievedPerson.getPrefix())
  console.log(retrievedPerson.getGivenName())
  console.log('Ms(s):')

  // Print the prefixes and given names of the filtered persons
  filteredPersons.forEach((person) => {
    console.log(person.getPrefix())
    console.log(person.getGivenName())
  })
}
