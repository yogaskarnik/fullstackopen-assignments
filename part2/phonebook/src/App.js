import { useState, useEffect } from "react";
import ContactPersonForm from "./components/ContactPersonForm";
import PersonView from "./components/PersonView";
import FilterView from "./components/FilterView";
import personService from "./services/person";
import "./index.css";
import Notification from "./components/Notification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    personService.getAll().then((newContact) => {
      setPersons(newContact);
    });
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    const isDuplicate = persons.find((person) => person.name === newName);

    if (isDuplicate !== undefined) {
      let duplicate = { ...isDuplicate, number: newNumber };
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      personService.update(duplicate.id, duplicate).then((updatedContact) => {
        setPersons(
          persons.map((person) =>
            person.id !== duplicate.id ? person : updatedContact
          )
        );
        setNewName(null);
        setNewNumber(null);
        setSuccessMessage(`Updated ${duplicate.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
    if (newName && newNumber) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.create(newPerson).then((newContact) => {
        setPersons(persons.concat(newContact));
        setNewName("");
        setNewNumber("");
        setSuccessMessage(`Added ${newPerson.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };

  const removeContact = (toDelete) => {
    personService
      .deleteContact(toDelete.id, toDelete)
      .then(() => {
        window.confirm(`Delete ${toDelete.name}`);
        setPersons(persons.filter((person) => person.id !== toDelete.id));
      })
      .catch(() => {
        setErrorMessage(
          `Information of ${toDelete.name} has already been removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    setSuccessMessage(`Removed ${toDelete.name}`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleNameChange = (event) => {
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
      <h1>Phonebook</h1>
      <Notification
        message={errorMessage || successMessage}
        type={errorMessage ? "error" : "succes"}
      />
      <FilterView value={newSearch} onSearchChange={handleSearchChange} />
      <h3>Add a new</h3>
      <ContactPersonForm
        event={addContact}
        value={[newName, newNumber]}
        onNameChange={handleNameChange}
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
