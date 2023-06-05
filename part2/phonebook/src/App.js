import { useState, useEffect } from "react";
import ContactPersonForm from "./components/ContactPersonForm";
import PersonView from "./components/PersonView";
import FilterView from "./components/FilterView";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

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
      {console.log(persons)}
      {<PersonView persons={persons} />}
    </div>
  );
}

export default App;
