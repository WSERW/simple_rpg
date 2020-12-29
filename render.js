// let artur = new Knight ('Артур')
// artur.weapon = {
// 	name: "Excalibur and Shield",
// 	dmg: 15,
	
// 	say: 3,
// }
// let arturTheKnight = document.querySelector("#Knight")

// arturTheKnight.querySelector('.unit_name').innerText = artur.name
// arturTheKnight.querySelector('.unit_weapon>span').innerText = artur.weapon
// arturTheKnight.querySelector('.unit_def>span').innerText = artur.def
// //arturTheKnight.querySelector('.unit_defi>span').innerText = artur.defi не готово
// arturTheKnight.querySelector('.unit_hp>span').innerText = artur.hp
// arturTheKnight.querySelector('.unit_dmg>span').innerText = artur.atk
// //arturTheKnight.querySelector('.unit_crit_dmg').innerText = artur.crit_dmg не готово
// //arturTheKnight.querySelector('.unit_speed').innerText = artur.speed


// let finn = new Archer('Финн');
// finn.weapon = {
// 	name: 'bow',
// 	dmg: 25,
	
// 	say: 0,
// }
// finn.speed = 15

// let finnTheArcher = document.querySelector("#Archer")

// finnTheArcher.querySelector('.unit_name').innerText = finn.name
// finnTheArcher.querySelector('.unit_weapon>span').innerText = finn.weapon
// finnTheArcher.querySelector('.unit_def>span').innerText = finn.def
// finnTheArcher.querySelector('.unit_hp>span').innerText = finn.hp
// finnTheArcher.querySelector('.unit_dmg>span').innerText = finn.atk
// //finnTheArcher.querySelector('.unit_crit_dmg').innerText = finn.crit_dmg не готово
// finnTheArcher.querySelector('.unit_speed').innerText = finn.speed




// новая функция вывода персонажа
let units = document.querySelector(".units")
function render_unit(unit, unitsDiv){
	let unitDiv = document.createElement('div');
	unitDiv.className = 'unit';
	unitDiv.innerHTML = `
			<h1 class="unit_name"> ${unit.name} - ${unit.spec}</h1>
			<h4 class="unit_weapon">Вооружен:<span> ${unit._weapon.name}</span></h4>
			<h4 class="unit_def">Защита:<span> ${unit.def}</span></h4>
			<h4 class="unit_hp">Здоровье:<span> ${unit.hp}</span></h4>
		    <h4 class="inventory Knight">Инвентарь:<span> ${unit.items}</span></h4>
			<h4 class="unit_dmg">Урон:<span> ${unit._weapon.dmg}</span></h4>
			<h4 class="unit_speed">Скорость:<span> ${unit.speed}</span></h4>
	`
	unitsDiv.append(unitDiv);
}
render_unit(bob,units);
render_unit(gandalf,units);
