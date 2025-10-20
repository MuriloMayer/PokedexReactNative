import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {pokemonService} from '../services/pokemonService';
import {useFavorites} from '../context/FavoritesContext';
import {colors, getTypeColor} from '../utils/colors';

const PokemonDetailScreen = ({route}) => {
  const {pokemon} = route.params;
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {isFavorite, toggleFavorite} = useFavorites();
  const favorite = isFavorite(pokemon);

  useEffect(() => {
    loadPokemonDetail();
  }, []);

  const loadPokemonDetail = async () => {
    try {
      const detail = await pokemonService.getPokemonDetail(pokemon.id);
      setPokemonDetail(detail);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(pokemon);
    Alert.alert(
      'Sucesso',
      favorite
        ? `${pokemon.name} removido dos favoritos`
        : `${pokemon.name} adicionado aos favoritos`,
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!pokemonDetail) {
    return (
      <View style={styles.centered}>
        <Text>Erro ao carregar Pokémon</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{uri: pokemonDetail.imageUrl}} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleToggleFavorite}>
          <Text style={styles.favoriteIcon}>{favorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.idBadge}>
          <Text style={styles.idText}>
            #{String(pokemonDetail.id).padStart(3, '0')}
          </Text>
        </View>

        <Text style={styles.name}>{pokemonDetail.name.toUpperCase()}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Informações Básicas</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Altura:</Text>
            <Text style={styles.infoValue}>{pokemonDetail.height / 10} m</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Peso:</Text>
            <Text style={styles.infoValue}>{pokemonDetail.weight / 10} kg</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tipos</Text>
          <View style={styles.typesContainer}>
            {pokemonDetail.types.map(type => (
              <View
                key={type}
                style={[
                  styles.typeChip,
                  {backgroundColor: getTypeColor(type)},
                ]}>
                <Text style={styles.typeText}>{type.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Habilidades</Text>
          <View style={styles.abilitiesContainer}>
            {pokemonDetail.abilities.map(ability => (
              <View key={ability} style={styles.abilityChip}>
                <Text style={styles.abilityText}>
                  {ability.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 32,
    position: 'relative',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.card,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteIcon: {
    fontSize: 28,
  },
  content: {
    padding: 16,
  },
  idBadge: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  idText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  typeText: {
    color: colors.card,
    fontSize: 12,
    fontWeight: 'bold',
  },
  abilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  abilityChip: {
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  abilityText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text,
  },
});

export default PokemonDetailScreen;
