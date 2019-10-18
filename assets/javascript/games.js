$(document).ready(function () {
    //READY TO PLAY
    console.log("jQuery Ready!");
    let wins = 0;
    let losses = 0;
    let genNumber;
    let totalVal = 0;
    let minePkmnHp = 0;
    let foePkmnHp = 0;

    // a list of the order i'd like the pokmeon to render.
    // const pokemonOnList = () => pokemonObj[x].name;
    let pkmnToRender = [
        pokemonObj.bulbasaur.name,
        pokemonObj.charmander.name,
        pokemonObj.squirtle.name,
        // pokemonObj.pikachu.name,
        // pokemonObj.mew.name
    ];

    function reduceListOfPKMN(pokemonName) {
        if (pkmnToRender.length > 0) {
            pkmnToRender = pkmnToRender.filter(pkmn => pkmn !== pokemonName);

            return true;
        } else {
            return false;
        }
    };

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
    };
    function pokemonChosen(idText, chosenBool) {
        //uses a mouseover. added the 'infinite' addition in order to activate the animation.
        $('.pokemon-to-choose').on('mouseover', function () {
            let whichPokemon = $(this).attr("id");
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
    };

    function updateinfo(message, idText = '#info', appendBool) {
        $(idText).text(message);
    };

    function pokemonChosenClick(classClick, idText, callback, chosenBool, pickedPkmn = null) {
        $(classClick).on('click', function () {
            let whichPokemon = $(this).attr("id");
            $('#' + whichPokemon).removeClass('infinite');
            // clear out current pokemon
            $(classClick).parent().empty();
            if (!chosenBool) {
                updateinfo(`You chose ${whichPokemon}!`, idText);
                // $(idText).text(`You chose ${whichPokemon}!`);
                if (typeof callback === 'function') {
                    callback(whichPokemon);
                }
            } else {
                updateinfo(`Opponent ${whichPokemon} appeared!`, idText);
                // $(idText).text(`Opponent ${whichPokemon} appeared!`);
                if (typeof callback === 'function') {
                    callback(whichPokemon, pickedPkmn);
                }
            }
        })
    };

    function pokemonFaints(pkmnHp, friend = true, pkmn) {
        const faintAnimation =
            (pkmn, remove1) =>
                $('#' + pkmn).removeClass('infinite')
                    .removeClass(remove1)
                    .removeClass('fast')
                    .addClass('fadeOutDown');

        const zeroHpBool = pkmnHp === 0;

        if (zeroHpBool && !friend) {

            faintAnimation(pkmn, 'bounce');
            const anyPkmnLeft = reduceListOfPKMN(pkmn);

            if (anyPkmnLeft) {
                console.log('There are still pokemon left');

            } else if (!anyPkmnLeft) {
                console.log('pokmemon are gone');
            }
            console.log(pkmnToRender)
            return true;

        } else if (zeroHpBool && friend) {
            faintAnimation(pkmn, 'pulse');
            return true;

        } else {
            return false;
        }
    };

    function attackChosenClick(classClick, pickedPkmn, whichPokemon) {
        $(`.${classClick}`).on('click', function () {
            let damageToFoe;
            let currentAttack;
            let whichAttack = $(this).text();
            const pkmnAttackArr = pokemonObj[pickedPkmn.toLowerCase()].attacks;
            pkmnAttackArr.map((attack, i) => {
                if (attack.attackName === whichAttack) {
                    currentAttack = attack.attackName;
                    damageToFoe = attack.damage;
                }
            })
            const foeOriginalHp = pokemonObj[whichPokemon.toLowerCase()].hp;
            foePkmnHp = updatehp('foe-healthbar', damageToFoe, foePkmnHp, foeOriginalHp, false);
            const faintedBool = pokemonFaints(foePkmnHp, false, whichPokemon);

            // if foe faints!
            if (faintedBool) {
                // pokemon fades away
                makePkmnVis('#fight>li', false);
                // Anounces that pokemon fainted
                updateinfo(`${whichPokemon} fainted!`);

                if (pkmnToRender.length > 0) {
                    console.log(pkmnToRender, 'pkmnToRender');
                } else {
                    setTimeout(function () { updateinfo('YOU WON! Everyone was defeated!') }, 2000);
                }

            } else {
                updateinfo(`${pickedPkmn} used ${currentAttack.toLowerCase()}!`);
                makePkmnVis('#fight>li', false);
                setTimeout(function () { foeAttacks(whichPokemon, pickedPkmn) }, 2000);
            }
        })
    };


    function foeAttacks(whichPokemon, pickedPkmn) {
        const listOfAttacks = pokemonObj[whichPokemon.toLowerCase()].attacks;
        const numAttacks = listOfAttacks.length;
        let currentAttack = listOfAttacks[Math.floor(Math.random() * numAttacks)];
        currentAttackName = currentAttack.attackName;
        currentAttackDamage = currentAttack.damage;
        const mineOriginalHp = pokemonObj[pickedPkmn.toLowerCase()].hp;

        minePkmnHp = updatehp('mine-healthbar', currentAttackDamage, minePkmnHp, mineOriginalHp, true);
        const faintedBool = pokemonFaints(minePkmnHp, false, pickedPkmn);
        if (faintedBool) {
            makePkmnVis('#fight>li', false);
            updateinfo(`Oh no! partner ${pickedPkmn} fainted!...`);
            setTimeout(function () { updateinfo('Your pokemon blacked out!  Resetting Game...') }, 3000)
            setTimeout(function () { location.reload() }, 6000);
        } else {
            updateinfo(`Enemy ${whichPokemon} used ${currentAttackName.toLowerCase()}!`);
            makePkmnVis('#fight>li', true);
        }
    };

    function renderFight(whichPokemon, pickedPkmn) {

        // if false then it will not update your current pokemon's status
        if (pickedPkmn) {
            minePkmnHp = pokemonObj[pickedPkmn.toLowerCase()].hp;
            makePkmnVis('.pokemon-i-chose');
            $(".text-center").html("Let's Battle!");
            renderStats(pickedPkmn, 'fight');
            attackChosenClick("my-attack", pickedPkmn, whichPokemon);
            makeStatsVisAndFill('pokemon-stats', true, pickedPkmn.toLowerCase());
        }

        foePkmnHp = pokemonObj[whichPokemon.toLowerCase()].hp;
        $("#pokemon-opponent")
            .html(jqCreateImgPkmn(whichPokemon, 'bounce', 'fast', 'infinite', 'pkmn-opponent'));
        makeStatsVisAndFill('pokemon-opponent-stats', false, whichPokemon.toLowerCase());
    };

    function renderStats(whichPokemon, attacksID) {
        const myAttacks = pokemonObj[whichPokemon.toLowerCase()];
        myAttacks.attacks.map((attack, i) => {
            $(`#${attacksID}`)
                .append(`<li class="my-attack">${attack.attackName}<li>`)
        })
    };

    function renderBattle(pickedPkmn, callback) {
        // Render chosen pokemon
        $(".text-center").html("Choose an Opponent.");

        $("#pokemon-chosen")
            .html(jqCreateImgPkmn(pickedPkmn, 'pulse', 'fast', 'pokemon-i-chose', 'infinite'));

        // Filter remaining pokemon
        reduceListOfPKMN(pickedPkmn);
        // console.log(pkmnToRender);
        // Add animation
        renderChoosePokemon(pkmnToRender, 'pokemon-choose', 'tada', 'fast', 'pokemon-to-choose');
        //Add mouseover/out
        pokemonChosen('#info');
        //Add click then function
        pokemonChosenClick('.pokemon-to-choose', '#info', renderFight, true, pickedPkmn);
    };

    function makePkmnVis(classIdName, see = true) {
        if (see) {
            $(`${classIdName}`).css({ 'visibility': 'visible' });
        } else {
            $(`${classIdName}`).css({ 'visibility': 'hidden' });
        }
    };

    function updatehp(idHealthBar, damage, hp, originalHp, friend = false) {
        let newHp = hp - damage;
        const percent = (newHp / originalHp) * 100;
        //changes color of hp bar
        const newColor = (id, color) => $(`#${id}>div`)
            .css({ 'background-color': color });

        console.log(originalHp, hp, percent);
        if (percent <= 0) {
            console.log('\nYOUR DEAD\n')
            newHp = 0;
        } else if (percent < 15) {
            newColor(idHealthBar, 'red');
        } else if (percent < 50) {
            newColor(idHealthBar, 'orange');
        }

        if (friend === true) {
            $(`#mine-hp`).text(`hp ${newHp}/${originalHp}`)
        }
        $(`#${idHealthBar}>div`).css({ 'width': `${percent}%` });
        return newHp;
    };

    function makeStatsVisAndFill(id, mineOrFoe = true, aPkmn) {
        console.log(aPkmn)
        let prefix = mineOrFoe ? 'mine' : 'foe';
        const currentHp = mineOrFoe ? minePkmnHp : foePkmnHp;
        let idName = `${prefix}-name`;
        let idLevel = `${prefix}-level`;
        let idHp = `${prefix}-hp`;
        let idArray = [idName, idLevel, idHp];
        let { name, level, hp } = pokemonObj[aPkmn];
        let statArray = [name, `Lv. ${level}`, `hp ${currentHp}/${hp}`];
        idArray.map((stat, i) => $(`#${stat}`).text(`${statArray[i]}`));
        $(`#${id}`).css({ 'visibility': 'visible' });
    };

    //First Render Pokemon onto 'center-stage1 using the designated list.
    renderChoosePokemon(pkmnToRender, 'pokemon-choose', 'bounce', 'faster', 'pokemon-to-choose');
    // pokemonChosen - handles mouseOut, mouseIn animation
    pokemonChosen('#info');
    pokemonChosenClick('.pokemon-to-choose', '#info', renderBattle);
});