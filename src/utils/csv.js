import { fields } from "./fields";

export const convertArrayToCsv = (dataArray) => {
  const header = Object.keys(dataArray[0]).join(",") + "\n";
  const rows = dataArray.map((row) => Object.values(row).join(",")).join("\n");
  return header + rows;
};

export const parseCsv = (text, setData) => {
  const rows = text.split("\n");
  const data = [];

  const headers = rows.shift().split(",");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i].split(",");
    const rowObject = {};

    for (let j = 0; j < row.length; j++) {
      if (headers && headers[j]) {
        rowObject[headers[j]] = row[j];
      } else {
        rowObject[`column_${j}`] = row[j];
      }
    }

    data.push(rowObject);
  }
  setData(data);
};

export const populateInputFields = (data) => {
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
