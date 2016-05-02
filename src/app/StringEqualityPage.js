import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {calculateHash} from './algorithms';

const TOOHIGH = -2;
const TOOLOW = -1;

class StringEqualityPage extends Component{
  constructor(props){
    super(props);
    const defaultNumPrimes = 20;
    const defaultPrime = 31;
    this.state = {
      firstString: "",
      secondString: "",
      numPrimes: defaultNumPrimes,
      prime: defaultPrime
    }
  }

  onInputChange(key, value){
    this.setState(
      {
        [key]: value
      }
    );
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
    const {firstString, secondString, prime, numPrimes} = this.state;
    const inputStyle = {
      minWidth: '250px'
    }
    const hashValue1 = calculateHash(firstString, prime);
    const hashValue2 = calculateHash(secondString, prime); 
    const primeValidation = this.validateNumPrimes();
    let errorText = "";
    if (primeValidation === TOOHIGH){
      errorText = "Max limit: 10000";
    } else if (primeValidation === TOOLOW){
      errorText = "Must be 1 or greater";
    }
    return(
      <div className="page-container">
        <h1>Simple String Fingerprinting</h1>
        <p>
          We can probabilistically test for string equality by using a hash function. Here, we will use a simple hash function involving primes. It will generate a numerical representation of a string. If two hash codes are different, then we know for certain that they are different strings. If two strings have the same hash code, then there is a chance that they are not equivalent.
        </p>
          <TextField value={firstString} onChange={ event => this.onInputChange('firstString', event.target.value)} style={inputStyle} hintText="Input string 1 here" />
        <br/>
          <TextField value={secondString} onChange={ event => this.onInputChange('secondString', event.target.value)} hintText="Input string 2 here" />

          <p> Prime: {prime} </p>
          <p> Hash value of first string: {hashValue1} </p>
          <p> Hash value of second string: {hashValue2} </p>
        <p>
          Why is this useful? Rather than checking two files to see if every single one of their bits match, we can simply compare the result of the hash function. This is especially useful if the two sources we want to compare are extremely large. Realistically speaking, the hash function we use here would relatively frequently give too many false positives, such that it generally isn't used for this purpose. But the hash functions features are unique and useful for whole string matching. 
        </p>
      </div>
    );
  }
}

export default StringEqualityPage;
