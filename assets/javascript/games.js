$(document).ready(function () {
    // const hello = require('./pokemon.js')
    //READY TO PLAY
    console.log("jQuery Ready!");
    let wins = 0;
    let losses = 0;
    let genNumber;
    let totalVal = 0;

    //pokemonObj has all the pokemon and their stats
    let pokemonObj =
    {
        bulbasaur: {
            name: 'Bulbasaur',
            kdex: 1,
            type: 'grass',
            hp: 60,
            attacks: [
                {
                    attackName: 'Vine Whip',
                    damage: 30
                },
                {
                    attackName: 'Tackle',
                    damage: 20
                }
            ]
        },
        charmander: {
            name: 'Charmander',
            kdex: 3,
            type: 'fire',
            hp: 65,
            attacks: [
                {
                    attackName: 'Scratch',
                    damage: 10
                },
                {
                    attackName: 'Ember',
                    damage: 40
                }
            ]
        },
        squirtle: {
            name: 'Squirtle',
            kdex: 7,
            type: 'water',
            hp: 50,
            attacks: [
                {
                    attackName: 'Tackle',
                    damage: 20
                },
                {
                    attackName: 'Water Gun',
                    damage: 40
                }
            ]
        }
    };

    // a list of the order i'd like the pokmeon to render.
    let pkmnToRender = [
        pokemonObj.bulbasaur.name,
        pokemonObj.charmander.name,
        pokemonObj.squirtle.name
    ];

    //used to create pokmeon based on name of pokemon
    function jqCreateImgPkmn(name, classAni, classSpeed, className = '') {
        let pkmnImg = $(`<img src="assets/images/${name.toLowerCase()}.png" id="${name}" 
        class="pokemon animated ${classAni} ${classSpeed} ${className}" alt="${name}">`);
        return pkmnImg;
    }
    //centers pokemon for the first screen ie choose a pokemon
    function renderChoosePokemon(arr, idFriendOrFoe, classAni, classSpeed, className = '') {
        // Will have the following animation characteristics: bounce faster
        arr.map(name => $(`#${idFriendOrFoe}`).append(jqCreateImgPkmn(name, classAni, classSpeed, className)));
    }

    function pokemonChosen(idText, chosenBool) {
        //uses a mouseover. added the 'infinite' addition in order to activate the animation.
        $('.pokemon').on('mouseover', function () {
            let whichPokemon = $(this).attr("id");

            // todo for adding text show stats of pokemon.. i guess.
            if (!chosenBool) {
                $(idText).text(whichPokemon);
            }
            $('#' + whichPokemon).addClass('infinite');
        });
        // removes infinite animation at 'mouseout'
        $('.pokemon').on('mouseout', function () {
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
        });
    }

    function pokemonChosenClick(classClick, idText, callback, chosenBool) {
        $(classClick).on('click', function () {
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
            if (!chosenBool) {
                $(idText).text(`You chose ${whichPokemon}!`);
                if (typeof callback === 'function') {
                    console.log(callback)
                    callback(whichPokemon);
                }
            }
        });

    }

    function renderFight(whichPokemon) {
        console.log(whichPokemon);
        $("#pokemon-opponent").html(jqCreateImgPkmn(whichPokemon, 'bounce', 'fast', 'infinite'));
    };

    function renderStats(whichPokemon, attacksID) {
        const opponent = pokemonObj[whichPokemon.toLowerCase()];
        console.log(opponent);
        opponent.attacks.map((attack,i) => { $(`#${attacksID}`).append(`<p>${attack.attackName}<p>`) })
    }

    function renderBattle(pickedPkmn, callback) {
        $(".text-center").html("Let's Battle!! - Choose an Opponent.");
        console.log(pickedPkmn)
        $("#pokemon-chosen").html(jqCreateImgPkmn(pickedPkmn, 'pulse', 'fast', 'infinite'));
        renderStats(pickedPkmn,'pokemon-attack')
        // newPkmnToRender will remove the chosen pokemon from the pkmnToRender
        pkmnToRender = pkmnToRender.filter(pkmn => pkmn !== pickedPkmn);
        renderChoosePokemon(pkmnToRender, 'pokemon-opponent', 'tada', 'fast', 'pkmn-opponent');
        pokemonChosen('#pokemon-opponent-stats');
        pokemonChosenClick('.pkmn-opponent', '#pokemon-opponent-stats', renderFight, false);

    }

    //First Render Pokemon onto 'center-stage1 using the designated list.
    renderChoosePokemon(pkmnToRender, 'pokemon-chosen', 'bounce', 'faster');
    // pokemonChosen - handles mouseOut, mouseIn animation
    pokemonChosen('#pokemon-stats');
    pokemonChosenClick('.pokemon', '#pokemon-stats', renderBattle);
});