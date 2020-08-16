import React, { Component } from 'react';
import axios from 'axios';

import styles from './QuoteGenerator.module.css';
import { useState } from 'react';
import pictures from './pictures.json';

class QuoteGenerator extends Component {
  constructor() {
    super();
    this.state = { quote: '' };
  }

  renderImage() {
    return this.state.quote ? (
      <img
        src={
          pictures.talking[
            Math.floor(Math.random() * Math.floor(pictures.talking.length))
          ]
        }
        style={{ height: '100%' }}
      />
    ) : (
      <img
        src={
          pictures.resting[
            Math.floor(Math.random() * Math.floor(pictures.resting.length))
          ]
        }
        style={{ height: '100%' }}
      />
    );
  }

  async renderQuote() {
    const quote = await axios.get('http://tronalddump.io/random/quote');
    this.setState({ quote: quote.data.value });
  }

  render() {
    return (
      <>
        <div className='row'>
          <div
            className='one-half columns'
            style={{
              height: '50vh',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '30px',
              overflow: 'hidden',
            }}
          >
            {this.renderImage()}
          </div>
          <div
            className='one-half columns'
            style={{
              overflow: 'hidden',
            }}
          >
            {this.state.quote}
          </div>
        </div>
        <div className='row'>
          <div className='three columns'>
            <button
              onClick={async () => {
                this.renderQuote();
              }}
              className='button-primary u-full-width'
            >
              Generate!
            </button>
          </div>
          <div className='nine columns'>
            <input
              type='text'
              className='u-full-width'
              placeholder='Keywords'
            />
          </div>
        </div>
      </>
    );
  }
}

export default QuoteGenerator;
