const Input = ({ name, title, handleCheckBox, isChecked }) => {
  return (
    <div>
      <input
        onChange={(e) => handleCheckBox(e)}
        type="checkbox"
        id={name}
        name={name}
        checked={isChecked}
      />
      <label htmlFor={name}>{title}</label>
    </div>
  );
};

export default Input;
