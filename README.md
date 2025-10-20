# 🔴 Pokédex Explorer - React Native

Um aplicativo React Native que consome a **PokéAPI** para criar um catálogo interativo de Pokémon com sistema de favoritos persistente.

## 🛠️ Tecnologias Utilizadas

- **React Native** 0.74+
- **React Navigation** - Navegação entre telas
- **Context API** - Gerenciamento de estado global
- **Axios** - Requisições HTTP
- **AsyncStorage** - Persistência local de dados
- **React Native Fast Image** - Otimização de imagens
- **PokéAPI** - Fonte de dados dos Pokémon

## 📦 Dependências

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "axios": "^1.6.2",
    "react": "18.2.0",
    "react-native": "0.74.0",
    "react-native-fast-image": "^8.6.3",
    "react-native-safe-area-context": "^4.8.2",
    "react-native-screens": "^3.29.0"
  }
}
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- React Native CLI
- Android Studio (para emulador Android)
- JDK 17+

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
   # Android
   npm run android
   
   # iOS (apenas macOS)
   npm run ios
   ```

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
