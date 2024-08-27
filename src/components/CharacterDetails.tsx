import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const savedCharacter = localStorage.getItem(`character-${id}`);
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    } else {
      axios.get(`https://swapi.dev/api/people/${id}/`)
        .then((response) => setCharacter(response.data))
        .catch((error) => console.error('Error fetching character:', error));
    }
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (character) {
      setCharacter({
        ...character,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSave = () => {
    if (character) {
      localStorage.setItem(`character-${id}`, JSON.stringify(character));
      setIsEditing(false);
    }
  };

  if (!character) return <Typography>Loading...</Typography>;

  return (
    <Card>
      <CardContent>
        {isEditing ? (
          <>
            <TextField
              name="name"
              label="Name"
              value={character.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="height"
              label="Height"
              value={character.height}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            {/* Добавьте остальные поля для редактирования */}
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4">{character.name}</Typography>
            <Typography>Height: {character.height}</Typography>
            {/* Отобразите остальные поля */}
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterDetails;
