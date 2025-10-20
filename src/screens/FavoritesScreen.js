import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useFavorites} from '../context/FavoritesContext';
import PokemonCard from '../components/PokemonCard';
import {colors} from '../utils/colors';

const FavoritesScreen = ({navigation}) => {
  const {favorites} = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Text style={styles.emptyIconText}>❤️</Text>
        </View>
        <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
        <Text style={styles.emptySubtitle}>
          Explore a Pokédex e adicione seus Pokémon favoritos tocando no ícone
          de coração!
        </Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.exploreButtonText}>🔍 Explorar Pokédex</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {favorites.length} Pokémon{favorites.length !== 1 ? 's' : ''}{' '}
          favorito{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <FlatList
        data={favorites}
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
  header: {
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
  },
  headerText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyIconText: {
    fontSize: 64,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;