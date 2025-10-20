import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Image} from 'expo-image';
import {colors} from '../utils/colors';
import {Pokemon} from '../types';

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: () => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({pokemon, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{uri: pokemon.imageUrl}} 
        style={styles.image}
        contentFit="contain"
        transition={200}
      />
      <View style={styles.info}>
        <Text style={styles.id}>#{String(pokemon.id).padStart(3, '0')}</Text>
        <Text style={styles.name}>{pokemon.name.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    margin: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    minWidth: 150,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    alignItems: 'center',
    marginTop: 8,
  },
  id: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default PokemonCard;