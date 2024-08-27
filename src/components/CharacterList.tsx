import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Grid, Card, CardContent, Typography, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Character {
  name: string;
  url: string;
}

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://swapi.dev/api/people/?search=${search}&page=${page}`)
      .then((response) => {
        setCharacters(response.data.results);
        setCount(Math.ceil(response.data.count / 10));
      })
      .catch((error) => console.error('Error fetching characters:', error));
  }, [search, page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCharacterClick = (url: string) => {
    const id = url.split('/').filter(Boolean).pop();
    navigate(`/character/${id}`);
  };

  return (
    <div>
      <TextField
        label="Search Characters"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <Grid container spacing={2}>
        {characters.map((character) => (
          <Grid item xs={12} sm={6} md={4} key={character.url}>
            <Card onClick={() => handleCharacterClick(character.url)} style={{ cursor: 'pointer' }}>
              <CardContent>
                <Typography variant="h6">{character.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={count}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

export default CharacterList;
