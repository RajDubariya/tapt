/* eslint-disable react/prop-types */
import { useRef } from "react";
import ReactDOM from "react-dom";
import { convertArrayToCsv, parseCsv } from "../utils/csv";

const Csv = ({
  isOpen,
  onClose,
  personalFieldValues,
  companyFieldValues,
  applyCompanyToAll,
  cardCount,
  cardData,
  personalFields,
  companyFields,
  setCsvData,
}) => {
  const modalRef = useRef();
  const fileInputRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const exportCsv = () => {
    const data = [];

    for (let i = 0; i < cardCount; i++) {
      let companyValues = companyFieldValues[i] || {};
      let personalValues = personalFieldValues[i] || {};

      if (cardData && cardData[i]) {
        const previousValues = cardData[i];

        companyValues = { ...previousValues, ...companyValues };
        personalValues = { ...companyValues, ...personalValues };
      }
      if (applyCompanyToAll) {
        companyValues = companyFieldValues[0];
      }

      const filteredValues = {};
      // to export availabe fields only
      personalFields.forEach((field) => {
        filteredValues[field] = personalValues[field];
      });
      companyFields.forEach((field) => {
        filteredValues[field] = companyValues[field];
      });

      const isDuplicate = data.some((entry) =>
        Object.entries(entry).every(
          ([key, value]) => filteredValues[key] === value
        )
      );

      if (!isDuplicate) {
        data.push({ id: i, ...filteredValues });
      }
    }

    const csvContent = convertArrayToCsv(data);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "card_data.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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

  return isOpen
    ? ReactDOM.createPortal(
        <div
          className="modal-overlay"
          onClick={handleOverlayClick}
          ref={modalRef}
        >
          <div className="modal">
            <div>
              <button className="btn" onClick={exportCsv}>
                Export CSV
              </button>
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
            </div>
            <button className="modal-close btn" onClick={() => onClose()}>
              Close
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Csv;
