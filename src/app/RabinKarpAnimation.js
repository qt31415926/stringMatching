import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import LetterBlock from './LetterBlock';
import {calculateHash} from './algorithms';
import _ from 'lodash';

const SUCCESS_BG = '#00C853';
const DEFAULT_BG = '#673AB7';
const FP_BG = '#9E9D24';
const FAILED_BG = '#FF1744';
const SUCCESS = 'success';
const FAILED = 'failed';
const DEFAULT = 'default';
const FALSEPOSITIVE = 'falsepositive';
const alphabetSize = 66535;
const LETTER_SIZE = 28;


class RabinKarpAnimation extends Component{
  constructor(props){
    super(props);

    this.prepRabinKarp = _.debounce(this.prepRabinKarp, 1000);
    this.showMatches = _.debounce(this.showMatches, 1000);
    this.state = {
    }
  }

  prepRabinKarp(lettersArray){
    const {prime, text, pattern} = this.props;
    const pLength = pattern.length;
    const tLength = text.length;

    let pHash = 0;
    let windowHash = 0;
    let largestCoefficient = 1;

    for (let i = 0; i < pLength-1 ; i++){
      largestCoefficient = (largestCoefficient*alphabetSize)%prime;
    }

    for (let i = 0; i < pLength; i++){
      pHash = (alphabetSize*pHash + pattern.charCodeAt(i))%prime;
      windowHash = (alphabetSize*windowHash + text.charCodeAt(i))%prime;
    }

    for (let i = 0; i <= (tLength - pLength); i++){
      //console.log(pHash, windowHash);
      if (pHash === windowHash){
        if (pattern === text.substr(i, pLength)){
          //change lettersArray object value to a success
          lettersArray[i].result = SUCCESS;
        } else{
          //change lettersArray object value to a false positive
          lettersArray[i].result = FALSEPOSITIVE;
        }
      } else {
        //change lettersArray object value to failed;
        lettersArray[i].result = FAILED;
      }

      if (i < tLength - pLength){
        windowHash = (alphabetSize*(windowHash - text.charCodeAt(i)*largestCoefficient) + text.charCodeAt(i+pLength))%prime;
        if (windowHash < 0){
          windowHash = windowHash+prime;
        }
      }
    }
    return lettersArray;
  }

  showMatches(lettersArray){
    const {pattern, text} = this.props;
    let pLength = pattern.length;
    let tLength = text.length;
    for (let i = 0; i < (tLength-pLength+1); i++){
      if (lettersArray[i].result===SUCCESS){
        for (let j = 0; j < pLength; j++){
          lettersArray[j+i].bgColor = SUCCESS_BG;
        }
      }
    }
    return lettersArray;
  }

  render(){
    const {text, pattern, prime} = this.props;
    let lettersArray = [...text];
    lettersArray = lettersArray.map( (letter) => {
      return {
        letter: letter,
        txtColor: 'white',
        bgColor: DEFAULT_BG,
        result: DEFAULT,
      }
    });

    if (pattern.length !== 0 && text.length !== 0 && pattern.length <= text.length){
      lettersArray = this.showMatches(this.prepRabinKarp(lettersArray));
    } 

    //console.log(lettersArray);

    return(
      <div className="page-container">
        {lettersArray.map( (letter, id) => 
          <LetterBlock 
            letter={letter.letter} 
            key={id} 
            txtColor={letter.txtColor}
            bgColor={letter.bgColor}
            size={LETTER_SIZE} />
        )}
      </div>
    );

    //stepwise animation with hovering
  }
}

export default RabinKarpAnimation;
