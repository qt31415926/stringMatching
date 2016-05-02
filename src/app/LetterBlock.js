import React, {Component} from 'react';

class LetterBlock extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const {bgColor, txtColor, size, letter} = this.props;
    const font = "Courier New, Courier, monospace";

    return(
      <svg width={size} height={size}>
        <rect width={size} height={size} fill={bgColor}/>
        <text fontFamily={font} x={size*0.25} y={size*0.75} fill={txtColor} strokeWidth='2'  fontSize={size*.8}>
          {this.props.letter}
        </text>
      </svg>
    );
  }
}

export default LetterBlock;
