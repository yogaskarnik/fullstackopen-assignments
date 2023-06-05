const ContactPersonForm = ({
  event,
  value,
  onContactChange,
  onNumberChange,
}) => {
  return (
    <div>
      <form onSubmit={event}>
        <div>
          name: <input value={value.newName} onChange={onContactChange} />
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
