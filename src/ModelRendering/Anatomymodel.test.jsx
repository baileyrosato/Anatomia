import React from 'react';
import { render } from '@testing-library/react';
import Anatomymodel from './Anatomymodel';
import { CharacterCustomizationProvider } from './CharacterCustomizationContext';

// Mocking useCharacterCustomization hook
jest.mock('./CharacterCustomizationContext.jsx', () => ({
    useCharacterCustomization: jest.fn().mockReturnValue({
      skinColor: '#f3e7db',
      selectedGender: 'female',
      bodySize: 1,
    }),
  }));

  describe('Anatomymodel Component', () => {
    it('loads the correct model file based on user customization', () => {
      render(<Anatomymodel />);
      // assert that the correct model file is loaded based on user's selected gender and body size
      expect(screen.getByText(/femaleCaucasian01.gltf/i)).toBeInTheDocument();
    });
  
    it('sets material color according to the skin color', () => {
      render(<Anatomymodel />);
      // assert that the material color is set according to the user's selected skin color
      expect(screen.getByText(/material color: #f3e7db/i)).toBeInTheDocument();
    });
  
    it('renders meshes properly based on user customization', () => {
      render(<Anatomymodel />);
      // assert that the meshes are rendered properly based on user's selected gender
      expect(screen.getByText(/skinned mesh: MBLab_human_female/i)).toBeInTheDocument();
    });
  });