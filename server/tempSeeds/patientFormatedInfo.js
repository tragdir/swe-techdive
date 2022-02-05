
// __dirname is not defined solution
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// *************************************************

import xlsx from "xlsx";


const wb = xlsx.readFile(`${__dirname}/covid.xlsx`);
// console.log(wb.SheetNames);
const patientDataWb = wb.Sheets["Patient Data"];
const imgStudiesWb = wb.Sheets["Imaging Studies"];

// convert the excel file to json
const xlsxToJson = (fileSheetName) => {
  // range removes the first line from the excel 
// const range = xlsx.utils.decode_range(fileSheetName["!ref"]);
// range.s.r = 1;
// fileSheetName["!ref"] = xlsx.utils.encode_range(range);
const data = xlsx.utils.sheet_to_json(fileSheetName);

  return data;
};


const replaceKeys = (object) => {
    Object.keys(object).forEach(function (key) {
      // const twoLower = key.toLowerCase();
      const removeSpace = key.replace(/\s+/g, "_");
      const newKey = removeSpace.toString().toLowerCase();
      if (object[key] && typeof object[key] === "object") {
        replaceKeys(object[key]);
      }
      if (key !== newKey) {
        object[newKey] = object[key];
        delete object[key];
      }
    });
   return object;
};

// Json file holder for patient information
const jsonPatientData = xlsxToJson(patientDataWb);

//  Json file holder for image studies
const jsonImageStudies = xlsxToJson(imgStudiesWb)

// Formated patient information
const patientInfo = replaceKeys(jsonPatientData)

// formated Image studies
export const patientImgStudies = replaceKeys(jsonImageStudies);


// ***********************************************************************

export default patientInfo;
