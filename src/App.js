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

  getRestaurants = (cuisine) => {
    fetch(`http://localhost:3001/?cuisine=${cuisine}`).then(response => {
      return response.text();
    })
    .then(data => {
      let jsondata = JSON.parse(data)
      for (const d of jsondata){
        this.state.restaurants.push(d);
      }
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
    const opts = this.state.options
    for (const varName of opts){
      let cuisine = varName.substr(4,varName.length-1).toLowerCase()
      this.getRestaurants(cuisine)
    }
    console.log(this.state.restaurants)
    const data = JSON.stringify(this.state.restaurants)
    let copy = data
    copy = copy.replaceAll("[","")
    copy = copy.replaceAll("]","")
    copy = copy.replaceAll("{","")
    copy = copy.replaceAll("}","")
    copy = copy.replaceAll("\"", "")
    let formatted = copy.split(",").join("\n")
    formatted = formatted.split("cuisine:").join("\n")
    formatted = formatted.split("name:").join("")
    formatted = formatted.split("website:").join("")
    document.getElementById("json").textContent = formatted
    this.state.restaurants = []
  }

  render(){
    const {wantItalian, wantMexican, wantChinese, wantIndian, wantAmerican, wantHealthy, wantSushi} = this.state;
    return (
      <form>
        <center>
          <h1>Feed the Munchies</h1>
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
          <div>
            <table>
              <thead>
                <tr>
                  <th>Cuisine</th>
                  <th>Name</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            <pre id="json"></pre>
          </div>
        </center>
      </form>
    )
  }
}
export default App;