import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {pokemonService} from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';
import {colors} from '../utils/colors';

const HomeScreen = ({navigation}) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    loadPokemon();
  }, []);

  const loadPokemon = async () => {
    setIsLoading(true);
    try {
      const pokemon = await pokemonService.getPokemonList(offset, limit);
      setPokemonList(prev => [...prev, ...pokemon]);
      setOffset(prev => prev + limit);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    try {
      const pokemon = await pokemonService.getPokemonList(offset, limit);
      setPokemonList(prev => [...prev, ...pokemon]);
      setOffset(prev => prev + limit);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Atenção', 'Digite o nome ou número do Pokémon');
      return;
    }

    setIsLoading(true);
    try {
      const pokemonDetail = await pokemonService.searchPokemon(searchQuery);
      navigation.navigate('PokemonDetail', {
        pokemon: {
          id: pokemonDetail.id,
          name: pokemonDetail.name,
          imageUrl: pokemonDetail.imageUrl,
        },
      });
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Pokémon..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      {isLoadingMore ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
          <Text style={styles.loadMoreText}>Carregar Mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (isLoading && pokemonList.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando Pokémon...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
        data={pokemonList}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <PokemonCard
            pokemon={item}
            onPress={() =>
              navigation.navigate('PokemonDetail', {pokemon: item})
            }
          />
        )}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: colors.card,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  searchButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  list: {
    padding: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: colors.textSecondary,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  loadMoreText: {
    color: colors.card,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;