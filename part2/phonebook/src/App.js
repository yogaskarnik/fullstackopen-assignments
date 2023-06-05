import { useState } from "react";
import ContactPersonForm from "./components/ContactPersonForm";
import PersonView from "./components/PersonView";
import FilterView from "./components/FilterView";

function App() {
  const [persons, setPersons] = useState([
    { id: 1, name: "Arto Hellas", number: "040 - 1234567" },
    { id: 2, name: "Ada Lovelace", number: "033 - 1234567" },
    { id: 3, name: "Martin Fowler", number: "034 - 1234567" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    const isDuplicate = persons.filter((person) => person.name === newName);
    if (isDuplicate.length !== 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const contact = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons(persons.concat(contact));
    setNewName("");
    setNewNumber("");
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
      <PersonView persons={persons} />
    </div>
  );
}

export default App;
