// if you update the course data, run "node dataInit.js" to update database
// we only get 100 free connections so please be careful

import {firebase} from "./config.js"

// TODO: convert data struct to include descriptions and model

const courseData = [
  {
    unit: 'Unit 1: Organs, Systems, and the Organization of the Body',
    modelfiles: {
      femaleModels: {
        body1: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian01.gltf',
        body2: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian02.gltf',
        body3: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian03.gltf',
        body4: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian04.gltf',
        body5: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian05.gltf',
        body6: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian06.gltf',
        body7: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian07.gltf',
        body8: 'gs://anatomia-f43c1.appspot.com/femaleCaucasian08.gltf'
      },
      maleModels: {
        body1: 'gs://anatomia-f43c1.appspot.com/maleCaucasian01.gltf',
        body2: 'gs://anatomia-f43c1.appspot.com/maleCaucasian02.gltf',
        body3: 'gs://anatomia-f43c1.appspot.com/maleCaucasian03.gltf',
        body4: 'gs://anatomia-f43c1.appspot.com/maleCaucasian04.gltf',
        body5: 'gs://anatomia-f43c1.appspot.com/maleCaucasian05.gltf',
        body6: 'gs://anatomia-f43c1.appspot.com/maleCaucasian06.gltf',
        body7: 'gs://anatomia-f43c1.appspot.com/maleCaucasian07.gltf',
        body8: 'gs://anatomia-f43c1.appspot.com/maleCaucasian08.gltf',
      }
    },
    subunits: [  
      {
        title:'Anatomical Position', 
        description: "In clinical settings, it is important to have a standard frame of reference. Anatomical position refers to the starting point and is a reference point that ensures everyone is speaking about the same side or part of the body. Anatomical position is always in reference to the patient. In anatomical position, the patient's body is upright, facing forward, arms straight and down at the patient's side with palms facing forward, legs straight, feet flat on the ground, and eyes open. <br><br><b><u>Thinking Question:</b></u> Do you think the model shown is in anatomical position? Why or why not?",
        images: []
      },
      {
        title:'Directional Terms', 
        description: 'Remember to consider anatomical position when referencing directional terms. Here is a list of directional terms and their definitions: <br><br><b>Superior:</b> Above <br><b>Inferior:</b> Below <br><b>Medial:</b> Towards the midline of the body <br><b>Lateral:</b> away from the midline of the body <br><b>Superficial:</b> Towards the surface <br><b>Deep:</b> Towards the core of the body <br><b>Anterior:</b> To the front <br><b>Posterior:</b> To the back <br><b>Proximal:</b> for extremities, near the trunk <br><b>Distal:</b> for extremities, away from the trunk. <br><br>These terms are used to compare body regions in relation to one another. <br><b>Example:</b> "The eyes are superior to the mouth". <br><br><b><u>Thinking Question:</b></u> Referring to the model, can you come up with more examples using directional terms?',
        images: [] 
      },
      {
        title:'Planes of Sectioning',
        description: 'Clinically we now have available to us numerous imaging technologies that “slice” the body into different planes. Depending on the plane of sectioning, you will see a very different image. Therefore, being familiar with these planes of sectioning is important so that you can orient the view. <br><br><b>Transverse</b> (horizontal or cross-section) plane: divides the body or the organ into superior and inferior parts. <br><b>Frontal</b> (coronal) plane: divides the body or the organ into anterior and posterior parts. <br><b>Sagittal</b> plane: divides the body or organ into right and left parts. <br><b>Mid-sagittal</b> plane: divides the body into equal right and left halves. <br><b>Parasagittal</b> plane: divides the body into unequal right and left parts.',
        images: []
      },
      {
        title:'Body Cavities', 
        description: 'The body contains two main body cavities: the <b>ventral</b> and the <b>dorsal cavity</b>.<br> <br>The <b>ventral</b> cavity is further divided into thoracic cavity, <i>superior to the diaphragm</i>, which is divided into the <u>mediastinum</u> and the  <u>pleural(2)</u> and  <u>pericardia</u>l cavities. Abdominopelvic cavity, <i>inferior to the diaphragm</i>, which is divided into the <u>abdominal</u> and <u>pelvic</u> cavities. <br><br>The <b>dorsal</b> cavity is further subdivided into the <u>cranial</u> cavity and <u>vertebral</u> cavity',
        images: [
          'gs://anatomia-f43c1.appspot.com/BodyCavities1.png',
          'gs://anatomia-f43c1.appspot.com/BodyCavities2.png'
        ] 
      },
      {
        title:'Regions of the Body', 
        description: 'The abdomen is divided into either four quadrants or 9 regions.',
        images: ['gs://anatomia-f43c1.appspot.com/BodyRegions.png']
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

