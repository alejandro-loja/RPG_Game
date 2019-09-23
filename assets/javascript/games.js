$(document).ready(function () {
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
            attack1: 30,
            attack2: 20
        },
        charmander: {
            name: 'Charmander',
            kdex: 3,
            type: 'fire',
            hp: 65,
            attack1: 10,
            attack2: 40
        },
        squirtle: {
            name: 'Squirtle',
            kdex: 7,
            type: 'water',
            hp: 50,
            attack1: 20,
            attack2: 25
        }
    };

    // a list of the order i'd like the pokmeon to render.
    let pkmnToRender = [pokemonObj.bulbasaur.name, pokemonObj.charmander.name, pokemonObj.squirtle.name];

    //used to create pokmeon based on name of pokemon
    function jqCreateImgPkmn(name, classAni, classSpeed, className = '') {
        let pkmnImg = $(`<img src="assets/images/${name.toLowerCase()}.png" id="${name}" class="pokemon animated ${classAni} ${classSpeed} ${className}" alt="${name}">`);
        return pkmnImg;
    }
    //centers pokemon for the first screen ie choose a pokemon
    function renderChoosePokemon(arr, idFriendOrFoe, classAni, classSpeed, className='') {
        // Will have the following animation characteristics: bounce faster
        arr.map(name => $(`#${idFriendOrFoe}`).append(jqCreateImgPkmn(name,classAni, classSpeed, className)));
    }
    
    function pokemonChosen(chosenBool) {
        //uses a mouseover. added the 'infinite' addition in order to activate the animation.
        $('.pokemon').on('mouseover', function () {
            let whichPokemon = $(this).attr("id");

            // todo for adding text show stats of pokemon.. i guess.
            if (!chosenBool) {
                $('#pokemon-stats').text(whichPokemon);
            }
            $('#' + whichPokemon).addClass('infinite');
        });
        // removes infinite animation at 'mouseout'
        $('.pokemon').on('mouseout', function () {
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
        });
    }

    function pokemonChosenClick() {
        $('.pokemon').on('click', function () {
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
            $('#pokemon-stats').text(`You chose ${whichPokemon}!`);
            renderBattle(whichPokemon);
        });
    }

    function renderBattle(pickedPkmn) {
        //id of "
        $(".text-center").html("Let's Battle!!");
        console.log(pickedPkmn)
        $("#pokemon-chosen").html(jqCreateImgPkmn(pickedPkmn,'pulse', 'fast'));
        // newPkmnToRender will remove the chosen pokemon from the pkmnToRender
        pkmnToRender = pkmnToRender.filter(pkmn => pkmn !== pickedPkmn);
        renderChoosePokemon(pkmnToRender, 'pokemon-verses', 'tada', 'fast');
        pokemonChosen(true);
    }

    //First Render Pokemon onto 'center-stage1 using the designated list.
    renderChoosePokemon(pkmnToRender, 'pokemon-chosen','bounce', 'faster');
    // pokemonChosen - handles mouseOut, mouseIn animation
    pokemonChosen();
    pokemonChosenClick();
});