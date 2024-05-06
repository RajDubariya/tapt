import { useState } from "react";
import Layout from "./Layout";
import Footer from "./common/Footer";
import CheckBoxFields from "./common/CheckBoxFields";

const Home = () => {
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [cardCount, setCardCount] = useState(1);

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked((prev) => !prev);
  };

  const handleCheckBox = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setCheckedBoxes((prev) => [...prev, name]);
    } else {
      setCheckedBoxes((prev) => prev.filter((item) => item !== name));
    }
  };
  return (
    <>
      <Layout
        cardCount={cardCount}
        setCardCount={setCardCount}
        isButtonClicked={isButtonClicked}
        checkedBoxes={checkedBoxes}
      />
      {!isButtonClicked && (
        <CheckBoxFields
          checkedBoxes={checkedBoxes}
          handleCheckBox={handleCheckBox}
        />
      )}
      <Footer
        checkedBoxes={checkedBoxes}
        cardCount={cardCount}
        setCardCount={setCardCount}
        isButtonClicked={isButtonClicked}
        handleButtonClick={handleButtonClick}
      />
    </>
  );
};

export default Home;
