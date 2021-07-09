import './App.css';
import {Component} from "react";
import {icon_names, icons} from "./icons";


function random_icon() {
    let rand_index = Math.floor(Math.random() * icons.length)
    let icon = icons[rand_index]
    let name = icon_names[rand_index]
    let author = name.split("__")[0].replace("_", "-")
    name = name.split("__")[1].replace("_", " ")
    return {icon: icon, name: name, author: author}
}

function random_icons(count) {
    let arr = []
    for (var i = 0; i < count; i++) {
        arr[i] = random_icon()
    }
    return arr
}

function Tile(props) {
    return (
        <div className="tile">
            <img src={props.src} id={props.index} alt={props.name} title={props.title}/>
            <div className="icon-extras">
                <button className="lock-button" onClick={props.onclick}>{props.locked ? "Unlock" : "Lock"}</button>
                <span className="icon-label">{props.name}</span>
            </div>
        </div>)
}

class TilesBar extends Component {

    constructor(props) {
        super(props);
        this.state = {icons: random_icons(4), locked: [false, false, false, false]}
        this.reroll = this.reroll.bind(this)
        this.toggleLock = this.toggleLock.bind(this)
    }

    reroll() {
        let new_icons = random_icons(this.state.icons.length)
        for (let i = 0; i < this.state.locked.length; i++) {
            if (this.state.locked[i]) {
                new_icons[i] = this.state.icons[i]
            }
        }
        this.setState({icons: new_icons})
    }

    toggleLock(i) {
        let new_locked = this.state.locked
        new_locked[i] = !new_locked[i]
        this.setState({locked: new_locked})
    }

    render() {
        console.log("Rendering")
        return (
            <div className="tilesBar">
                <div className="tiles">
                    {this.state.icons.map((i, index) => <Tile
                        src={i.icon}
                        title={"\"" + i.name + "\" by " + i.author}
                        name={i.name}
                        index={index}
                        locked={this.state.locked[index]}
                        onclick={() => (this.toggleLock(index))}
                    />)}
                </div>
                <div className="buttons">
                    <RerollButton onclick={this.reroll}/>
                </div>
            </div>
        )
    }
}


function RerollButton(props) {
    return (
        <div className="reroll-button">
            <button onClick={props.onclick}>Reroll</button>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <header className="header">
                <h1>Inspirinator</h1>
            </header>
            <TilesBar/>
            <footer className="footer">All images made by <a
                href="https://game-icons.net">https://game-icons.net</a></footer>
        </div>
    );
}

export default App;
