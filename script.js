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

		let dmg = (this.atk - enemy.def)/10*this._weapon.dmg + this._weapon.dmg;
		enemy.hp -= dmg;
		console.log(`${enemy.name} получил ${dmg} урона.`);
	}
	set hp(value){
		if (value <= 0) {
			console.log('Вы погибли в битве...');
			this._hp = 0;
		}
		this._hp = value
	}
	set weapon(value){
		console.log(`${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
		this._weapon = value;
	}
	get weapon(){
		if(!this._weapon){
			return `${this.name} безоружен`;
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}
	get hp(){
		return this._hp;
	}
	get status(){
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
		if (!this.availableWeapons.includes(value.name)) {
			console.log(`${this.name} не может использовать ${value.name}`);
			return;
		}
		this._weapon = value;
		console.log(`${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
	}
	get weapon(){
		if(!this._weapon){
			return `${this.name} безоружен`;
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}
}

class Archer extends Unit{
	maxHp = 90;
	def = 10;
	atk = 25;
	spec = 'Лучник';
	availableWeapons = ['bow'];
	set weapon(value){
		if (!this.availableWeapons.includes(value.name)) {
			console.log(`${this.name} не может использовать ${value.name}`);
			return;
		}
		this._weapon = value;
		console.log(`${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
	}
	get weapon(){
		if(!this._weapon){
			return `${this.name} безоружен`;
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}
}

let unit1 = new Knight('bob');
unit1.weapon = {name:'axe',dmg:10}

let unit2 = new Archer('jack');
unit2.weapon = {name:'bow',dmg:7}



