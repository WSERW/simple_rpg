// let hero = {
// 	name: 'Jhon',
// 	hp: 100,
// 	def:10,
// 	weapon: 'sword',
// 	lvlUp: function(){
// 		this.hp+=10;
// 	}
// }

// hero.lvlUp();

// console.log(hero)



// function createHero(name,weapon) {
// 	return{
// 		name: name,
// 		hp: 100,
// 		def:10,
// 		weapon: weapon,
// 		lvlUp: function(){
// 			this.hp+=10;
// 		}
// 	}
// }



// let hero2 = createHero('bob','pike')
// hero2.lvlUp();

// console.log(hero2)



// class Hero {
// 	constructor(name,weapon){
// 		this.name = name;
// 		this.weapon = weapon;
// 		this.hp = 100;
// 		this.def= 10;
// 	}

// 	lvlUp(){
// 		this.hp+=10;
// 	}


// }


// let hero3 = new Hero('Alan','gun');

// hero3.lvlUp();

// console.log(hero3)




class Unit {
	lvl = 1;
	maxHp = 100;
	_hp = this.maxHp;
	def = 10;
	atk = 10;
	spec = 'без професси';



	constructor(name){
		this.name = name;
	}



	lvlUp(){
		this.lvl+=1;
		this.maxHp+=10;
		this._hp = this.maxHp;
		this.def+=5;
		this.atk+=5;
	}

	hitEnemy(enemy){

		if(!this._weapon){
			console.log(`${this.name} безоружен`);
			return
		};

		let dmg = (enemy.def - this.atk)/10*this._weapon.dmg + this._weapon.dmg;
		enemy.hp -= dmg;
		console.log(`${enemy.name} получил ${dmg} урона.`);
	}


	set hp(value){
		console.log('удар')
		if (value <= 0) {
			console.log('Вы погибли в битве...')
			this._hp = 0;
		}
		this._hp = value
	}

	set weapon(value){
		console.log(`${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
		this._weapon = weapon;
	}

	get weapon(){
		if(!this._weapon){
			console.log(`${this.name} безоружен`);
			return
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}

	get hp(){
		return `У вас ${this._hp} здоровья`;
	}
}


class Knight extends Unit{
	maxHp = 120;
	def = 30;
	atk = 15;
	spec = 'Рыцарь';
	availableWeapons = ['sword','pike','axe'];
	set weapon(value){

		console.log(`${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
		if (!this.availableWeapons.includes(value.name)) {
			this.atk = 0;
			console.log(`${this.name} не может использовать ${value.name}`);
		}
		else{
			this.atk = 15;
		}
		this._weapon = value;
	}
}

class Archer extends Unit{
	maxHp = 90;
	def = 10;
	atk = 25;
	spec = 'Лучник';
	availableWeapons = ['bow'];
	set weapon(value){
		console.log(`${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
		if (!this.availableWeapons.includes(value.name)) {
			this.atk = 0;
			console.log(`${this.name} не может использовать ${value.name}`);
		}
		else{
			this.atk = 25;
		}
		this._weapon = value;
	}
}

let unit1 = new Knight('bob');
unit1.weapon = {name:'axe',dmg:10}

let unit2 = new Archer('jack');
unit2.weapon = {name:'bow',dmg:7}

unit1._hp = 0;