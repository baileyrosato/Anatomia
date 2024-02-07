// if you update the course data, run "node dataInit.js" to update database
// we only get 100 free connections so please be careful

import {firebase} from "./config.js"

// TODO: convert data struct to include descriptions and model

const courseData = [
  {
    unit: 'Unit 1: Organs, Systems, and the Organization of the Body',
    subunits: [  
      {
        title:'Anatomical Position', 
        description: "In clinical settings, it is important to have a standard frame of reference. Anatomical position refers to the starting point and is a reference point that ensures everyone is speaking about the same side or part of the body. Anatomical position is always in reference to the patient. In anatomical position, the patient's body is upright, facing forward, arms straight and down at the patient's side with palms facing forward, legs straight, feet flat on the ground, and eyes open. Thinking Question: Do you think the model shown is in anatomical position? Why or why not?"
      },
      {
        title:'Directional Terms', 
        description: ''
      },
      {
        title:'Planes of Sectioning',
        description: ''
      },
      {
        title:'Body Cavities', 
        description: ''
      },
      {
        title:'Regions of the Body', 
        description: ''
      }
    ]
  },
  {
    unit: 'Unit 2: Coming Soon...',
    subunits: [
      {
        title:'Subunit 2.1', 
        description: ""
      },
      {
        title:'Subunit 2.2', 
        description: ""
      },
      {
        title:'Subunit 2.3', 
        description: ""
      }
    ]
  },
  {
    unit: 'Unit 3: Coming Soon...',
    subunits: [
      {
        title:'Subunit 3.1', 
        description: ""
      },
      {
        title:'Subunit 3.2', 
        description: ""
      },
      {
        title:'Subunit 3.3', 
        description: ""
      }
    ]
  },
  {
    unit: 'User Guide',
    // TODO: decide on actual subsections 
    subunits: [
      {
      title:'User Guide Download',
      description: ""
      }
    ]
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

