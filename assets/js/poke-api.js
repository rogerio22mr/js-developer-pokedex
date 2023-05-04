
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

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new PokemonDetail()
    pokemon.name = pokeDetail.name;
    pokemon.pokeNumber = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.type = type;
    pokemon.types = types;
    pokemon.photo = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.id}.png`;

    const abilities = pokeDetail.abilities.map((abilities) => abilities.ability.name);

    pokemon.abilities = abilities;

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

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

pokeApi.getPokemon =  (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    return fetch(url)
    .then((response) => response.json())
    .then((pokemonDetail) => convertPokeApiDetailToPokemon(pokemonDetail))
    .then((pokemon) => pokemon)
    .catch((error) => console.error(error));
}

pokeApi.getPokemonSpecie =  (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}