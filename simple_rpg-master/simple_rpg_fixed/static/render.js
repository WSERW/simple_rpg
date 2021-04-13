var socket = io();
let name = prompt("Hero's name:");
let cl = prompt("class(Knight,Archer,Wizard)");
var artur;
var finn;
var my = -1;
var m = true

socket.emit("new player",{
	name:name,
	cl:cl
});
console.log(name);
socket.on("Player", function(data){
	if(m){
		m=false;
		my=data.my;
	}
	
	console.log(my);
});
socket.on('state', function(data){
	
	
	artur = data[0];
	

	if(artur!=null){
	let arturTheKnight = document.querySelector("#Knight")
arturTheKnight.querySelector('.unit_name').innerText = artur.name;
arturTheKnight.querySelector('.unit_class').innerText = "class:"+artur.spec;
arturTheKnight.querySelector('.unit_weapon>span').innerText = artur.weapon;
arturTheKnight.querySelector('.unit_def>span').innerText = artur.def;
//arturTheKnight.querySelector('.unit_defi>span').innerText = artur.defi не готово
arturTheKnight.querySelector('.unit_hp>span').innerText = artur._hp;
arturTheKnight.querySelector('.unit_dmg>span').innerText = artur.atk;
//arturTheKnight.querySelector('.unit_crit_dmg').innerText = artur.crit_dmg не готово
arturTheKnight.querySelector('.unit_speed').innerText = "speed: " + artur.speed;
}	
	
		finn = data[1];

if(finn!=null){
	let finnTheArcher = document.querySelector("#Archer");

finnTheArcher.querySelector('.unit_name').innerText = finn.name;
finnTheArcher.querySelector('.unit_class').innerText = "class:" + finn.spec;
finnTheArcher.querySelector('.unit_weapon>span').innerText = finn.weapon;
finnTheArcher.querySelector('.unit_def>span').innerText = finn.def;
finnTheArcher.querySelector('.unit_hp>span').innerText = finn._hp;
finnTheArcher.querySelector('.unit_dmg>span').innerText = finn.atk;
//finnTheArcher.querySelector('.unit_crit_dmg').innerText = finn.crit_dmg не готово
finnTheArcher.querySelector('.unit_speed').innerText = "speed: " + finn.speed;
}


	document.querySelector("#Attack").onclick = function(){
	socket.emit("Attack",my);
	
}
	
});






socket.on('Player', function(data){
	if(!artur){
		
	artur=data.player;
	}else{
		
		finn=data.player;
	}
	

});


socket.emit('lol',artur);