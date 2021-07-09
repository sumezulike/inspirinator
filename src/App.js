import './App.css';
import {useState} from "react";
import {icon_names, icons} from "./icons";


function random_icon() {
    let rand_index = Math.floor(Math.random() * icons.length)
    let icon = icons[rand_index]
    let name = icon_names[rand_index]
    let author = name.split("__")[0].replace(/_/g, "-")
    name = name.split("__")[1].replace(/_/g, " ")
    let url = "https://game-icons.net/1x1/" + author + "/" + name.replace(/ /g, "-") + ".html"
    return {
        icon: icon,
        name: name, author: author,
        locked: false,
        url: url
    }
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
            <a href={props.url} target="_blank" rel="noreferrer">
                <img src={props.src} id={props.index} alt={props.name} title={props.title}/>
            </a>
            <div className="icon-extras">
                <button className="lock-button" onClick={props.onclick}>
                    {props.button_text}
                </button>
                <span className="icon-label">
                    <a href={props.url} target="_blank" rel="noreferrer">
                        {props.name}
                    </a>
                </span>
            </div>
        </div>)
}

function TilesBar() {

    const [icons, setIcons] = useState(() => random_icons(4))

    function reroll() {
        let new_icons = random_icons(icons.length)
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].locked) {
                new_icons[i] = icons[i]
            }
        }
        setIcons(new_icons)
    }

    function toggleLock(i) {
        let new_icons = [...icons]
        new_icons[i].locked = !icons[i].locked
        setIcons(new_icons)
    }

    return (
        <div className="tilesBar">
            <div className="tiles">
                {icons.map((i, index) => <Tile
                    src={i.icon}
                    title={"\"" + i.name + "\" by " + i.author}
                    name={i.name}
                    index={index}
                    button_text={icons[index].locked ? "Unlock" : "Lock"}
                    onclick={() => (toggleLock(index))}
                    url={i.url}
                />)}
            </div>
            <div className="buttons">
                <RerollButton onclick={reroll}/>
            </div>
        </div>
    )
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
