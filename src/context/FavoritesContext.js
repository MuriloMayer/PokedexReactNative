import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({children}) => {
  const [favorites, setFavorites] = useState([]);

  // Carregar favoritos do AsyncStorage ao iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('@favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async newFavorites => {
    try {
      await AsyncStorage.setItem('@favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const isFavorite = pokemon => {
    return favorites.some(fav => fav.id === pokemon.id);
  };

  const toggleFavorite = pokemon => {
    let newFavorites;
    if (isFavorite(pokemon)) {
      newFavorites = favorites.filter(fav => fav.id !== pokemon.id);
    } else {
      newFavorites = [...favorites, pokemon];
    }
    saveFavorites(newFavorites);
  };

  const removeFavorite = pokemon => {
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