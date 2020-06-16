import React, { Component } from 'react';
//import inventory, { categories } from './inventory';

import Button from './components/button';
import Item from './components/item';
import _ from 'lodash';
import './App.css';

//components
import SearchBox from './components/search-box/SearchBox';

class App extends Component {
  state = {
    currentCat: [],
    inventory:[],
    categories:[]
  };

  componentDidMount() {
    fetch('http://103.48.51.74:9002/api/product/boat')
    .then(res => res.json())
    .then((data) => {
      this.setState({ inventory: data });
      this.setState({ categories: _.uniq(data.map(item => item.category)) });
      console.log(this.state.categories);
    })
    .catch(console.log);
  }
   sortedInventory = _.sortBy(this.state.inventory, 'category');

  getCategories() {
    return this.state.categories.map(cat => (
      <span key={cat}>
        <Button
          value={cat}
          classes={this.buttonClasses(cat)}
          onClick={c => this.changeCategory(c)}
        />
      </span>
    ));
  }

  getInventory() {
    const { currentCat } = this.state;

    return this.state.inventory
      .filter((item) => {
        let selected = false;
        if (currentCat.length === 0) {
          selected = true;
        } else {
          currentCat.forEach((cat) => {
            if (cat === item.category) {
              selected = true;
            }
          });
        }
        return selected;
      })
      .map(({
        id, name, price, description,
      }) => (
        <Item key={id} name={name} price={price} desc={description} />
      ));
  }

  buttonClasses(cat) {
    let active = false;
    const { currentCat } = this.state;

    currentCat.forEach((c) => {
      if (c === cat) {
        active = true;
      }
    });

    return active ? 'button active' : 'button';
  }

  allButtonClasses() {
    const { currentCat } = this.state;
    return currentCat.length === 0 ? 'button active' : 'button';
  }

  changeCategory(cat) {
    let { currentCat } = this.state;
    let found = false;

    if (cat !== 'All') {
      for (let i = 0; i < currentCat.length; i += 1) {
        if (currentCat[i] === cat) {
          found = true;
          currentCat.splice(i, 1);
        }
      }

      if (!found) {
        currentCat.push(cat);
      }
    } else {
      currentCat = [];
    }

    this.setState({
      currentCat,
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBox/>
        <h1>Select Categories</h1>

        <div>
          <span key="All">
            <Button
              value="All"
              classes={this.allButtonClasses()}
              onClick={c => this.changeCategory(c)}
            />
          </span>
          {this.getCategories()}
        </div>

        <div>{this.getInventory()}</div>
      </div>
    );
  }
}

export default App;
