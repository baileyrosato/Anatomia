// SubunitPage.js

// import react
import React from 'react';
import { useParams } from 'react-router-dom';

export default function SubunitPage() 
{
  // Get the unit and subunit parameters
  const { unit, subunit } = useParams();

  // TODO: Fetch and display the actual data for the selected subunit
  // For now, simply display the unit and subunit names
  return (
    <div>
      <h2>{unit}</h2>
      <h3>{subunit}</h3>
      {/* TODO: Display actual subunit data here 
            This includes 3D model, course content, etc. retreived from database 
            and dynamically displayed */}
    </div>
  );
};

