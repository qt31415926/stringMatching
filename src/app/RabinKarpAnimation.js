import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import LetterBlock from './LetterBlock';
import {calculateHash} from './algorithms';
import _ from 'lodash';

const SUCCESS_BG = '#00C853';
const DEFAULT_BG = '#673AB7';
const FP_BG = '#9E9D24';
const MISS_BG = '#FF1744';
const SUCCESS = 'Success';
const MISS = 'Miss';
const DEFAULT = 'Unchanged';
const FALSEPOSITIVE = 'False Positive';
const results = {
  'Success': SUCCESS_BG,
  'Unchanged': DEFAULT_BG,
  'False Positive': FP_BG,
  'Miss': MISS_BG
}
const alphabetSize = 66536;
const LETTER_SIZE = 28;


class RabinKarpAnimation extends Component{
  constructor(props){
    super(props);

    this.state = {
      lettersArray: [],
      status: null,
      index: null,
      hashValue: null,
    }
    this.collisions = 0;
    
    this.revealHovered = this.revealHovered.bind(this);
    this.revealPrev = this.revealPrev.bind(this);
  }

  componentWillReceiveProps(nextProps){
    const {pattern, text, prime} = nextProps;
    let lettersArray = [...text];
    lettersArray = lettersArray.map( (letter) => {
      return {
        letter: letter,
        txtColor: 'white',
        bgColor: DEFAULT_BG,
        result: DEFAULT,
        hashValue: 0,
      }
    });
    if (pattern.length !== 0 && text.length !== 0 && pattern.length <= text.length){
      lettersArray = this.prepRabinKarp(lettersArray, pattern, text, prime);
      lettersArray = this.reveal(lettersArray, pattern, text, prime, SUCCESS);
    }
    this.setState({
      lettersArray: lettersArray,
      originalArray: lettersArray,
    })
  }

  prepRabinKarp(lettersArray, pattern, text, prime){
    const pLength = pattern.length;
    const tLength = text.length;

    let pHash = 0;
    let windowHash = 0;
    let largestCoefficient = 1;
    let totalCollisions = 0;

    for (let i = 0; i < pLength-1 ; i++){
      largestCoefficient = (largestCoefficient*alphabetSize)%prime;
    }

    for (let i = 0; i < pLength; i++){
      pHash = (alphabetSize*pHash + pattern.charCodeAt(i))%prime;
      windowHash = (alphabetSize*windowHash + text.charCodeAt(i))%prime;
    }


    for (let i = 0; i <= (tLength - pLength); i++){
      //console.log(pHash, windowHash);
      lettersArray[i].hashValue = windowHash;
      if (pHash === windowHash){
        if (pattern === text.substr(i, pLength)){
          //change lettersArray object value to a success
          lettersArray[i].result = SUCCESS;
        } else{
          //change lettersArray object value to a false positive
          lettersArray[i].result = FALSEPOSITIVE;
          totalCollisions++;
        }
      } else {
        //change lettersArray object value to MISS;
        lettersArray[i].result = MISS;
      }

      if (i < tLength - pLength){
        windowHash = (alphabetSize*(windowHash - text.charCodeAt(i)*largestCoefficient) + text.charCodeAt(i+pLength))%prime;
        if (windowHash < 0){
          windowHash = windowHash+prime;
        }
      }
    }
    this.collisions = totalCollisions;
    return lettersArray;
  }

  reveal(lettersArray, pattern, text, prime, type){
    let newArray = JSON.parse(JSON.stringify(lettersArray));
    let pLength = pattern.length;
    let tLength = text.length;
    for (let i = 0; i <= (tLength-pLength); i++){
      if (newArray[i].result===type){
        for (let j = 0; j < pLength; j++){
          newArray[j+i].bgColor = results[type];
        }
      }
    }
    return newArray;
  }

  revealHovered(index){
    const {pattern, text} = this.props;
    let newArray = JSON.parse(JSON.stringify(this.state.lettersArray));
    let pLength = pattern.length;
    let tLength = text.length;
    let type = newArray[index].result;
    for (let j = 0; j < pLength; j++){
      if (j+index < tLength) newArray[j+index].bgColor = results[type];
    }
    this.setState({
      lettersArray: newArray,
      status: newArray[index].result,
      index: index,
      hashValue: newArray[index].hashValue,
    })
  }

  revealPrev(){
    this.setState({
      lettersArray: this.state.originalArray,
      status: null,
      index: null,
      hashValue: null,
    })
  }

  render(){
    const {text, pattern, prime} = this.props;
    let {status, index, hashValue} = this.state;
    status = status === null ? "N/A" : status;
    index = index === null ? "N/A" : index;
    hashValue = hashValue === null ? "N/A" : hashValue;
    const hashValue1 = calculateHash(pattern, prime);

    return(
      <div>
        <div className="column-container">
          <div className="left"> 
          Total amount of false positives: {this.collisions}
          <p> Prime used to hash: {prime} </p>
            <p> Hash value of pattern: {hashValue1} </p>

          </div>
          <div className="right"> 
          <p>Current position: {index}</p>
          <p>Current hash value: {hashValue}</p>
          Current status: {status}</div>
        </div>
        <div className="lettersZone">
        {this.state.lettersArray.map( (letter, id) => 
          <LetterBlock 
            letter={letter.letter} 
            key={id} 
            id={id}
            onHover={this.revealHovered}
            hashValue={letter.hashValue}
            leaveHover={this.revealPrev}
            txtColor={letter.txtColor}
            bgColor={letter.bgColor}
            size={LETTER_SIZE} />
        )}
        </div>
      </div>
    );

    //stepwise animation with hovering
  }
}

export default RabinKarpAnimation;
