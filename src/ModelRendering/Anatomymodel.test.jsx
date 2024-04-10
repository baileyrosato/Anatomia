import React from 'react';
import { render } from '@testing-library/react';
import Anatomymodel from './Anatomymodel.jsx';
import { useGLTF} from '@react-three/drei';
import { useCharacterCustomization } from './CharacterCustomizationContext.jsx';

jest.mock('@react-three/drei', () => {
    const originalModule = jest.requireActual('@react-three/drei');
    return {
      ...originalModule,
      useGLTF: jest.fn(), // Mock useGLTF hook
    };
  });

jest.mock('./CharacterCustomizationContext.jsx', () => ({
    ...jest.requireActual('./CharacterCustomizationContext.jsx'),
    useCharacterCustomization: jest.fn(),
  }));

  const setSkinColorMock = jest.fn();
  const setGenderMock = jest.fn();
  const setBodySizeMock = jest.fn();

  describe('Anatomymodel Component', () => {
    // it('loads the correct model file based on user-selected options', () => {
    //     useCharacterCustomization.mockReturnValue({
    //         setSkinColor: setSkinColorMock,
    //       });

    //     // Render the Anatomymodel component
    //     render(<Anatomymodel/>);
    
    //     // Assert that the correct model file path is generated based on the provided values
    //     // You may need to adjust the assertion based on the actual implementation
    //     expect(useGLTF).toHaveBeenCalledWith('/model_files/femaleCaucasian05.gltf');
    //   });
  
//     it('sets material color according to the skin color', () => {
//       render(<Anatomymodel />);
//       // assert that the material color is set according to the user's selected skin color
//       expect(screen.getByText(/material color: #f3e7db/i)).toBeInTheDocument();
//     });
  
//     it('renders meshes properly based on user customization', () => {
//       render(<Anatomymodel />);
//       // assert that the meshes are rendered properly based on user's selected gender
//       expect(screen.getByText(/skinned mesh: MBLab_human_female/i)).toBeInTheDocument();
//     });
  });