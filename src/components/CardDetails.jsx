/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fields } from "../utils/fields";
import { populateInputFields } from "../utils/csv";

const CardDetails = ({
  applyCompanyToAll,
  handleCompanyDetailsCheckbox,
  personalFields,
  companyFields,
  cardCount,
  cardData,
  companyFieldValues,
  personalFieldValues,
  setCompanyFieldValues,
  setPersonalFieldValues,
}) => {
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    setCompanyFieldValues((prevValues) => {
      if (cardCount < prevValues.length) {
        return prevValues.slice(0, cardCount);
      } else if (cardCount > prevValues.length) {
        return [
          ...prevValues,
          ...Array(cardCount - prevValues.length).fill({}),
        ];
      } else {
        return prevValues;
      }
    });

    setPersonalFieldValues((prevValues) => {
      if (cardCount < prevValues.length) {
        return prevValues.slice(0, cardCount);
      } else if (cardCount > prevValues.length) {
        return [
          ...prevValues,
          ...Array(cardCount - prevValues.length).fill({}),
        ];
      } else {
        return prevValues;
      }
    });
  }, [cardCount]);

  useEffect(() => {
    if (cardData) {
      cardData.forEach((data, index) => {
        const inputValues = populateInputFields(data);
        setInputValues((prev) => ({
          ...prev,
          [index]: inputValues,
        }));
      });
    }
  }, [cardData]);

  const handleCompanyChange = (e, fieldName, cardIndex) => {
    setCompanyFieldValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[cardIndex] = {
        ...updatedValues[cardIndex],
        [fieldName]: e.target.value,
      };
      return updatedValues;
    });
  };

  const handlePersonalChange = (e, fieldName, cardIndex) => {
    setPersonalFieldValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[cardIndex] = {
        ...updatedValues[cardIndex],
        [fieldName]: e.target.value,
      };
      return updatedValues;
    });
  };

  return (
    <>
      <div className="card-container">
        {Array.from({ length: cardCount }).map((_, index) => (
          <div className="card" key={index}>
            {personalFields.length > 0 && (
              <div>
                <h2>Personal Information</h2>
                {personalFields.map((field) => (
                  <div key={field} className="card-details">
                    <label htmlFor={field}>
                      {fields.personal[field].placeholder}
                    </label>
                    <input
                      type={fields.personal[field].type}
                      name={field}
                      id={field}
                      defaultValue={
                        cardData
                          ? inputValues[index]?.personalValues[field]
                          : (personalFieldValues[index] &&
                              personalFieldValues[index][field]) ||
                            ""
                      }
                      onChange={(e) => handlePersonalChange(e, field, index)}
                    />
                  </div>
                ))}
              </div>
            )}

            {companyFields.length > 0 && <h2>Company Information</h2>}
            {(index === 0 ||
              (companyFields.length > 0 && !applyCompanyToAll)) && (
              <div>
                {companyFields.map((field) => (
                  <div key={field} className="card-details">
                    <label htmlFor={field}>
                      {fields.company[field].placeholder}
                    </label>
                    <input
                      type={fields.company[field].type}
                      name={field}
                      id={field}
                      defaultValue={
                        cardData
                          ? inputValues[index]?.companyValues[field]
                          : (companyFieldValues[index] &&
                              companyFieldValues[index][field]) ||
                            ""
                      }
                      onChange={(e) => handleCompanyChange(e, field, index)}
                    />
                  </div>
                ))}
              </div>
            )}
            {/**/}

            {index !== 0 && applyCompanyToAll && (
              <div>
                {companyFields.map((fieldName, index) => (
                  <div key={index}>{companyFieldValues[0][fieldName]}</div>
                ))}
              </div>
            )}
            {/**/}
            {index === 0 && cardCount > 1 && companyFields.length > 0 && (
              <div className="company-container">
                <input
                  type="checkbox"
                  name="companyDetails"
                  id="companyDetails"
                  onChange={(e) => handleCompanyDetailsCheckbox(e)}
                  checked={applyCompanyToAll}
                />
                <label htmlFor="companyDetails">
                  Apply company information to all cards
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CardDetails;
