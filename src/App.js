import React, {Component, useState, useEffect} from 'react';

class App extends Component{
  state = {
    wantItalian : false,
    wantMexican : false,
    wantChinese : false,
    wantIndian  : false,
    wantAmerican: false,
    wantHealthy : false,
    wantSushi   : false,
    restaurants : [],
    options : []
  };

  getRestaurants = () => {
    let cuisine = 'italian'
    fetch('http://localhost:3001/?cuisine=italian').then(response => {
      console.log("response:")
      console.log(response.text())
      return response;
    })
    .then(data => {
    })
  }

  createRestaurant = (cuisine,name,website) => {
    fetch('http://localhost:3001/restaurants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cuisine, name, website}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        //alert(data);
        //this.getRestaurants();
      });
  }

  onChange = e => {
    const options = this.state.options
    let i
    if(e.target.type === "checkbox"){
      this.setState({[e.target.name] : e.target.checked});
    }else{
      this.setState({[e.target.name] : e.target.value})
    }
    if (e.target.checked){
      options.push(e.target.name)
    }else{
      i = options.indexOf(e.target.name)
      options.splice(i,1)
    }
    this.setState({options: options})
  }

  handleClick = (e) => {
    e.preventDefault();
    this.getRestaurants();
    this.createRestaurant('mexican','Distrito','https://www.distritophilly.com/')
    const opts = this.state.options
    let restaurantData = []
    for (const varName of opts){
      let cuisine = varName.substr(4,varName.length-1)
    }
  }
  
  render(){
    const {wantItalian, wantMexican, wantChinese, wantIndian, wantAmerican, wantHealthy, wantSushi} = this.state;
    return (
      <form>
        <center>
          <div id="header" style={{backgroundImage: 'url("table2.png")', backgroundRepeat: "no-repeat", backgroundPosition: "bottom"}}>
          <h3>What are you in the mood for?</h3>
          <h4>Select all that apply.</h4>
          <label>
            Italian
            <input type="checkbox"
              checked={wantItalian}
              name="wantItalian"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Mexican
            <input type="checkbox"
              checked={wantMexican}
              name="wantMexican"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Chinese
            <input type="checkbox"
              checked={wantChinese}
              name="wantChinese"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Indian
            <input type="checkbox"
              checked={wantIndian}
              name="wantIndian"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            American
            <input type="checkbox"
              checked={wantAmerican}
              name="wantAmerican"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Healthy
            <input type="checkbox"
              checked={wantHealthy}
              name="wantHealthy"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Sushi
            <input type="checkbox"
              checked={wantSushi}
              name="wantSushi"
              onChange={this.onChange}/>
          </label>
          <br/>
          <button id="button" variant="success" onClick={(e) => {this.handleClick(e)}}>Generate Locations</button> {' '}
          </div>
        </center>
      </form>
    )
  }
}
export default App;