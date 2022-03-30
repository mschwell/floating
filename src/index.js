import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import { render } from "react-dom";
import { GithubPicker   } from 'react-color';

import { Stage, Layer, Rect, Circle } from "react-konva";
import Konva from 'konva';

class App extends Component {

  state = {
    isDragging: false,
    x: (window.innerWidth * .3),
    y: (window.innerHeight * .3),
    color:"red",
    shape:"rect",    
    options : [
      { label: '', value: 'Pick A Shape' },
      { label: 'rect', value: 'Rectangual' },
      { label: 'circle', value: 'Circle' },
    ]
  };

  startX =(window.innerWidth * .3);
  startY = (window.innerHeight * .3);
  
  handleChangeComplete = (color, event) => {
    this.setState({ color: color.hex });
  };

  handleChangeShape = (event) => {
    this.setState({ shape: event.target.value });
  };

  render() {
    const renderShape = () => {  
      if (this.state.shape === "rect") {
      return <Rect
        width={100}
        height={100}
        fill={this.state.color}
        shadowBlur={10}
        x={this.state.x}
        y={this.state.y}
        draggable
        onDragStart={() => {
          this.setState({
            isDragging: true,
            color: Konva.Util.getRandomColor()
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
    } else {
      return <Circle
        width={100}
        height={100}
        fill={this.state.color}
        x={this.state.x}
        y={this.state.y}
        draggable
        onDragStart={() => {
          this.setState({
            isDragging: true,
            color: Konva.Util.getRandomColor()
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
    }}
    return (
      <div className="container">
        <div className='row'>
        <div className='col-sm-10'>
        <Stage width={(window.innerWidth - 1000)} height={window.innerHeight}>
          <Layer>
            { renderShape()  }
          </Layer>
        </Stage>
      </div>
        <div className='col-sm-2'>
        <GithubPicker onChangeComplete={ this.handleChangeComplete } />
        <select onChange={this.handleChangeShape}>
          <option value="">Pick A Shape</option>
          <option value="rect">Rectangal</option>
          <option value="circle">Circle</option>
        </select>
      </div>
      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));