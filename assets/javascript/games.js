$(document).ready(function () {
    //READY TO PLAY
    console.log("jQuery Ready!");
    var wins = 0;
    var losses = 0;
    var genNumber;
    var totalVal = 0;

    function pokemonChosen() {
        $('.pokemon').on('mouseover', function () {
            var whichPokemon = $(this).attr("id");
            console.log('The pokemon is ' + whichPokemon)
            // var crystIntValue = parseInt(crystValue);
            // totalVal = totalVal + crystIntValue;
            // $('#total-value').text(totalVal);
            // winnerORloser();
        });
    };

    pokemonChosen();
});