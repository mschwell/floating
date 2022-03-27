import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { render } from "react-dom";
import { GithubPicker   } from 'react-color';

import { Stage, Layer, Rect } from "react-konva";
import Konva from 'konva';

class App extends Component {
  state = {
    isDragging: false,
    x: (window.innerWidth * .3),
    y: (window.innerHeight * .3),
    color:"red"
  };

  startX =(window.innerWidth * .3);
  startY = (window.innerHeight * .3);
  
  handleChangeComplete = (color, event) => {
    this.setState({ color: color.hex });
  };

  render() {
    return (
      <div className="container">
        <div className='row'>
        <div className='col-sm-10'>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Rect
              width={100}
              height={100}
              fill={this.state.color}
              shadowBlur={10}
              x={this.state.x}
              y={this.state.y}
              draggable
              onDragStart={() => {
                this.state.color=Konva.Util.getRandomColor()
                this.setState({
                  isDragging: true
                });
              }}
              onDragEnd={(e) => {
                if(((this.startX - e.target.x()) < 30) &&  ((this.startY - e.target.y()) < 30)) {
                  this.setState({
                    color:"red"
                  });
                }
                this.setState({
                  isDragging: false,
                  x: e.target.x(),
                  y: e.target.y()
                });
              }}
            />
          </Layer>
        </Stage>
      </div>
        <div className='col-sm-2'>
        <GithubPicker onChangeComplete={ this.handleChangeComplete } />
      </div>
      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));