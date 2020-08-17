import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import pictures from './pictures.json';

class QuoteGenerator extends Component {
  constructor() {
    super();
    this.state = { quote: '', options: [], value: '' };
  }

  componentDidMount() {
    this.renderOptions();
  }

  renderImage() {
    return this.state.quote ? (
      <img
        alt='Donald Trump Talking'
        src={
          pictures.talking[
            Math.floor(Math.random() * Math.floor(pictures.talking.length))
          ]
        }
        style={{ height: '100%' }}
      />
    ) : (
      <img
        alt='Donald Trump Resting'
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
    if (this.state.value === 'Random') {
      const quote = await axios.get('http://tronalddump.io/random/quote');
      this.setState({ quote: quote.data.value });
    }
  }

  async renderOptions() {
    const tags = await axios.get('http://tronalddump.io/tag');
    console.log(tags);
    this.setState({
      options: _.map(tags.data._embedded.tag, ({ value }) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        );
      }),
    });
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
              textAlign: 'center',
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
            <select
              className='u-full-width'
              id='topicTags'
              value={this.state.value}
            >
              <option value='Random'>Random</option>
              {this.state.options}
            </select>
          </div>
        </div>
      </>
    );
  }
}

export default QuoteGenerator;
