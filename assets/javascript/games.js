$(document).ready(function () {
    // const hello = require('./pokemon.js')
    //READY TO PLAY
    console.log("jQuery Ready!");
    // console.log(allPokemon)
    let wins = 0;
    let losses = 0;
    let genNumber;
    let totalVal = 0;


    // a list of the order i'd like the pokmeon to render.
    let pkmnToRender = [
        pokemonObj.bulbasaur.name,
        pokemonObj.charmander.name,
        pokemonObj.squirtle.name
    ];

    //used to create pokmeon based on name of pokemon
    function jqCreateImgPkmn(name, classAni, classSpeed, className = '', className2 = '') {
        let pkmnImg = $(`<img src="assets/images/${name.toLowerCase()}.png" id="${name}" 
        class="test animated  ${classAni} ${classSpeed} ${className} ${className2}" alt="${name}">`);
        return pkmnImg;
    }
    //centers pokemon for the first screen ie choose a pokemon
    function renderChoosePokemon(arr, location, classAni, classSpeed, className = '', className2 = '') {
        // Will have the following animation characteristics: bounce faster
        arr.map(name => $(`#${location}`)
            .append(
                jqCreateImgPkmn(
                    name, classAni, classSpeed, className, className2
                )
            )
        );
    }

    function pokemonChosen(idText, chosenBool) {
        //uses a mouseover. added the 'infinite' addition in order to activate the animation.
        $('.pokemon-to-choose').on('mouseover', function () {
            let whichPokemon = $(this).attr("id");

            // todo for adding text show stats of pokemon.. i guess.
            if (!chosenBool) {
                $(idText).text(whichPokemon);
            }
            $('#' + whichPokemon).addClass('infinite');
        });
        // removes infinite animation at 'mouseout'
        $('.pokemon-to-choose').on('mouseout', function () {
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
        });
    }

    function pokemonChosenClick(classClick, idText, callback, chosenBool) {
        $(classClick).on('click', function () {
            console.log('i was clicked')
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
            
            $(classClick).parent().empty();

            if (!chosenBool) {
                $(idText).text(`You chose ${whichPokemon}!`);
                if (typeof callback === 'function') {
                    callback(whichPokemon);
                }
            }
        });

    }

    function renderFight(whichPokemon) {

        $("#pokemon-opponent").html(jqCreateImgPkmn(whichPokemon, 'bounce', 'fast', 'infinite', 'pkmn-opponent'));
    };

    function renderStats(whichPokemon, attacksID) {
        const opponent = pokemonObj[whichPokemon.toLowerCase()];

        opponent.attacks.map((attack, i) => { $(`#${attacksID}`).append(`<p>${attack.attackName}<p>`) })
    }

    function renderBattle(pickedPkmn, callback) {
        $(".text-center").html("Choose an Opponent.");

        $("#pokemon-chosen").html(jqCreateImgPkmn(pickedPkmn, 'pulse', 'fast', 'pokemon-i-chose', 'infinite'));
        // renderStats(pickedPkmn,'pokemon-attack');
        // newPkmnToRender will remove the chosen pokemon from the pkmnToRender
        pkmnToRender = pkmnToRender.filter(pkmn => pkmn !== pickedPkmn);
        console.log(pkmnToRender);
        renderChoosePokemon(pkmnToRender, 'pokemon-choose', 'tada', 'fast', 'pokemon-to-choose');
        pokemonChosen('#pokemon-info');
        pokemonChosenClick('.pokemon-to-choose', '#pokemon-info', renderFight, false);

    }

    //First Render Pokemon onto 'center-stage1 using the designated list.
    renderChoosePokemon(pkmnToRender, 'pokemon-choose', 'bounce', 'faster', 'pokemon-to-choose');
    // pokemonChosen - handles mouseOut, mouseIn animation
    pokemonChosen('#pokemon-info');
    pokemonChosenClick('.pokemon-to-choose', '#pokemon-info', renderBattle);
});