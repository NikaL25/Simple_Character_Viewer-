import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StyleSheet } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import Loader from '../components/Loader';
import { getCharacters } from '../utils/api';

export default function HomeScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    try {
      setLoadingMore(true);
      const data = await getCharacters(page);
      setCharacters((prev) => [...prev, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setPage(1);  // Reset to first page
    setCharacters([]);
    await fetchCharacters();
    setRefreshing(false);
  };

  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCharacterPress = (id) => {
    navigation.navigate('CharacterDetail', { characterId: id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Enter character name"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      {loading && !characters.length ? (
        <Loader />
      ) : (
        <FlatList
          data={filteredCharacters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CharacterCard character={item} onPress={() => handleCharacterPress(item.id)} />
          )}
          onEndReached={() => setPage((prev) => prev + 1)}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore && <Loader size="small" />}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
