/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { fields } from "../utils/fields";
import CardDetails from "./CardDetails";
import Csv from "./Csv";

const Layout = ({ cardCount, setCardCount, isButtonClicked, checkedBoxes }) => {
  const [companyFieldValues, setCompanyFieldValues] = useState([]);
  const [personalFieldValues, setPersonalFieldValues] = useState([]);

  const [applyCompanyToAll, setApplyCompanyToAll] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [csvData, setCsvData] = useState(null);

  const personalFields = checkedBoxes.filter((box) => box in fields.personal);
  const companyFields = checkedBoxes.filter((box) => box in fields.company);

  // csv data
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
  }, []);

  const handleCompanyDetailsCheckbox = useCallback((e) => {
    setApplyCompanyToAll(e.target.checked);
  }, []);

  return (
    <>
      {isButtonClicked ? (
        <>
          <CardDetails
            companyFieldValues={companyFieldValues}
            personalFieldValues={personalFieldValues}
            setCompanyFieldValues={setCompanyFieldValues}
            setPersonalFieldValues={setPersonalFieldValues}
            applyCompanyToAll={applyCompanyToAll}
            handleCompanyDetailsCheckbox={handleCompanyDetailsCheckbox}
            personalFields={personalFields}
            companyFields={companyFields}
            cardCount={cardCount}
            cardData={csvData}
          />

          <div className="csv">
            <button className="btn" onClick={() => setIsModalOpen(true)}>
              + CSV
            </button>
            <Csv
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              companyFieldValues={companyFieldValues}
              personalFieldValues={personalFieldValues}
              personalFields={personalFields}
              companyFields={companyFields}
              cardCount={cardCount}
              applyCompanyToAll={applyCompanyToAll}
              cardData={csvData}
              setCsvData={setCsvData}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default Layout;
