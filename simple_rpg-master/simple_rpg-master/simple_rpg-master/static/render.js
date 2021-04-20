var socket = io();
let unit;

class Game extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			players: {},
			self: {
				name:'',
				class:'',
				id: 0,
			},
		}
	}
	newPlayer(){
		let name = prompt("Hero's name:");
		let cl = prompt("class(Knight,Archer,Wizard)");
		this.setState(self:{name:name,class:cl,id:socket.id})
		socket.emit("new player",{
			name:name,
			cl:cl,
		});
	}
	playersData(){
		socket.on("players", (data)=>{
			this.setState({players: data})
			console.log(data)
		});
	}
	componentDidMount(){
		this.newPlayer()
		this.playersData()
	}
	render(){
		return(
			<div className="game">
				<div className="units">
					{Object.keys(this.state.players).map((id) =>
						<UnitRender key={id} unit={this.state.players[id]} id={id}/>
					)}
				</div>
			</div>
		)
	}
}
class UnitRender extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			enemyId: 0,
		}
		this.hitEnemy = this.hitEnemy.bind(this);
		this.aiming = this.aiming.bind(this);
	}
	hitEnemy(enemyId){
		socket.emit("Attack",{
			self:this.props.id,
			enemy: enemyId,
		});
	}
	aiming(){
		socket.emit("Aim",{
			self:this.props.id,
			
		});
	}
	speeding(){
		socket.emit("Speeding",{
			self:this.props.id,
			
		});
	}
	render (){
	    // генерируемый html
	    return(
	        <div className="unit">
	            <div className="stats">
	            <span className="unit_name">Имя: {this.props.unit.name}</span><br/>  {/* подставляем параметры из получаемого пропс */}
	            <span className="unit_weapon">Оружие: {this.props.unit._weapon.name}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            <span className="unit_spec">Направление: {this.props.unit.spec}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            <span className="unit_def">Защита: {this.props.unit._def}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            <span className="unit_hp">Хитпоинты: {this.props.unit._hp}</span><br/> {/* подставляем параметры из получаемого пропс */}
				<span className="unit_dmg">Скорость: {this.props.unit.speed}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            <span className="unit_dmg">Урон: {this.props.unit._weapon.dmg+this.props.unit._atk}</span><br/> {/* подставляем параметры из получаемого пропс */}
				<span className="unit_dmg">Меткость: {this.props.unit.aim}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            </div>

	            <div className="moves">
	            <button className="moves_btn missing" onClick={()=>{this.speeding()}}>Уклонение</button>
	            <button className="moves_btn aim" onClick={()=>{this.aiming()}}>Прицелиться</button>
	            <button className="moves_btn atak" onClick={()=>{this.hitEnemy(this.state.enemyId)}}>Атаковать</button>
	            <button className="moves_btn defend" > Защититься</button>
	            <button  className="moves_btn heal">Полечиться</button>
	            </div>
	        </div>
	    )
	}
}
ReactDOM.render(<Game />,
	document.querySelector('#root'))
