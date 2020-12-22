allitems = [
	{
		type: "def",
	name: "barrier",
	active: function(n,e){
		e.def+=3;
		}
	},
	{
		type: "def",
	name: "wall",
	active: function(n,e){
		e.def+=10;
		e.atk-=3;
		}
	},
	{
		type: "atk",
	name: "vampire",
	active: function(n,e){
		e.hp-=3;
		n.hp+=3;
		}
	},
	{
		type: "help",
	name: "heal",
	active: function(n,e){
		e.hp+=10;
		}
	},
];
class Unit {
	lvl = 1;
	maxHp = 30;
	_hp = this.maxHp;
	def = 10;
	atk = 10;
	speed = 1;
	aim = 1;
	spec = 'без професси';
	maxitems = 3;
	items = [];



	constructor(name) {
		this.name = name;
	}

	use(n,e){
		if(this.items.length>0){
			let done = false;
		for(let i = 0; i<this.items.length; i++){
			if(this.items[i].name == n){
				done = true;
				this.items[i].active(this.name,e);
				this.items.splice(i,1);
				console.log(this.name + ' использовал ' + n + ' на ' + e.name);
			}
		}
		if(!done){
			console.log('У '+ this.name + ' нет такого предмета');
		}
		}else{
		console.log(this.name + ' не имеет никаких предметов');
	}
	}
	additem(n){
		
			if(this.maxitems>=this.items.length){
			for(let i = 0; i<allitems.length;i++){
				if(allitems[i].name == n){
					this.items.push(allitems[i]);
					console.log(this.name + ' получил ' + n);
				}else{
					console.log('Предмета ' + n + 'не существует');
				}
			}
		}else{
			console.log('У '+ this.name + ' нет места для предметов');
		}
		
	
	}

	lvlUp() {
		this.lvl += 1;
		this.maxHp += 10;
		this._hp = this.maxHp;
		this.def += 5;
		this.atk += 5;
		this.speed += 1;
	}

	hitEnemy(enemy) {

		if (!this._weapon) {
			console.log(`${this.name} безоружен`);
			return;
		}
		if (rand(1, 11) <= this._weapon.say) {
			let dmg = (this.atk - this.def) / 10 * this._weapon.dmg + this._weapon.dmg;
			this._hp -= dmg / 2;
			console.log(`${this.name} нанёс себе ${dmg} урона.`);
		}
		if (rand(1, 11) <= this.aim - enemy.speed) {
			let dmg = (this.atk - enemy.def) / 10 * this._weapon.dmg + this._weapon.dmg;
			if (dmg <= 0) {
				console.log(`${enemy.name} заблокировал атаку`);
			} else {
				enemy.hp -= dmg;
				console.log(`${enemy.name} получил ${dmg} урона.`);
			}

		} else {
			console.log(`${this.name} промахнулся `);
		}
	}
	set hp(value) {
		if (value <= 0) {
			console.log(this.name + ' погиб в битве');
			this._hp = 0;
		}
		this._hp = value
	}

	set weapon(weapon) {
		console.log(`${this.name} вооружился ${weapon.name}, урон: ${weapon.dmg}`);
		this._weapon = weapon;
	}

	get weapon() {
		if (!this._weapon) {
			console.log(`${this.name} безоружен`);
			return
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}
	get hp() {
		return this._hp;
	}
	get status() {
		return `У вас ${this._hp} здоровья`;
	}
}


class Knight extends Unit {
	maxHp = 50;
	_hp = this.maxHp;
	def = 10;
	atk = 15;
	speed = 1;
	aim = 9;
	spec = 'Рыцарь';
	maxitems = 3;
	availableWeapons = ['sword', 'pike', 'axe'];
	shield() {
		console.log(`${this.name} готовится обороняться`);
		this.def += 1;
		this.atk -= 1;
	}
	attack() {
		console.log(`${this.name} готовится к атаке`);
		this.def -= 1;
		this.atk += 1;
		this.aim += 1;
	}
	healthing() {
		console.log(`${this.name} заживляет раны`);
		this._hp += 3;
	}
	set weapon(value) {

		console.log(`${this.spec} ${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
		if (!this.availableWeapons.includes(value.name)) {
			this.atk = 0;
			console.log(`${this.name} не может использовать ${value.name}`);
		} else {
			this.atk = 15;
		}
		this._weapon = value;
	}
	get weapon() {
		if (!this._weapon) {
			console.log(`${this.name} безоружен`);
			return
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}
}

class Archer extends Unit {
	maxHp = 30;
	_hp = this.maxHp;
	def = 5;
	atk = 25;
	speed = 3;
	aim = 1;
	maxitems = 3;
	spec = 'Лучник';
	availableWeapons = ['bow','knife'];
	speeding() {
		console.log(`${this.name} готовится к укланению`);
		this.speed += 1;
		this.atk -= 5;
	}
	aiming() {
		console.log(`${this.name} концентрируется`)
		this.aim += 1;
		this.atk += 3;
	}
	healthing() {
		console.log(`${this.name} заживляет раны`);
		this._hp += 3;
	}
	set weapon(value) {


		console.log(`${this.spec} ${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
		if (!this.availableWeapons.includes(value.name)) {
			this.atk = 0;
			console.log(`${this.name} не может использовать ${value.name}`);
		} else {
			this.atk = 15;
		}
		this._weapon = value;
	}
	get weapon() {
		if (!this._weapon) {
			console.log(`${this.name} безоружен`);
			return
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}
}

class Wizard extends Unit {
	maxHp = 25;
	_hp = this.maxHp;
	def = 10;
	atk = 15;
	speed = 1;
	aim = 8;
	man = 0;
	maxitems = 3;
	spec = 'Маг';
	availableWeapons = ['book','fireball','stick'];
	maning(){
		this.man++;
		console.log(`${this.name} накапливает силу`);
	}
	freezing(enem) {
		if(this.man>=3){
			console.log(`${this.name} замедляет и десконцинтрирует ${enem.name}`);
		enem.speed -= 1;
		enem.aim -= 3;
		this.man-=3;
		}else{
			console.log(`${this.name} недостаточно силён для этого заклинания`);
		}
		
	}
	aiming() {
		console.log(`${this.name} концентрируется`)
		this.aim += 1;
		this.atk += 3;
	}
	healthing(hit) {
		if(this.man>=1){
		console.log(`${this.name} усердно заживляет раны ${hit.name}`);
		hit._hp += 5;
		this.man-=1;
	}else{
		console.log(`${this.name} недостаточно силён для этого заклинания`);
	}
	}
	finaldef(){
		if(this.man>=5){
		console.log(`${this.name} отчаянно защищается`);
		this.def +=15;
		this.atk -=5;
		this.man-=5;
	}else{
		console.log(`${this.name} недостаточно силён для этого заклинания`);
	}

	}
	finalatk(){
		if(this.man>=5){
		console.log(`${this.name} отчаянно атакует`);
		this.def -= 5;
		this.atk +=15;
		this.man-=5;
	}else{
		console.log(`${this.name} недостаточно силён для этого заклинания`);
	}
	}
	diedatk(enemy){
		if(this.man>=10){
		console.log(`${this.name} налаживает мощную порчу на ${enemy.name}`);
		enemy.def -= 15;
		enemy.atk -=15;
		enemy.speed -=3;
		this.man-=10;
	}else{
		console.log(`${this.name} недостаточно силён для этого заклинания`);
	}

	}
	set weapon(value) {


		console.log(`${this.spec} ${this.name} вооружился ${value.name}, урон: ${value.dmg}`);
		if (!this.availableWeapons.includes(value.name)) {
			this.atk = 0;
			console.log(`${this.name} не может использовать ${value.name}`);
		} else {
			this.atk = 15;
		}
		this._weapon = value;
	}
	get weapon() {
		if (!this._weapon) {
			console.log(`${this.name} безоружен`);
			return
		};
		return `${this.name} вооружен ${this._weapon.name}, урон: ${this._weapon.dmg}`;
	}
}

function rand(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

let bob = new Knight('bob');
bob.weapon = {
	name: 'axe',
	dmg: 8,
	say: 3
}
let jack = new Archer('jack');
jack.weapon = {
	name: 'bow',
	dmg: 5,
	say: 0
}
jack.speed = 2;
let Gandalf = new Wizard('Gandalf');
Gandalf.weapon = {
	name: 'stick',
	dmg: 10,
	say: 1
}