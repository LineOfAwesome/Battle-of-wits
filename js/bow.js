PLAYERS = [];
CURRENT_PLAYER = 0;

ACTION = {
	attack: {
		target: "unit",
		cost:{
			type: "none",
			value: "1~2"
		}
	},
	block: {
		target: "self",
		cost:{
			type: "none",
			value: "0"
		}
	},
	heal: {
		target: "self"
	}
};


$(function(){
	$(".state").not("#state-menu").hide();
	$(".btn-set").on("click", ".m-btn, .po-btn", btnHandler);
	$("#player-list").on("click", ".player-list-item", viewPlayer);
});

/* Handlers */

function changeState(state){
	$(".state").not("#state-" + state).hide();
	$(".state#state-" + state).show();
	$("#player-list").hide();
}

function startGame(){
	$("#player-names .player-name").each(function(index, player){
		var name = player.value == "" ? "Player " + (index+1) : player.value;
		var p = new Player(name, 10, 10);
		PLAYERS.push(p);
	});
	PLAYERS = shuffle(PLAYERS);
	CURRENT_PLAYER = 0;

	setPlayerList();
	viewPlayer();
}

function setPlayerList(){
	var out = "<h2 class='text-center'>Select a Player</h2>";
	for(i in PLAYERS){
		out += "<a href='#' data-id='" + i + "' class='player-list-item form-control btn btn-default bot-space'>" + PLAYERS[i].name + "</a><br />";
	}
	out += "<hr />";
	$("#player-list").html(out).hide();
}

function viewPlayer(){
	var index = $(this).data("id") || CURRENT_PLAYER;
	var player = PLAYERS[index];

	$("#cur-player").text(PLAYERS[CURRENT_PLAYER].name);
	$("#player-info #current-player").text(player.name);
	$("#player-info #p-hp").width((player.cur_hp/player.max_hp) * 100+ "%");
	$("#player-info #p-mp").width((player.cur_mp/player.max_mp) * 100+ "%");
}

function addPlayerInput(){
	var l = $(".player-name").length + 1;
	if(l < 5){
		var input = "<input type='text' class='form-control text-center bot-space player-name' placeholder='Player "+l+"'>";
		$("#player-names").append(input);	
	}else{
		log("Too much dude..");
	}
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
			addPlayerInput();
			break;
		case "start":
			changeState("in-game");
			startGame();
			break;
		case "pass":
			CURRENT_PLAYER = (CURRENT_PLAYER + 1) % PLAYERS.length;
			viewPlayer();
			changeState("next-player-guide");
			break;
		case "next":
			changeState("in-game");
			break;
		case "back":
			changeState("menu");
			break;
		case "attack":
			$("#player-list").show();
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
		if(value.constructor == Array){
			out += value.toString();
		}
		else if(value.constructor == Object){
			out += JSON.stringify(value);
		}
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

function randomRange(min, max){
	return parseInt( min + (Math.random() * ( (max+1) - min) ) );
}