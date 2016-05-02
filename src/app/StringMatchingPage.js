import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import RabinKarpAnimation from './RabinKarpAnimation';
import {calculateHash, primes} from './algorithms';
import _ from 'lodash';

const TOOHIGH = -2;
const TOOLOW = -1;

class StringMatchingPage extends Component{
  constructor(props){
    super(props);
    const defaultNumPrimes = 20;
    const defaultPrime = 31;
    this.state = {
      pattern: "",
      text: "",
      numPrimes: defaultNumPrimes,
      prime: defaultPrime
    }
    this.samplePrime = this.samplePrime.bind(this);
  }

  onInputChange(key, value){
    this.setState({
      [key]: value
    });
  }

  samplePrime(){
    const {numPrimes} = this.state
    let prime = _.sample(primes.slice(0, numPrimes));
    if (numPrimes > 10000 || numPrimes <= 0){
      return;
    }
    this.setState({
      prime: prime
    })
  }

  validateNumPrimes(){
    const {numPrimes} = this.state;
    if (numPrimes > 10000){
      return TOOHIGH;
    } else if (numPrimes <= 0){
      return TOOLOW;
    }
    return true;
  }

  render(){
    const {pattern, text, prime, numPrimes} = this.state;
    const hashValue2 = calculateHash(text, prime); 

    const primeValidation = this.validateNumPrimes();
    let errorText = "";
    if (primeValidation === TOOHIGH){
      errorText = "Max limit: 10000";
    } else if (primeValidation === TOOLOW){
      errorText = "Must be 1 or greater";
    }
    return(
      <div className="page-container">
        <h1>String Matching</h1>
          <TextField 
            value={pattern} 
            onChange={ event => this.onInputChange('pattern', event.target.value)} 
            hintText="Input pattern string here" 
            fullWidth={true}
            />
          <br/>
          <TextField 
            value={text} 
            onChange={ event => this.onInputChange('text', event.target.value)} 
            hintText="Input text to search here" multiLine={true} 
            fullWidth={true}
            />
          <RaisedButton className="primeButton" onMouseDown={this.samplePrime} label="Sample a prime out of the first" /> 
          <TextField 
            value={numPrimes} 
            className="primeInput"
            onChange={ event => this.onInputChange('numPrimes', event.target.value)} 
            type="number" 
            hintText="e.g. 277" 
            errorText={errorText}
            /> primes
          <RabinKarpAnimation prime={prime} text={text} pattern={pattern}/> 
      </div>
    );
  }
}

export default StringMatchingPage;
