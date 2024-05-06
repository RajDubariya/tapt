/* eslint-disable react/prop-types */
const Footer = ({
  handleButtonClick,
  checkedBoxes,
  isButtonClicked,
  cardCount,
  setCardCount,
}) => {
  const handleClick = () => {
    handleButtonClick();
  };

  const increase = () => {
    setCardCount((prev) => prev + 1);
  };
  const decrease = () => {
    setCardCount((prev) => prev - 1);
  };

  const handleChange = (e) => {
    setCardCount(e.target.value);
  };

  return (
    <div className="container">
      <button onClick={handleClick} className="btn" disabled={!isButtonClicked}>
        Back
      </button>
      <div>
        <button className="btn" onClick={decrease} disabled={cardCount <= 1}>
          -
        </button>
        <input
          type="number"
          step={1}
          value={cardCount}
          onChange={(e) => handleChange(e)}
          min={1}
        />
        <button className="btn" onClick={increase}>
          +
        </button>
      </div>
      <button
        className="btn"
        onClick={handleButtonClick}
        disabled={checkedBoxes.length === 0 || isButtonClicked}
      >
        Continue
      </button>
    </div>
  );
};

export default Footer;
