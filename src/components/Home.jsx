/* eslint-disable react/prop-types */
import { fields } from "../utils/fields";
import Input from "./Input";

const Home = ({ handleCheckBox, checkedBoxes }) => {
  const personalFieldsArray = Object.entries(fields.personal).map(
    ([name, { type, placeholder }]) => ({
      name,
      type,
      placeholder,
    })
  );
  const companyFieldsArray = Object.entries(fields.company).map(
    ([name, { type, placeholder }]) => ({
      name,
      type,
      placeholder,
    })
  );

  return (
    <>
      {personalFieldsArray.map((field, index) => (
        <Input
          key={index}
          name={field.name}
          title={field.placeholder}
          handleCheckBox={handleCheckBox}
          isChecked={checkedBoxes.includes(field.name)}
        />
      ))}
      {companyFieldsArray.map((field, index) => (
        <Input
          key={index}
          name={field.name}
          title={field.placeholder}
          handleCheckBox={handleCheckBox}
          isChecked={checkedBoxes.includes(field.name)}
        />
      ))}
    </>
  );
};

export default Home;
