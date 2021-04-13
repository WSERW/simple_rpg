var socket = io();
let unit;
socket.emit("new player",socket.id);
socket.on("Player", function(data){
	console.log(data);
	unit = data.player;
	console.log(unit)
	ReactDOM.render(<UnitRender unit={unit} />,
	document.querySelector('.units'))
});

class UnitRender extends React.Component{

// функция компонента
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
            <button className="moves_btn atak" >Атаковать</button>
            <button className="moves_btn defend" > Защититься</button>
            <button  className="moves_btn heal">Полечиться</button>
            </div>
        </div>
    )
}
}
