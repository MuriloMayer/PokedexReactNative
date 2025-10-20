/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { FavoritesProvider } from './src/context/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PokemonDetailScreen from './src/screens/PokemonDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { colors } from './src/utils/colors';
import { RootStackParamList } from './src/types';
import * as Font from 'expo-font';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          ...MaterialCommunityIcons.font,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue mesmo com erro
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.card,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({ navigation }) => ({
              title: 'Pokédex Explorer',
              // eslint-disable-next-line react/no-unstable-nested-components
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Favorites')}
                  style={{ marginRight: 16 }}
                >
                    <MaterialCommunityIcons name="heart-outline" size={24} color={colors.card} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="PokemonDetail"
            component={PokemonDetailScreen}
            options={{
              title: 'Detalhes do Pokémon',
            }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
              title: 'Meus Favoritos',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
