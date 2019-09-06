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
            kdex: 4,
            type: 'water',
            hp: 50,
            attack1: 20,
            attack2: 25
        }
    };

    // a list of the order i'd like the pokmeon to render.
    const pkmnToRender = [pokemonObj.bulbasaur.name, pokemonObj.charmander.name, pokemonObj.squirtle.name];

    //used to create pokmeon based on name of pokemon
    function jqCreateImgPkmn(name) {
        let pkmnImg = $(`<img src="assets/images/${name}.png" id="${name}" class="pokemon animated bounce faster" alt="${name}">`);
        return pkmnImg;
    }
    //centers pokemon for the first screen ie choose a pokemon
    function renderChoosePokemon(arr) {
        arr.map(name => $('#center-stage1').append(jqCreateImgPkmn(name)));
    };

    function pokemonChosen() {
        //uses a mouseover. added the 'infinite' addition in order to activate the animation.
        $('.pokemon').on('mouseover', function () {
            let whichPokemon = $(this).attr("id");

            // todo for adding text show stats of pokemon.. i guess.
            $('#pokemon-chosen').text(whichPokemon)
            console.log('The pokemon is ' + whichPokemon);
            $('#' + whichPokemon).addClass('infinite');
        });
    }

    function pokemonChosenMouseOut() {
        $('.pokemon').on('mouseout', function () {
            let whichPokemon = $(this).attr("id");
            console.log('The pokemon is ' + whichPokemon + ' Mouseout');
            $('#' + whichPokemon).removeClass('infinite');
        });
    };

    function pokemonChosenClick() {
        $('.pokemon').on('click', function () {
            console.log('clicked')
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
            $('#pokemon-chosen').text(`You chose ${whichPokemon}!`)
            // $("#center-stage1").addClass('fadeOutRightBig animated fast');

            // $("#center-stage1").removeClass('fadeOutRightBig animated fast');

            renderBattle(whichPokemon);
        });
    };

    function renderBattle (pickedPkmn) {
        $("#center-stage1").empty();
        $("#center-stage1").append('<h1 class="text-center">Let\'s Battle!</h1>');
        $("#center-stage1").append(jqCreateImgPkmn(pickedPkmn));
    }

    //First Render Pokemon onto 'center-stage1 using the designated list.
    renderChoosePokemon(pkmnToRender);
    // pokemon will move with mouseover
    pokemonChosen();

    pokemonChosenMouseOut();
    pokemonChosenClick();
});