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
			name:this.state.self.name,
			cl:this.state.self.name,
		});
	}
	playersData(){
		socket.on("players", (data)=>{
			this.setState({players: data})
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
						<UnitRender key={id} unit={this.state.players[id] id={id}/>
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
		this.hitEnemy = this.hitEnemy.bind(this)
	}
	hitEnemy(enemyId){
		socket.emit("Attack",{
			self:this.props.id,
			enemy: enemyId,
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
	            <span className="unit_def">Защита: {this.props.unit.def}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            <span className="unit_hp">Хитпоинты: {this.props.unit.hp}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            <span className="unit_dmg">Урон: {this.props.unit._weapon.dmg}</span><br/> {/* подставляем параметры из получаемого пропс */}
	            </div>

	            <div className="moves">
	            <button className="moves_btn missing" >Уклонение</button>
	            <button className="moves_btn aim" >Прицелиться</button>
	            <button className="moves_btn atak" onClick=()=>{this.hitEnemy(this.state.enemyId)}>Атаковать</button>
	            <button className="moves_btn defend" > Защититься</button>
	            <button  className="moves_btn heal">Полечиться</button>
	            </div>
	        </div>
	    )
	}
}
ReactDOM.render(<Game />,
	document.querySelector('#root'))
