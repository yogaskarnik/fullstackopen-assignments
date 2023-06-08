const PersonView = ({ person, removeContact }) => {
  return (
    <div>
      <p>
        {person.name} {person.number}{" "}
        <button onClick={removeContact}>delete</button>
      </p>
    </div>
  );
};

export default PersonView;
