$(document).ready(function () {
    // const hello = require('./pokemon.js')
    //READY TO PLAY
    console.log("jQuery Ready!");
    // $('#foe-healthbar>div').css({'width': '100%'});
    // console.log(allPokemon)
    let wins = 0;
    let losses = 0;
    let genNumber;
    let totalVal = 0;
    let minePkmnHp = 0;
    let foePkmnHp = 0;


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
            .append(jqCreateImgPkmn(name, classAni, classSpeed, className, className2))
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
    function updateinfo(message,idText='#info'){
        $(idText).text(message);
    }
    function pokemonChosenClick(classClick, idText, callback, chosenBool, pickedPkmn = null) {
        $(classClick).on('click', function () {
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
            // clear out current pokemon
            $(classClick).parent().empty();
            if (!chosenBool) {
                $(idText).text(`You chose ${whichPokemon}!`);
                if (typeof callback === 'function') {
                    callback(whichPokemon);
                }
            } else {
                $(idText).text(`Opponent ${whichPokemon} appeared!`);
                if (typeof callback === 'function') {
                    callback(whichPokemon, pickedPkmn);
                }
            }
        });
    };

    function attackChosenClick(classClick, pickedPkmn, whichPokemon) {
        $(`.${classClick}`).on('click', function () {
            let damageToFoe;
            let currentAttack;
            let whichAttack = $(this).text();
            const pkmnAttackArr = pokemonObj[pickedPkmn.toLowerCase()].attacks;
            pkmnAttackArr.map((attack, i)=> {
                if (attack.attackName === whichAttack){
                    currentAttack = attack.attackName;
                     damageToFoe = attack.damage;
                }
            })
            const foeOriginalHp = pokemonObj[whichPokemon.toLowerCase()].hp;
            foePkmnHp =  updatehp('foe-healthbar',damageToFoe,foePkmnHp,foeOriginalHp);
            updateinfo(`${pickedPkmn} used ${currentAttack.toLowerCase()}!` )

            // console.log(whichAttack);
        })
    };

    function renderFight(whichPokemon, pickedPkmn) {
        minePkmnHp = pokemonObj[pickedPkmn.toLowerCase()].hp;
        foePkmnHp = pokemonObj[whichPokemon.toLowerCase()].hp;
        console.log(minePkmnHp,foePkmnHp)
        $("#pokemon-opponent").html(jqCreateImgPkmn(whichPokemon, 'bounce', 'fast', 'infinite', 'pkmn-opponent'));
        makePkmnVis('pokemon-i-chose');
        $(".text-center").html("Let's Battle!");
        renderStats(pickedPkmn, 'fight');
        attackChosenClick("my-attack", pickedPkmn, whichPokemon);
        makeStatsVisAndFill('pokemon-opponent-stats',false, whichPokemon.toLowerCase());
        makeStatsVisAndFill('pokemon-stats',true, pickedPkmn.toLowerCase());
    };

    function renderStats(whichPokemon, attacksID) {
        const myAttacks = pokemonObj[whichPokemon.toLowerCase()];
        myAttacks.attacks.map((attack, i) => { $(`#${attacksID}`).append(`<li class="my-attack">${attack.attackName}<li>`) })
    }

    function renderBattle(pickedPkmn, callback) {
        // Render chosen pokemon
        $(".text-center").html("Choose an Opponent.");
        $("#pokemon-chosen").html(jqCreateImgPkmn(pickedPkmn, 'pulse', 'fast', 'pokemon-i-chose', 'infinite'));

        // Filter remaining pokemon
        pkmnToRender = pkmnToRender.filter(pkmn => pkmn !== pickedPkmn);
        console.log(pkmnToRender);
        // Add animation
        renderChoosePokemon(pkmnToRender, 'pokemon-choose', 'tada', 'fast', 'pokemon-to-choose');
        //Add mouseover/out
        pokemonChosen('#info');
        //Add click then function
        pokemonChosenClick('.pokemon-to-choose', '#info', renderFight, true, pickedPkmn);
    }

    function makePkmnVis(className) {
        $(`.${className}`).css({ 'visibility': 'visible' });
    }

    function updatehp(idHealthBar, damage, hp, originalHp, friend = false) {
        let newHp =  hp - damage;
        const percent = (newHp/originalHp)*100;
        console.log(percent);
        $(`#${idHealthBar}>div`).css({'width': `${percent}%`});
        return newHp;
    }

    function makeStatsVisAndFill(id, mineOrFoe = true, aPkmn) {
        console.log(aPkmn)
        let prefix = mineOrFoe ? 'mine' : 'foe';
        let idName = `${prefix}-name`;
        let idLevel = `${prefix}-level`;
        let idHp = `${prefix}-hp`;
        let idArray = [idName,idLevel,idHp];
        let {name,level,hp} = pokemonObj[aPkmn];
        let statArray = [name,level,hp];
        idArray.map((stat, i)=>$(`#${stat}`).text(`${statArray[i]}`));
        $(`#${id}`).css({ 'visibility': 'visible' });
    }

    //First Render Pokemon onto 'center-stage1 using the designated list.
    renderChoosePokemon(pkmnToRender, 'pokemon-choose', 'bounce', 'faster', 'pokemon-to-choose');
    // pokemonChosen - handles mouseOut, mouseIn animation
    pokemonChosen('#info');
    pokemonChosenClick('.pokemon-to-choose', '#info', renderBattle);
});