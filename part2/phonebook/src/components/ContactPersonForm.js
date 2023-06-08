const ContactPersonForm = ({ event, value, onNameChange, onNumberChange }) => {
  return (
    <div>
      <form onSubmit={event}>
        <div>
          name: <input value={value.newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={value.newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ContactPersonForm;
