const PersonView = (props) => {
  const persons = props.persons;
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default PersonView;
