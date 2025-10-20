import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Pokemon, FavoritesContextData} from '../types';

const FavoritesContext = createContext<FavoritesContextData | undefined>(undefined);

export const useFavorites = (): FavoritesContextData => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({children}) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async (): Promise<void> => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: Pokemon[]): Promise<void> => {
    try {
      await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const isFavorite = (pokemon: Pokemon): boolean => {
    return favorites.some(fav => fav.id === pokemon.id);
  };

  const toggleFavorite = (pokemon: Pokemon): void => {
    let newFavorites: Pokemon[];
    if (isFavorite(pokemon)) {
      newFavorites = favorites.filter(fav => fav.id !== pokemon.id);
    } else {
      newFavorites = [...favorites, pokemon];
    }
    saveFavorites(newFavorites);
  };

  const removeFavorite = (pokemon: Pokemon): void => {
    const newFavorites = favorites.filter(fav => fav.id !== pokemon.id);
    saveFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};