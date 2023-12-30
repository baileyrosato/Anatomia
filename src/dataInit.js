// if you update the course data, run "node dataInit.js" to update database
// we only get 100 free connections so please be careful

import {firebase} from "./config.js"

// TODO: convert data struct to include descriptions and model

const courseData = [
  {
    unit: 'Unit 1: Organs, Systems, and the Organization of the Body',
    subunits: ['Directional Terms', 'Subunit 1.2', 'Subunit 1.3']
    // unit: 'Unit 1: Organs, Systems, and the Organization of the Body',
    // subunits: [
    //   {title:'Directional Terms', description: ''},
    //   {title:'Subunit 1.2', description: ''},
    //   {title:'Subunit 1.3', description: ''}
    // ]
  },
  {
    unit: 'Unit 2: Coming Soon...',
    subunits: ['Subunit 2.1', 'Subunit 2.2', 'Subunit 2.3']
  },
  {
    unit: 'Unit 3: Coming Soon...',
    subunits: ['Subunit 3.1', 'Subunit 3.2', 'Subunit 3.3']
  },
  {
    unit: 'User Guide',
    // TODO: decide on actual subsections 
    subunits: ['User Guide Download']
  },
  // add more units as needed
];

// reference to the root of the database
const db = firebase.database().ref();

// convert the array to an object with auto-generated keys
const courseDataObject = courseData.reduce((acc, unit, index) => {
  acc[index] = unit;
  return acc;
}, {});

// add data to the database
db.child('courseData').set(courseDataObject)
  .then(() => {
    console.log('Course data successfully written to the database');
  })
  .catch((error) => {
    console.error('Error writing course data to the database:', error);
  });

