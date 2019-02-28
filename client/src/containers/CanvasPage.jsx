import React from "react";
import Canvas from "../components/Canvas"

const styles = {
    canvas : {
        border:'1px solid #333',
        margin:'20px 0px',
        cursor: 'crosshair'
    },

    maindiv : {
        padding:'10px',
        margin:'auto',
        width:'800px'
    },

    button : {
        border:'0px',
        margin:'1px',
        height:'50px',
        minWidth:'75px'
    },

    colorSwatches : {        
        red : {'backgroundColor' : 'red'},    
        orange : {'backgroundColor' : 'orange'},
        yellow : {'backgroundColor' : 'yellow'},
        green : {'backgroundColor' : 'green'},
        blue : {'backgroundColor' : 'blue'},
        purple : {'backgroundColor' : 'purple'},
        black : {'backgroundColor' : 'black'}
    }
}

class CanvasPage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.reset()
    }

    draw(e) { 
        //response to Draw button click 
        this.setState({
            mode:'draw'
        })
    }

    drawing(e) { //if the pen is down in the canvas, draw/erase

        if(this.state.pen === 'down') {

            this.ctx.beginPath()
            this.ctx.lineWidth = this.state.lineWidth
            this.ctx.lineCap = 'round';


            if(this.state.mode === 'draw') {
                this.ctx.strokeStyle = this.state.penColor
            }

            if(this.state.mode === 'erase') {
                this.ctx.strokeStyle = '#ffffff'
            }

            this.ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1]) //move to old position
            this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY) //draw to new position
            this.ctx.stroke();

            this.setState({ //save new position 
                penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
            })
        }
    }

    penDown(e) { 
        //mouse is down on the canvas
        this.setState({
            pen:'down',
            penCoords:[e.nativeEvent.offsetX, e.nativeEvent.offsetY]
        })
    }

    penUp() { 
        //mouse is up on the canvas
        this.setState({
            pen:'up'
        })
    }

 

    reset() { 
        //clears it to all white, resets state to original
        this.setState({
            mode: 'draw',
            pen : 'up',
            lineWidth : 2,
            penColor : 'black'
        })

        this.ctx = this.refs.canvas.getContext('2d')
        this.ctx.fillStyle="white"
        this.ctx.fillRect(0,0,800,600)
        this.ctx.lineWidth = 10
    }

    render() {
        return (
            /* We should seperate this to another component (Canvas) for modularity reasons. But as we are using but we can't use the'ref' attribute
             in the functional components. We have to figure a way out later
            */
            <div style={styles.maindiv}>
            <h4>Draw something</h4>
            <canvas ref="canvas" width="800px" height="600px" style={styles.canvas} 
                onMouseMove={(e)=>this.drawing(e)} 
                onMouseDown={(e)=>this.penDown(e)} 
                onMouseUp={(e)=>this.penUp(e)}>
            </canvas>
   
        </div>
        )
    }
}

export default CanvasPage;