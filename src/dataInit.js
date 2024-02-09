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
        description: "In clinical settings, it is important to have a standard frame of reference. Anatomical position refers to the starting point and is a reference point that ensures everyone is speaking about the same side or part of the body. Anatomical position is always in reference to the patient. In anatomical position, the patient's body is upright, facing forward, arms straight and down at the patient's side with palms facing forward, legs straight, feet flat on the ground, and eyes open.\n\nThinking Question: Do you think the model shown is in anatomical position? Why or why not?"
      },
      {
        title:'Directional Terms', 
        description: 'Remember to consider anatomical position when referencing directional terms. Here is a list of directional terms and their definitions. Superior: Above, Inferior: Below, Medial: Towards the midline of the body, Lateral: away from the midline of the body, Superficial: Towards the surface, Deep: Towards the core of the body, Anterior: To the front, Posterior: To the back, Proximal: for extremities, near the trunk, Distal: for extremities, away from the trunk. These terms are used to compare body regions in relation to one another. Example: The eyes are superior to the mouth. Thinking Question: Referring to the model, can you come up with more examples using directional terms?'
      },
      {
        title:'Planes of Sectioning',
        description: 'Clinically we now have available to us numerous imaging technologies that “slice” the body into different planes. Depending on the plane of sectioning, you will see a very different image. Therefore, being familiar with these planes of sectioning is important so that you can orient the view. Transverse (horizontal or cross-section) plane: divides the body or the organ into superior and inferior parts. Frontal (coronal) plane: divides the body or the organ into anterior and posterior parts. Sagittal plane: divides the body or organ into right and left parts. Mid-sagittal plane: divides the body into equal right and left halves. Parasagittal plane: divides the body into unequal right and left parts.'
      },
      {
        title:'Body Cavities', 
        description: 'The body contains two main body cavities. These are the ventral and the dorsal cavity. The ventral cavity is further divided into Thoracic cavity, superior to the diaphragm, which is divided into the mediastinum and the pleural(2) and pericardial cavities. Abdominopelvic cavity, inferior to the diaphragm, which is divided into the abdominal and pelvic cavities. The dorsal cavity is further subdivided into Cranial cavity Vertebral cavity'
      },
      {
        title:'Regions of the Body', 
        description: 'The abdomen is divided into either four quadrants or 9 regions.'
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

