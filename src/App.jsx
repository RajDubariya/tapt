import { useEffect, useRef, useState } from "react";
import "./App.css";
import CardDetails from "./components/CardDetails";
import Csv from "./components/Csv";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { parseCsv } from "./utils/csv";
import { fields } from "./utils/fields";

function App() {
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [cardCount, setCardCount] = useState(1);
  const [applyCompanyToAll, setApplyCompanyToAll] = useState(false);
  const [companyFieldValues, setCompanyFieldValues] = useState([]);
  const [personalFieldValues, setPersonalFieldValues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvData, setCsvData] = useState(null);

  const fileInputRef = useRef(null);

  const personalFields = checkedBoxes.filter((box) => box in fields.personal);
  const companyFields = checkedBoxes.filter((box) => box in fields.company);

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
    if (csvData) {
      const firstEntry = csvData[0];
      const companyValues = {};
      for (const key in firstEntry) {
        if (Object.prototype.hasOwnProperty.call(fields.company, key)) {
          companyValues[key] = firstEntry[key];
        }
      }

      setCardCount(csvData.length); //set card count to length of csvData
      setCompanyFieldValues([companyValues]);
    }
  }, [csvData]);

  const handleChange = (e, fieldName, cardIndex, name) => {
    const { value } = e.target;
    if (name === "company") {
      setCompanyFieldValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[cardIndex] = {
          ...updatedValues[cardIndex],
          [fieldName]: value,
        };
        return updatedValues;
      });
    }
    if (name === "personal") {
      setPersonalFieldValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[cardIndex] = {
          ...updatedValues[cardIndex],
          [fieldName]: value,
        };
        return updatedValues;
      });
    }
  };

  const handleCheckBox = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setCheckedBoxes((prev) => [...prev, name]);
    } else {
      setCheckedBoxes((prev) => prev.filter((item) => item !== name));
    }
  };

  const handleButtonClick = () => {
    setIsButtonClicked((prev) => !prev);
  };

  const handleCompanyDetailsCheckbox = (e) => {
    setApplyCompanyToAll(e.target.checked);
  };

  // import csv handling

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target.result;
        parseCsv(text, setCsvData);
      };
      reader.readAsText(file);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {isButtonClicked ? (
        <div className="card-container">
          {Array.from({ length: cardCount }).map((_, index) => (
            <CardDetails
              key={index}
              personalFields={personalFields}
              companyFields={companyFields}
              applyCompanyToAll={applyCompanyToAll}
              handleCompanyDetailsCheckbox={handleCompanyDetailsCheckbox}
              index={index}
              handleChange={(e, fieldName, name) =>
                handleChange(e, fieldName, index, name)
              }
              companyFieldValues={companyFieldValues}
              personalFieldValues={personalFieldValues}
              cardData={csvData}
              cardCount={cardCount}
            />
          ))}
          <div className="csv">
            <button className="btn" onClick={() => setIsModalOpen(true)}>
              + CSV
            </button>
            <Csv
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              companyFieldValues={companyFieldValues}
              applyCompanyToAll={applyCompanyToAll}
              personalFieldValues={personalFieldValues}
              cardCount={cardCount}
              cardData={csvData}
              personalFields={personalFields}
              companyFields={companyFields}
            >
              <button className="btn" onClick={handleFileButtonClick}>
                Import CSV
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Csv>
          </div>
        </div>
      ) : (
        <Home handleCheckBox={handleCheckBox} checkedBoxes={checkedBoxes} />
      )}

      <Footer
        handleButtonClick={handleButtonClick}
        checkedBoxes={checkedBoxes}
        isButtonClicked={isButtonClicked}
        setCheckedBoxes={setCheckedBoxes}
        cardCount={cardCount}
        setCardCount={setCardCount}
      />
    </>
  );
}

export default App;
