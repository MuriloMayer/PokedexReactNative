import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity, Text} from 'react-native';
import {FavoritesProvider} from './src/context/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';
import PokemonDetailScreen from './src/screens/PokemonDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import {colors} from './src/utils/colors';

const Stack = createNativeStackNavigator();

function App() {
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
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              title: 'Pokédex Explorer',
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Favorites')}
                  style={{marginRight: 16}}>
                  <Text style={{fontSize: 24}}>❤️</Text>
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

export default App;