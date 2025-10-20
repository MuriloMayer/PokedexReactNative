# 🔴 Pokédex Explorer - React Native (Expo)

Um aplicativo React Native com Expo que consome a **PokéAPI** para criar um catálogo interativo de Pokémon com sistema de favoritos persistente.

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.76+ with **Expo** ~52.0
- **React Navigation** - Navegação entre telas
- **Context API** - Gerenciamento de estado global
- **Axios** - Requisições HTTP
- **AsyncStorage** - Persistência local de dados
- **Expo Image** - Otimização de imagens
- **PokéAPI** - Fonte de dados dos Pokémon

## 📦 Dependências

```json
{
  "dependencies": {
    "expo": "~52.0.0",
    "react": "18.3.1",
    "react-native": "0.76.3",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-native-async-storage/async-storage": "^2.1.0",
    "axios": "^1.6.2",
    "expo-image": "~2.0.0",
    "react-native-safe-area-context": "4.12.0",
    "react-native-screens": "~4.2.0"
  }
}
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- Expo CLI (instala automaticamente com npx)
- Expo Go app no celular (para testar no dispositivo físico)
- Android Studio ou Xcode (para emuladores)

### Passos

1. **Clone o repositório**
   ```bash
   git clone https://github.com/SEU_USUARIO/pokedex-explorer-rn.git
   cd pokedex-explorer-rn
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Execute o aplicativo**
   ```bash
   # Iniciar Expo
   npx expo start
   
   # Para Android
   npx expo start --android
   
   # Para iOS (apenas macOS)
   npx expo start --ios
   
   # Para Web
   npx expo start --web
   ```

4. **Testar no celular**
   - Instale o app **Expo Go** na Play Store ou App Store
   - Escaneie o QR Code que aparece no terminal
   - O app abrirá automaticamente

## 🏗️ Estrutura do Projeto

```
src/
├── screens/                  # Telas da aplicação
│   ├── HomeScreen.js        # Tela principal
│   ├── PokemonDetailScreen.js # Tela de detalhes
│   └── FavoritesScreen.js   # Tela de favoritos
├── components/              # Componentes reutilizáveis
│   └── PokemonCard.js      # Card do Pokémon
├── services/               # Serviços de API
│   └── pokemonService.js   # Comunicação com PokéAPI
├── context/                # Gerenciamento de estado
│   └── FavoritesContext.js # Context dos favoritos
├── models/                 # Modelos de dados
│   └── Pokemon.js         # Classes Pokemon e PokemonDetail
└── utils/                 # Utilitários
    └── colors.js          # Cores dos tipos e tema
```

## 🌐 API Utilizada

**PokéAPI**: https://pokeapi.co/
- Endpoints utilizados:
  - `GET /pokemon?offset={offset}&limit={limit}` - Lista de Pokémon
  - `GET /pokemon/{id}` - Detalhes do Pokémon

## 👨‍💻 Desenvolvedores

**Murilo Mayer Van Nouhuys**
- GitHub: [@MuriloMayer](https://github.com/murilomayer)

**Lucas Andreas Baumer**
- GitHub: [@LucasBaumer](https://github.com/lucasbaumer)

**Matheus Kormann Svidinick**
- GitHub: [@MatheusKormann](https://github.com/matheuskormann)
