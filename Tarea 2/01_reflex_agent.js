var estado_visitados = [];

function estado_actual(estado){
	if(estado[0]=="A" && estado[1]=="DIRTY" && estado[2]=="DIRTY"){
		estado_visitados.push("1");
		return "1";
	}else if(estado[0]=="B" && estado[1]=="DIRTY" && estado[2]=="DIRTY"){
		estado_visitados.push("2");
		return "2";
	}else if(estado[0]=="A" && estado[1]=="DIRTY" && estado[2]=="CLEAN"){
		estado_visitados.push("3");
		return "3";
	}else if(estado[0]=="B" && estado[1]=="DIRTY" && estado[2]=="CLEAN"){
		estado_visitados.push("4");
		return "4";
	}else if(estado[0]=="A" && estado[1]=="CLEAN" && estado[2]=="DIRTY"){
		estado_visitados.push("5");
		return "5";
	}else if(estado[0]=="B" && estado[1]=="CLEAN" && estado[2]=="DIRTY"){
		estado_visitados.push("6");
		return "6";
	}else if(estado[0]=="A" && estado[1]=="CLEAN" && estado[2]=="CLEAN"){
		estado_visitados.push("7");
		return "7";
	}

	estado_visitados.push("8");
	return "8";
}

function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function test(states){
	
	if(estado_visitados.length < 8){
		var location = states[0];		
      	var state = states[0] == "A" ? states[1] : states[2];
      	var action_result = reflex_agent(location, state);
		console.log(states, action_result)
		if(states[1] == "CLEAN" && states[2] == "CLEAN"){
			action_result = "DIRTY";
		}
      	document.getElementById("log").innerHTML+="<br>".concat(estado_actual(states)).concat(" Location: ").concat(location).concat(" | Action: ").concat(action_result);
      	if (action_result == "CLEAN"){
        	if (location == "A") states[1] = "CLEAN";
         	else if (location == "B") states[2] = "CLEAN";
      	}else if(action_result === "DIRTY"){
			states[1] = "DIRTY";
			states[2] = "DIRTY"
		}
      	else if (action_result == "RIGHT") states[0] = "B";
      	else if (action_result == "LEFT") states[0] = "A";		
		setTimeout(function(){ test(states); }, 2000);
	}
      	
}

var states = ["A","DIRTY","DIRTY"];
test(states);