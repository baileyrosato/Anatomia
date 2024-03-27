// databaseUtils.js
import { firebase } from './config.js';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// function to fetch subunit data from the database
export function fetchSubunitData(unit, subunit) {
  return new Promise((resolve, reject) => {
    // access the course data
    const courseDataRef = firebase.database().ref('courseData');
    courseDataRef.once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
            // find the correct unit and subunit
          const foundUnitIndex = data.findIndex((course) => course.unit === unit);
          const foundSubunitIndex = data[foundUnitIndex]?.subunits.findIndex((sub) => sub.title === subunit);
          if (foundUnitIndex !== -1 && foundSubunitIndex !== -1) {
            // access the subunit data
            const subunitRef = firebase.database().ref(`courseData/${foundUnitIndex}/subunits/${foundSubunitIndex}`);
            subunitRef.once('value')
              .then((snapshot) => {
                const subunitData = snapshot.val();
                resolve(subunitData);
              })
              .catch(reject);
          }
        }
      })
      .catch(reject);
  });
}

// function to fetch download URL for the subunit image
export function fetchSubunitImageDownloadUrl(imagePath) {
  const storage = getStorage();
  const imageRef = ref(storage, imagePath);
  return getDownloadURL(imageRef);
}


// Function to fetch unit data from the database
export function fetchUnitData(unit) {
  return new Promise((resolve, reject) => {
    const courseDataRef = firebase.database().ref('courseData');
    courseDataRef.once('value')
      .then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const foundUnit = data.find((course) => course.unit === unit);
          if (foundUnit) {
            resolve(foundUnit);
          } else {
            reject(new Error(`Unit ${unit} not found`));
          }
        } else {
          reject(new Error('No course data found'));
        }
      })
      .catch(reject);
  });
}

// Function to fetch download URL for the model file
export function fetchModelDownloadUrl(modelPath) {
  const storage = getStorage();
  const modelRef = ref(storage, modelPath);
  return getDownloadURL(modelRef);
}