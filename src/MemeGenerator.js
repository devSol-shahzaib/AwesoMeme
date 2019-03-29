import React, {Component} from "react"

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
            ColorHolder:'white'
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getRandomColor=this.getRandomColor.bind(this)
       
        
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const {memes} = response.data
                this.setState({ allMemeImgs: memes })
            })
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    
    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }
    getRandomColor(){
        var colors=["yellow","purple","white","olive","aqua","green","maroon","gray"]
       this.setState({
            ColorHolder:colors[Math.floor(Math.random()*colors.length)]  
        })
    }
    
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        type="text"
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    /> 
                    <input 
                        type="text"
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    /> 
                
                    <button>Change Img</button>
                    
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="image" />
                    <h2 className="top" style={{color:this.state.ColorHolder}} >{this.state.topText}</h2>
                    <h2 className="bottom" style={{color:this.state.ColorHolder}} >{this.state.bottomText}</h2>
                </div>
                <div className="bottomButtonDiv">
                <button onClick={this.getRandomColor}>Change Text color</button>
               
                </div>
                
            </div>
        )
    }
}

export default MemeGenerator