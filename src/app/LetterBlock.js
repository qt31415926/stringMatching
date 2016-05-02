import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/internal/Tooltip';

class LetterBlock extends Component{
  constructor(props){
    super(props);
    this.onEnterHandler = this.onEnterHandler.bind(this);
    this.onLeaveHandler = this.onLeaveHandler.bind(this);
  }


  shouldComponentUpdate(nextProps, nextState){
    return (nextProps.bgColor !== this.props.bgColor || nextProps.hashValue !== this.props.hashValue);
  }

  onEnterHandler(event){
    const {onHover, id} = this.props;
    onHover(id);
  }

  onLeaveHandler(event){
    this.props.leaveHover();
  }

  render(){
    const {bgColor, txtColor, hashValue, size, letter} = this.props;
    const font = "Courier New, Courier, monospace";


    return(
      <div onMouseEnter={this.onEnterHandler} onMouseLeave={this.onLeaveHandler} className="letterBlock">
        <svg width={size} height={size}>
          <rect width={size} height={size} fill={bgColor}/>
          <text fontFamily={font} x={size*0.25} y={size*0.75} fill={txtColor} strokeWidth='2'  fontSize={size*.8}>
            {this.props.letter}
          </text>
        </svg>
      </div>
    );
  }
}

export default LetterBlock;
