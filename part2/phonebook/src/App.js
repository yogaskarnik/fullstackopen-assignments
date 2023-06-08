import { useState, useEffect } from "react";
import ContactPersonForm from "./components/ContactPersonForm";
import PersonView from "./components/PersonView";
import FilterView from "./components/FilterView";
import personService from "./services/person";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    personService.getAll().then((newContact) => {
      setPersons(newContact);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const isDuplicate = persons.filter((person) => person.name === newName);
    if (isDuplicate.length !== 0) {
      window.confirm(`${newName} is already added to phonebook`);
      return;
    }

    const contact = {
      name: newName,
      number: newNumber,
    };

    personService.create(contact).then((newContact) => {
      setPersons(persons.concat(newContact));
      setNewName("");
      setNewNumber("");
    });
  };

  const removeContact = (toDelete) => {
    personService.deleteContact(toDelete.id, toDelete).then(() => {
      window.confirm(`Delete ${toDelete.name}`);
      setPersons(persons.filter((person) => person.id !== toDelete.id));
    });
  };

  const handleContactChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    const personFilter = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setNewSearch(event.target.value);
    setPersons(personFilter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterView value={newSearch} onSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <ContactPersonForm
        event={addContact}
        value={[newName, newNumber]}
        onContactChange={handleContactChange}
        onNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {persons.map((person) => (
        <PersonView
          key={person.id}
          person={person}
          removeContact={() => removeContact(person)}
        />
      ))}
    </div>
  );
}

export default App;
