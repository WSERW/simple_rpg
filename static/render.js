var socket = io();
let unit;
let nam;
let cl;
let pl = [];
let time = new Date();

socket.on("Info", function (data) {
	console.log(data);
});

window.onbeforeunload = function () {
	socket.emit("Exit", socket.id);
}
class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			players: {},
			self: {
				name: '',
				class: '',
				id: 0,
			},
			chat: [],
			mes: ""
		}
		this.newPlayer = this.newPlayer.bind(this);
		this.playersData = this.playersData.bind(this);
		this.send = this.send.bind(this);
		this.change = this.change.bind(this);
		this.chat = this.chat.bind(this);
		this.hitEnemy = this.hitEnemy.bind(this);
		this.aiming = this.aiming.bind(this);
		this.shield = this.shield.bind(this);
		this.healthing = this.healthing.bind(this);
		this.use = this.use.bind(this);
	}
	hitEnemy() {
		socket.emit("Attack", {
			self: this.state.self.id,
			enemy: prompt("Enemy's name:")
		});
	}
	use() {
		socket.emit("Use", {
			self: this.state.self.id,
			enemy: prompt("Enemy's name:"),
			using: prompt("Item's name:")
		});
	}
	aiming() {
		socket.emit("Aim", {
			self: this.state.self.id,

		});
	}
	speeding() {
		socket.emit("Speeding", {
			self: this.state.self.id,

		});

	}
	shield() {
		socket.emit("Shield", {
			self: this.state.self.id,

		});

	}
	healthing() {
		socket.emit("Healthing", {
			self: this.state.self.id,

		});

	}
	send(e){
		e.preventDefault();
		socket.emit("Send", {
			id:socket.id,
			text:this.state.mes,
			time: new Date()
		});
	}
	change(e){
		if(e.target.value.length>255){
			return;
		}
this.setState({mes:e.target.value});
		}
		chat(){
			console.log("Chat!");
			var game = this;
			socket.on("Chat", function (data) {
				game.setState({chat:data});
			});
		}
	newPlayer() {
		var game = this;
		var t = false;
		let l = true;
		var classes = ["Knight", "Archer", "Wizard"]
		do {
			nam = prompt("Hero's name:");
			cl = prompt("class(Knight,Archer,Wizard)");
			
			let f = true;
			for (let key in this.state.players){
				f=false;
			}
			console.log(f,this.state.players,this.state);
			if(!f){
				t = Object.entries(this.state.players).filter(player => player[1].name == nam).length
				console.log(Object.entries(this.state.players));
			}
			console.log(Object.entries(this.state.players));
			for(let i = 0; i<classes.length; i++){
				if(classes[i]==cl){
					l=false;
					
				}
			}
			console.log("l = " + l,"t = " + t);
		} while (t || l);
		game.setState({ self: { name: nam, class: cl, id: socket.id } });
		socket.emit("new player", {
			name: nam,
			cl: cl,
			id: socket.id
		});




	}
	playersData() {
		var game = this;

		socket.on("players", (data) => {
			game.setState({ players: data })
		});
	}
	componentDidMount() {
		this.playersData()
		let bord = true;
		let int = setInterval(()=>{
			if(!Object.entries(this.state.players).length){
				console.log('Loading...')
				if(performance.now() > 15000 && bord){
					bord = confirm('Данные не получены')
					console.log(this.state)
					if(bord) {
						clearInterval(int)
						let create = confirm('Хотите создать персонажа')
						if (create) this.newPlayer()
					}
				}
			}
			else{
				clearInterval(int)
				let create = confirm('Хотите создать персонажа')
				if (create) this.newPlayer()
			}
			console.log(Object.entries(this.state.players))
		},1000)
		console.log(this.state);
		this.chat();
	}

	render() {
		let self = "";
		let slot1=this.state.players[socket.id].items
		if(this.state.players[socket.id]){
			self=<UnitRender self={true} unit={this.state.players[socket.id]} id={socket.id}/>;
		}
		return (
			<div className="game">
				<div className="units">
					{Object.keys(this.state.players).map((id) =>{
					if(id!=this.state.self.id){
						return <UnitRender key={id} unit={this.state.players[id]} id={id} />;
					}
						
						
				})}
				
				{self}
				</div>
				<form className="chat" onSubmit={this.send} onChange={this.change}>
				<h2 className="cha">Chat:</h2>
				{this.state.chat.map((msg) =>
				<div className="ch">
					<span className="word">{this.state.players[msg.id].name+": "+msg.text}</span><br/>
					
					</div>
				)}
				<input type="text" id="input"/>
				</form>
				<div className="interface">
					<button className="moves_btn missing" onClick={() => { this.speeding() }}><img className="icon" src="static/speed.png"/></button>
					<button className="moves_btn aim" onClick={() => { this.aiming() }}><img className="icon" src="static/aim.png"/></button>
					<button className="moves_btn atak" onClick={() => { this.hitEnemy() }}><img className="icon" src="static/sword.png"/></button>
					<button className="moves_btn defend" onClick={() => { this.shield() }}><img className="icon" src="static/shield.png"/></button>
					<button className="moves_btn heal" onClick={() => { this.healthing() }}><img className="icon" src="static/heal.png"/></button>
					<button className="moves_btn use" onClick={() => { this.use() }}><img className="icon" src="static/use.png"/></button>
					<button className="moves_btn box" onClick={() => { this.use() }}><img className="icon" src="static/use.png"/></button>
					<button className="moves_btn box" onClick={() => { this.use() }}><img className="icon" src="static/use.png"/></button>
					<button className="moves_btn box" onClick={() => { this.use() }}><img className="icon" src="static/use.png"/></button>
				</div>
			</div>
		)
	}
}
class UnitRender extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			enemyId: 0,
		}
	}
	render() {
		let sprite = "static/" + this.props.unit.spec + ".png";
		let className="unit"
		if(this.props.self){
			className="self_unit";
		}
		
		return (
			<div className={className}>
				<div className="stats">
					<span className="unit_name">Имя: {this.props.unit.name}</span><br />  {/* подставляем параметры из получаемого пропс */}
					<span className="unit_weapon">Оружие: {this.props.unit._weapon.name}</span><br /> {/* подставляем параметры из получаемого пропс */}
					<span className="unit_spec">Направление: {this.props.unit.spec}</span><br /> {/* подставляем параметры из получаемого пропс */}
					<span className="unit_def">Защита: {this.props.unit._def}</span><br /> {/* подставляем параметры из получаемого пропс */}
					<span className="unit_hp">Хитпоинты: {this.props.unit._hp}</span><br /> {/* подставляем параметры из получаемого пропс */}
					<span className="unit_dmg">Скорость: {this.props.unit.speed}</span><br /> {/* подставляем параметры из получаемого пропс */}
					<span className="unit_dmg">Урон: {this.props.unit._weapon.dmg + this.props.unit._atk}</span><br /> {/* подставляем параметры из получаемого пропс */}
					<span className="unit_dmg">Меткость: {this.props.unit.aim}</span><br /> {/* подставляем параметры из получаемого пропс */}
					<span className="unit_dmg">Инвентарь: {this.props.unit.itemn}</span><br /> {/* подставляем параметры из получаемого пропс */}
					
					<img src={sprite} alt="wizard" id="sprite"/>
				
				</div>

				
				
			</div>
			// <div></div>
		)
	}
}

ReactDOM.render(<Game />,
	document.querySelector('#root'))
