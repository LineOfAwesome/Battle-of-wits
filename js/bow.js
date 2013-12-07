PLAYERS = [];
CURRENT_PLAYER = 0;


$(function(){
	$(".state").not("#state-menu").hide();
	$(".btn-set").on("click", ".m-btn", btnHandler);
	$("#player-list").on("click", ".player-list-item", viewPlayer);
});

/* Handlers */


function changeState(state){
	$(".state").not("#state-" + state).hide();
	$(".state#state-" + state).show()
}

function startGame(){
	$("#player-names .player-name").each(function(index, player){
		var name = player.value == "" ? "Player " + (index+1) : player.value;
		var p = new Player(name, 10, 10);
		PLAYERS.push(p);
	});
	PLAYERS = shuffle(PLAYERS);
	CURRENT_PLAYER = 0;
	log(PLAYERS[CURRENT_PLAYER].name + "'s turn");

	var out = "";
	for(i in PLAYERS){
		out += "<a href='#' data-id='" + i + "' class='player-list-item'>" + PLAYERS[i].name + "</a><br />";
	}
	$("#player-list").html(out);

	viewPlayer(CURRENT_PLAYER);
}

function viewPlayer(){
	var index = $(this).data("id") || CURRENT_PLAYER;
	var player = PLAYERS[index];

	$("#player-info #p-name").text(player.name);
	$("#player-info #p-hp").text(player.cur_hp + "/" + player.max_hp);
	$("#player-info #p-mp").text(player.cur_mp + "/" + player.max_mp);
}

function btnHandler(){
	var value = $(this).text();
	value = value.toLowerCase();
	switch(value){
		case "play":
			changeState("players");
			break;
		case "guide":
			changeState("guide");
			break;
		case "add player":
			var l = $(".player-name").length + 1;
			if(l < 5){
				var input = "<input type='text' class='form-control text-center bot-space player-name' placeholder='Player "+l+"'>";
				$("#player-names").append(input);	
			}else{
				log("Too much dude..");
			}
			break;
		case "start":
			changeState("in-game");
			startGame();
			break;
		case "back":
			changeState("menu");
			break;
		case "exit":
			log("exit");
			break;
		default:
		break;
	}
}

function log(value){
	var out = "\n";
	if(typeof(value) == "string"){
		out += value;
	}else{
		out += "<h3>Object</h3>";
		out += value;
	}
	$("#log").html(out);
}

function shuffle(array) {
  var currentIndex = array.length, 
  	temporaryValue,
  	randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

var Player = function(name, hp, mp){
	return {name: name, cur_hp: hp, max_hp: hp, cur_mp: mp, max_mp: mp};
}