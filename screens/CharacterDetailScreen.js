import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { getCharacterById } from '../utils/api';

export default function CharacterDetailScreen({ route }) {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetchCharacterDetail();
  }, []);

  const fetchCharacterDetail = async () => {
    try {
      const data = await getCharacterById(characterId);
      setCharacter(data);
    } catch (error) {
      console.error('Error while getting detailed information:', error);
    }
  };

  if (!character) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.details}>Gender: {character.gender}</Text>
      <Text style={styles.details}>Place: {character.origin.name}</Text>
      <Text style={styles.details}>Status: {character.status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
});
