import React, {useState, useEffect, JSX} from 'react';
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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {pokemonService} from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';
import {colors} from '../utils/colors';
import {RootStackParamList, Pokemon} from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [originalList, setOriginalList] = useState<Pokemon[] | null>(null);
  const [originalOffset, setOriginalOffset] = useState<number | null>(null);
  const [originalHasMore, setOriginalHasMore] = useState<boolean | null>(null);
  const [searchResults, setSearchResults] = useState<Pokemon[] | null>(null);
  const [searchPage, setSearchPage] = useState<number>(0);
  const SEARCH_PAGE_SIZE = 20;
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 20;

  useEffect(() => {
    loadPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPokemon = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const pokemon = await pokemonService.getPokemonList(offset, limit);
      setPokemonList(prev => [...prev, ...pokemon]);
      setOffset(prev => prev + limit);
      if (pokemon.length < limit) setHasMore(false);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async (): Promise<void> => {
    if (isLoadingMore || isLoading || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const pokemon = await pokemonService.getPokemonList(offset, limit);
      setPokemonList(prev => [...prev, ...pokemon]);
      setOffset(prev => prev + limit);
      if (pokemon.length < limit) setHasMore(false);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSearch = async (): Promise<void> => {
    const q = searchQuery.trim();
    if (!q) {
      Alert.alert('Atenção', 'Digite o nome ou número do Pokémon');
      return;
    }

    setIsLoading(true);
    try {
      // preserve original list so we can restore when search is cleared
      if (!isSearching) {
        setOriginalList(pokemonList);
        setOriginalOffset(offset);
        setOriginalHasMore(hasMore);
      }

      // If query is numeric or exact name, still try exact detail fetch first
      let partialMatches: Pokemon[] = [];
      if (/^\d+$/.test(q)) {
        // numeric id
        try {
          const detail = await pokemonService.getPokemonDetail(q);
          partialMatches = [{id: detail.id, name: detail.name, url: '', imageUrl: detail.imageUrl} as Pokemon];
        } catch (err) {
          partialMatches = [];
        }
      } else {
        // partial name search using cached list
        const matches = await pokemonService.searchByNamePartial(q);
        partialMatches = matches.map(m => ({id: m.id, name: m.name, url: m.url ?? '', imageUrl: m.imageUrl} as Pokemon));
      }

      setSearchResults(partialMatches);
      setSearchPage(0);
      // show first page of results
      setPokemonList(partialMatches.slice(0, SEARCH_PAGE_SIZE));
      setIsSearching(true);
      setHasMore(false);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreSearchResults = (): void => {
    if (!searchResults) return;
    const nextPage = searchPage + 1;
    const start = nextPage * SEARCH_PAGE_SIZE;
    const slice = searchResults.slice(start, start + SEARCH_PAGE_SIZE);
    if (slice.length === 0) return;
    setPokemonList(prev => [...prev, ...slice]);
    setSearchPage(nextPage);
  };

  const clearSearch = (): void => {
    setSearchQuery('');
    if (originalList) {
      setPokemonList(originalList);
      setOffset(originalOffset ?? 0);
      setHasMore(originalHasMore ?? true);
    }
    setOriginalList(null);
    setOriginalOffset(null);
    setOriginalHasMore(null);
    setIsSearching(false);
  };

  const renderHeader = (): JSX.Element => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar Pokémon..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          if (text.trim() === '' && isSearching) {
            clearSearch();
          }
        }}
        onSubmitEditing={handleSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>
      {isSearching && (
        <TouchableOpacity style={[styles.searchButton, {marginLeft: 8}]} onPress={clearSearch}>
          <Text style={styles.searchButtonText}>Limpar</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFooter = (): JSX.Element | null => {
    if (isLoadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (!hasMore) {
      return (
        <View style={styles.footer}>
          <Text style={{color: colors.textSecondary}}>Fim da lista</Text>
        </View>
      );
    }

    return null;
  };

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
  onEndReached={isSearching ? loadMoreSearchResults : loadMore}
        onEndReachedThreshold={0.5}
        // avoid multiple triggers on iOS/Android
        scrollEventThrottle={400}
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