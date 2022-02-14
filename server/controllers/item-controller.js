/* eslint-disable no-undef, arrow-body-style */

//import { Exam } from "../models/exam-model.js";
//import { Patient } from "../models/patient-model.js";

export const getItems = (schemaName, name) => {
  return async (req, res) => {
    await schemaName.find({}, (err, items) => {
      if (err) {
        console.error(`Error getting ${name} data': ${err}`);
        return res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!items.length) {
        console.error(`${name} not found`);
        return res.status(200).json([]);
      }
      console.log(`Fetching successful!`);
      console.log(items)
      return res.status(200).json(items);
    }).catch(err => {
      console.error(`Error fetching the data': ${err}`);
      console.error(err);
      return res.status(404).json({
        success: false,
        error: err,
      });
    });
  }
}


export const getItemById = (schemaName, name) => {

  return async (req, res) => {
    await schemaName.find(name === "exam" ? { patient: req.params.id } : { _id: req.params.id }, (err, items) => {
      if (err) {
        console.error(`Status 400: getItemsById: ${err}`);
        throw res.status(400).json({
          success: false,
          error: err,
        });
      }
      if (!items.length) {
        console.error(`Hack_avengers - 404 in 'getItemsById': ${name} not found`);
        return res.status(404).json({
          success: false,
          error: `${name} not found`,
        });
      }
      console.log(`Hack_avengers - 200 in 'getItemById': ${name} fetched!`);
      return res.status(200).json(items);
    }).catch(err => {
      console.error(`Hack_avengers - caught error in 'getItemsById': ${err}`);
      console.error(err);
      return err;
    });
  };
}

export const createItem = (schemaName, name) => {
  return (req, res) => {
    const body = req.body;
    const id = req.params.id;

    // patient
    if (!body) {
      return res.status(400).json({
        success: false,
        error: `You must provide an ${name}.`,
      });
    }

    let item;
    if (name === "exam") {
      item = new schemaName({
        image: body.image,
        score: body.score,
        examInfo: body.examInfo,
        keyFindings: body.keyFindings,
        patient: id
      }); //create new record for exam
      console.log(item)
    } else {
      item = new schemaName(body); //create new record
    }



    if (!item) {
      console.error(`Hack_avengers - 400 in create${name}: '${name}' is malformed.`);
      return res.status(400).json({
        success: false,
        message: `'${name}' is malformed`,
      });
    }


    return item
      .save()
      .then(() => {
        console.error(`Hack_avengers - 201 in 'createItem': ${name} created!`);
        return res.status(201).json({
          success: true,
          id: item._id,
          message: `${name} created!`,
        });
      })
      .catch(err => {
        console.error(`Hack_avengers - caught error in 'createItem'`);
        Object.keys(err.errors).forEach(errorKey => {
          console.error(`Hack_avengers ERROR for: ${errorKey}`);
          console.error(
            `Hack_avengers => ${((err.errors[errorKey] || {}).properties || {}).message
            }`,
          );
        });
        return res.status(400).json({
          success: false,
          error: err.errors,
          message: err.errors.name,
        });
      });
  };
}

export const updateItem = (schemaName, name) => {
  return async (req, res) => {

    const body = req.body;
    const arryOfItem = [body]
    if (!body) {
      console.error(`Hack_avengers - 400 in 'update${name}': You must provide ${name} to update.`);
      return res.status(400).json({
        success: false,
        error: `You must provide ${name} to update.`,
      });
    }

    const itemForUpdate = { ...arryOfItem }[0]


    try {
      await schemaName.findOneAndUpdate(name === "exam" ? { patient: req.params.id } : { _id: req.params.id }, itemForUpdate);
    } catch (err) {
      console.error(`Hack_avengers - caught error in 'update${name}': ${err}`);
      console.error(err);
      return res.status(400).json({
        success: false,
        error: err,
      });
    }

    console.log(`Hack_avengers - 200 in 'update${name}': ${name} updated!`);
    return res.status(200).json({
      success: true,
      id: req.params.id,
      message: `${name} updated!`,
    });
  };
}

export const deleteItem = (PatientSchema, ExamSchema, name) => {
  return async (req, res) => {
    // delete from both patient and exam
    if (name === "patient") {
      //** DELETING FROM PATIENT SCHEMA*/
      await PatientSchema.findOneAndDelete({ _id: req.params.id }, (err, item) => {
        if (err) {
          console.error(`Hack_avengers - 400 in 'delete${name}': ${err}`);
          return res.status(400).json({
            succes: false,
            error: err,
          });
        }

        if (!item) {
          console.error(`Hack_avengers - 400 in 'delete${name}': ${name} not found!`);
          return res.status(400).json({
            success: false,
            error: `${name} not found!`,
          });
        }

        // return res.status(200).json({
        //   success: true,
        //   item: item,
        // });
      }).catch(err => {
        console.error(`Hack_avengers - caught error in 'delete${name}': ${err}`);
        console.error(err);
        return err;
      });
      //if (deletedPatient.Exam) {

      //** DELETING FROM EXAM SCHEMA*/
        await ExamSchema.deleteOne({ patient: req.params.id }, (err, item) => {
          if (err) {
            console.error(`Hack_avengers - 400 in 'delete exam': ${err}`);
            return res.status(400).json({
              succes: false,
              error: err,
            });
          }

          if (!item) {
            console.error(`Hack_avengers - 400 in 'delete${name}': ${name} not found!`);
            return res.status(400).json({
              success: false,
              error: `exam data not found!`,
            });
          }

          return res.status(200).json({
            success: true,
            item: item,
          });
        }).catch(err => {
          console.error(`Hack_avengers - caught error in 'delete${name}': ${err}`);
          console.error(err);
          return err;
        });
      //}
    } else {

      // delete only from exam schema
      await ExamSchema.findOneAndDelete({ patient: req.params.id }, (err, item) => {
        if (err) {
          console.error(`Hack_avengers - 400 in 'delete${name}': ${err}`);
          return res.status(400).json({
            succes: false,
            error: err,
          });
        }

        if (!item) {
          console.error(`Hack_avengers - 400 in 'delete${name}': ${name} not found!`);
          return res.status(400).json({
            success: false,
            error: `${name} not found!`,
          });
        }

        return res.status(200).json({
          success: true,
          item: item,
        });
      }).catch(err => {
        console.error(`Hack_avengers - caught error in 'delete${name}': ${err}`);
        console.error(err);
        return err;
      });

    }
  };
}

// export const getFromTwoSchema = (patientName, examName) => {
//   return async (req, res) => {

//     let examsDatas = await examName.find({});

//     const allData = examsDatas.map(async exam => {
//       const patient = await patientName.find({_id: exam.patient});
//       //console.log("Inside allData: ");
//       return {...exam._doc, ...patient._doc};
//     });


//     const items = await Promise.all(allData);

//     //console.log("All Items: ");

//     console.log(items);
//     return res.status(200).json(items);
//   };
// };

export const getFromTwoSchema = (patientName, examName) => {
  return async (req, res) => {

    let examsDatas = await examName.find({});

    const allData = examsDatas.map(async exam => {
      const patient = await patientName.findOne({_id: exam.patient});
      console.log("Inside allData: ");
      console.log(patient);
      return { ...patient._doc,...exam._doc};
    });


    const items = await Promise.all(allData);

    console.log("All Items: ");

    //console.log(items);
    return res.status(200).json(items);
  };
};


// [
//   {
//     "score": [
//           0,
//           1,
//           3,
//           1,
//           0,
//           2
//       ],
//       "_id": "62081d1bc83c452ef8e34e47",
//       "description": "XR CHEST AP PORTABLE",
//       "key_findings": "Subtle patchy bibasilar and right upper lobe airspace  opacities",
//       "image": "COVID-19-AR-16434409_XR_CHEST_AP_PORTABLE_1.png",
//       "patient": "6205576aaa478f466cca3809",
//       "__v": 0,
//       "createdAt": "2022-02-12T20:48:27.574Z",
//       "updatedAt": "2022-02-12T20:48:27.574Z",
//       "$__": {
//           "strictMode": true,
//           "selected": {},
//           "getters": {},
//           "_id": "6205576aaa478f466cca3809",
//           "wasPopulated": false,
//           "activePaths": {
//               "paths": {
//                   "_id": "init",
//                   "age": "init",
//                   "sex": "init",
//                   "race": "init",
//                   "zip": "init",
//                   "latest_bmi": "init",
//                   "mortality": "init",
//                   "icu_admit": "init",
//                   "__v": "init",
//                   "createdAt": "init",
//                   "updatedAt": "init"
//               },
//               "states": {
//                   "ignore": {},
//                   "default": {},
//                   "init": {
//                       "_id": true,
//                       "age": true,
//                       "sex": true,
//                       "race": true,
//                       "zip": true,
//                       "latest_bmi": true,
//                       "mortality": true,
//                       "icu_admit": true,
//                       "__v": true,
//                       "createdAt": true,
//                       "updatedAt": true
//                   },
//                   "modify": {},
//                   "require": {}
//               },
//               "stateNames": [
//                   "require",
//                   "modify",
//                   "init",
//                   "default",
//                   "ignore"
//               ]
//           },
//           "pathsToScopes": {},
//           "cachedRequired": {},
//           "session": null,
//           "$setCalled": {},
//           "emitter": {
//               "_events": {},
//               "_eventsCount": 0,
//               "_maxListeners": 0
//           },
//           "$options": {
//               "skipId": true,
//               "isNew": false,
//               "willInit": true,
//               "defaults": true
//           }
//       },
//       "isNew": false,
//       "$locals": {},
//       "$op": null,
//       "_doc": {
//           "_id": "6205576aaa478f466cca3809",
//           "age": 51,
//           "sex": "M",
//           "race": "BLACK OR AFRICAN AMERICAN",
//           "zip": 722,
//           "latest_bmi": 37.7,
//           "mortality": "N",
//           "icu_admit": "N",
//           "__v": 0,
//           "createdAt": "2022-02-10T18:20:26.451Z",
//           "updatedAt": "2022-02-10T18:20:26.451Z"
//       },
//       "$init": true
//   };
// export const getItemByIdFromTwoSchema = (patientName, examName, name) => {

//   return async (req, res) => {
//     let exam = await examName.find({patient: req.params.id});
//     //console.log(examsDatas)

//     const patient = await patientName.find({_id: req.params.id});
//       //console.log(patient);
//     var bothData = {...exam, ...patient}


//     //console.log("All Items: ");

//     console.log(bothData);
//     return res.status(200).json(bothData);
//   };
// };



//**FUNCTION TO INSER DATA FROM EXCEL (NO NEEDED THIS PROJECT) */
// export const insertManyData = (schemaName)=>{
//   return async (req, res)=>{
//     await schemaName.insertMany([
//       {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Subtle patchy bibasilar and right upper lobe airspace  opacities",
//         "image": "COVID-19-AR-16434409_XR_CHEST_AP_PORTABLE_1.png",
//         "patient": "6205576aaa478f466cca3809",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Streaky opacities in bilateral mid and left lower lung.  Patchy opacities  in the right lower lung.  No pleural effusion.  ",
//         "image": "COVID-19-AR-16434381_XR_CHEST_AP_PORTABLE_2.png",
//         "patient": "6205576aaa478f466cca380b",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP ONLY",
//         "key_findings": "Lung volumes remain low but there appears to have been clearing since  prior radiograph",
//         "image": "COVID-19-AR-16434381_XR_CHEST_AP_ONLY_1.png",
//         "patient": "6205576aaa478f466cca380c",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST PA AND LATERAL",
//         "key_findings": " patchy increased opacity in the lower lobes bilaterally, more pronounced on the lateral view.  Small pleural effusions ",
//         "image": "COVID-19-AR-16406513_XR_CHEST_PA_AND_LATERAL_2.png",
//         "patient_id": "6205576aaa478f466cca380d",
//         "score": randomBrixia()

//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Patchy, airspace opacities are seen within the bilateral lower lungs, predominantly left-sided.  Haziness of the left costophrenic angle.  ",
//         "image": "COVID-19-AR-16406513_XR_CHEST_AP_PORTABLE_3.png",
//         "patient": "6205576aaa478f466cca380d",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "No relevant findings",
//         "image": "COVID-19-AR-16439216_XR_CHEST_AP_PORTABLE_3.png",
//         "patient": "6205576aaa478f466cca380e",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Interval development of patchy areas of consolidation predominately in  the lung bases suspicious for infection.",
//         "image": "COVID-19-AR-16439216_XR_CHEST_AP_PORTABLE_3.png",
//         "patient": "6205576aaa478f466cca380f",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "There has been development of bilateral lower lobe airspace disease  consistent with multilobar pneumonia",
//         "image": "COVID-19-AR-16406491_XR_CHEST_AP_PORTABLE_1.png",
//         "patient": "6205576aaa478f466cca3810",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Patchy ground-glass opacities in the left lung and in the right lower  lobe which may be infectious in etiology",
//         "image": "COVID-19-AR-16406496_XR_CHEST_AP_PORTABLE_1.png",
//         "patient": "6205576aaa478f466cca3811",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP ONLY",
//         "key_findings": "Patchy ground-glass  changes are seen within the left lung and in the right lower lung not  significantly changed compared to the prior study.",
//         "image": "COVID-19-AR-16406496_XR_CHEST_AP_ONLY_3.png",
//         "patient": "6205576aaa478f466cca3812",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP ONLY",
//         "key_findings": "Bilateral patchy airspace disease involving both mid and lower lung zones, left worse than the right. ",
//         "image": "COVID-19-AR-16424082_XR_CHEST_AP_ONLY_3.png",
//         "patient": "6205576aaa478f466cca3813",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "significant worsening of airspace disease, now very extensive and patchy sparing only apices.",
//         "image": "COVID-19-AR-16424082_XR_CHEST_AP_PORTABLE_2.png",
//         "patient": "6205576aaa478f466cca3814",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "significant worsening of bilateral patchy airspace changes involving all lung zones with relative sparing of both lung apices.",
//         "image": "COVID-19-AR-16424082_XR_CHEST_AP_PORTABLE_2.png",
//         "patient": "6205576aaa478f466cca3815",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Bibasilar opacities are seen most pronounced on the left.  No large pleural effusion identified. ",
//         "image": "COVID-19-AR-16406504_XR_CHEST_AP_PORTABLE_2.png",
//         "patient": "6205576aaa478f466cca3816",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP ONLY",
//         "key_findings": "Left lower lobe airspace  disease is seen.",
//         "image": "COVID-19-AR-16406504_XR_CHEST_AP_ONLY_1.png",
//         "patient": "6205576aaa478f466cca3817",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "subtle peribronchovascular opacities are noted within both lung bases.  There is somewhat bandlike opacity seen in the region of the lateral right upper lung.  ",
//         "image": "COVID-19-AR-16434350_XR_CHEST_AP_PORTABLE_1.png",
//         "patient": "6205576aaa478f466cca3818",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST PA AND LATERAL",
//         "key_findings": "No pleural effusions. ",
//         "image": "COVID-19-AR-16406502_XR_CHEST_PA_AND_LATERAL_4.png",
//         "patient": "6205576aaa478f466cca3819",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP ONLY",
//         "key_findings": "Low lung volumes with minimal bibasilar subsegmental atelectasis. ",
//         "image": "COVID-19-AR-16406502_XR_CHEST_AP_ONLY_2.png",
//         "patient": "6205576aaa478f466cca381a",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Lung volumes remain low but lungs are clear",
//         "image": "COVID-19-AR-16406502_XR_CHEST_AP_PORTABLE_5.png",
//         "patient": "6205576aaa478f466cca381b",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "The lungs  are clear and without focal consolidation. ",
//         "image": "COVID-19-AR-16406502_XR_CHEST_AP_PORTABLE_5.png",
//         "patient": "6205576aaa478f466cca381c",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Bibasilar airspace opacities ",
//         "image": "COVID-19-AR-16406494_XR_CHEST_AP_PORTABLE_2.png",
//         "patient": "6205576aaa478f466cca381b",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "Worsening bilateral  airspace disease is seen within the lower lobes",
//         "image": "COVID-19-AR-16406494_XR_CHEST_AP_PORTABLE_2.png",
//         "patient": "6205576aaa478f466cca3819",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST AP PORTABLE",
//         "key_findings": "No significant airspace consolidation bilaterally",
//         "image": "COVID-19-AR-16424105_XR_CHEST_AP_PORTABLE_2.png",
//         "patient": "6205576aaa478f466cca3817",
//         "score": randomBrixia()
//     },
//     {
//         "description": "XR CHEST PA AND LATERAL",
//         "key_findings": " Lungs are clear, no nodule, airspace disease or pleural  effusion.",
//         "image": "COVID-19-AR-16424105_XR_CHEST_PA_AND_LATERAL_4.png",
//         "patient": "6205576aaa478f466cca381c",
//         "score": randomBrixia()
//     },
//     ])

//     res.send("Data inserted succesfully");

//   };
// };

// let randomInt = function(){
//   return Math.floor(Math.random() * (4));
// };

// let randomBrixia = function (){
//   let myArray = new Array(6);

//   for(let i = 0; i < myArray.length; i++){
//     myArray[i] = randomInt();
//   };

//   return myArray;

// };