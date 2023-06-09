const ContactPersonForm = ({
  event,
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={event}>
        <div>
          name: <input value={newName} onChange={onNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default ContactPersonForm;
