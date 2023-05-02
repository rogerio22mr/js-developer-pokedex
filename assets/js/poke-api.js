
const pokeApi = {}

function convertPokeApiDetailToPokemons(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name;
    pokemon.pokeNumber = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.type = type;
    pokemon.types = types;
    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
    .then(convertPokeApiDetailToPokemons);
}

pokeApi.getPokemons =  (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequest) => Promise.all(detailRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.error(error));
}