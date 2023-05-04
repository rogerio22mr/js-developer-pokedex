let params = (new URL(document.location)).searchParams;
let id = params.get("id");
const pokeNameTitle = document.getElementById('pokeNameTitle');
const pokemonContent = document.getElementById('pokemonContent');

pokeApi.getPokemon(id).then((pokemon => {
    pokeApi.getPokemonSpecie(pokemon.pokeNumber).then((species) => {
        pokeNameTitle.innerHTML = `${pokemon.name}`

        const [ja_Hrkt, ko, zh_Hant, fr, de, es, it, en, ja, zh_Hans] = species.genera;

        let ablityString = "";

        pokemon.abilities.forEach(ability => {
            ablityString += ability + ", "
        })

        abilities = ablityString.slice(0, -2);

        console.log(pokemon);

        pokemonContent.innerHTML = `
                <div class="pokemonCard ${pokemon.type}">
                    <ol class="pokemonCardNome">
                        <h1>${pokemon.name}</h1>
                        <p>#${pokemon.pokeNumber}</p>
                    </ol>
                    
                    <ol class="pokemonCardTypes">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')} 
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">

                    <div class="status">
                        <h1>About</h1>

                        <ol class="pokemonAbout">
                            <li class="pokeText"><span>Species</span></li>    
                            <li><span>${en.genus}</span></li>   
                        </ol>

                        <ol class="pokemonAbout">
                            <li class="pokeText"><span>Height</span></li>    
                            <li><span>${pokemon.height}</span></li>   
                        </ol>

                        <ol class="pokemonAbout">
                            <li class="pokeText"><span>Weight</span></li>    
                            <li><span>${pokemon.weight}</span></li>   
                        </ol>

                        <ol class="pokemonAbout">
                            <li class="pokeText"><span>Abilities</span></li>
                            <li class="type ability">${abilities}</li>  
                        </ol>
                    </div>
                </div>        
            `
    }) 
}));