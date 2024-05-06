/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { fields } from "../utils/fields";

const CardDetails = ({
  applyCompanyToAll,
  handleCompanyDetailsCheckbox,
  handleChange,
  companyFieldValues,
  personalFieldValues,
  index,
  cardData,
  personalFields,
  companyFields,
  cardCount,
}) => {
  const [inputValues, setInputValues] = useState({
    personalValues: {},
    companyValues: {},
  });

  const companyFieldValue = companyFieldValues[index] || {};
  const personalFieldValue = personalFieldValues[index] || {};

  const populateInputFields = (data) => {
    const personalValues = {};
    const companyValues = {};
    Object.keys(data).forEach((key) => {
      if (key in fields.personal) {
        personalValues[key] = data[key];
      } else if (key in fields.company) {
        companyValues[key] = data[key];
      }
    });
    return { personalValues, companyValues };
  };

  useEffect(() => {
    if (cardData) {
      const inputData = cardData.find((data) => data.id == index);
      if (inputData) {
        const newInputValues = populateInputFields(inputData);
        setInputValues(newInputValues);
      }
    }
  }, [cardData, index]);

  return (
    <>
      <div className="card">
        {personalFields.length > 0 && (
          <div>
            <h2>Personal Information</h2>
            {personalFields.map((checkedBox) => (
              <div key={checkedBox} className="card-details">
                <label htmlFor={checkedBox}>
                  {fields.personal[checkedBox].placeholder}
                </label>
                <input
                  type={fields.personal[checkedBox].type}
                  name={checkedBox}
                  id={checkedBox}
                  defaultValue={
                    cardData
                      ? inputValues.personalValues[checkedBox]
                      : personalFieldValue[checkedBox] || ""
                  }
                  // value={personalFieldValue[checkedBox] || ""}
                  onChange={(e) => handleChange(e, checkedBox, "personal")}
                />
              </div>
            ))}
          </div>
        )}
        {companyFields.length > 0 && <h2>Company Information</h2>}
        {(index === 0 || (!applyCompanyToAll && companyFields.length > 0)) && (
          <div>
            {companyFields.map((checkedBox) => (
              <div key={checkedBox} className="card-details">
                <label htmlFor={checkedBox}>
                  {fields.company[checkedBox].placeholder}
                </label>
                <input
                  type={fields.company[checkedBox].type}
                  name={checkedBox}
                  id={checkedBox}
                  // value={companyFieldValue[checkedBox] || ""}
                  defaultValue={
                    cardData
                      ? inputValues.companyValues[checkedBox]
                      : companyFieldValue[checkedBox] || ""
                  }
                  onChange={(e) => handleChange(e, checkedBox, "company")}
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
              onChange={handleCompanyDetailsCheckbox}
              checked={applyCompanyToAll}
            />
            <label htmlFor="companyDetails">
              Apply company information to all cards
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default CardDetails;
