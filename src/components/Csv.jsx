/* eslint-disable react/prop-types */
import { useRef } from "react";
import ReactDOM from "react-dom";
import { convertArrayToCsv } from "../utils/csv";

const Csv = ({
  isOpen,
  onClose,
  personalFieldValues,
  companyFieldValues,
  applyCompanyToAll,
  cardCount,
  children,
  cardData,
  personalFields,
  companyFields,
}) => {
  const modalRef = useRef();

  const handleClose = () => {
    onClose();
  };

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
              {children}
            </div>
            <button className="modal-close btn" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Csv;
