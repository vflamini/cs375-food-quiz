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
    rest        : "",
    restaurants : [],
    options     : []
  };


  formatRestaurants = () => {
    let combined = "";
    for (const rest of this.state.restaurants){
      const data = JSON.stringify(rest)
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
      combined = combined.concat(formatted,"\n","\n")
      
    }
    var output = document.getElementById("output");
    if (!output.hasChildNodes()){
      var tag = document.createElement("p");
      var words = document.createTextNode("Here are the restaurants we think you'd like!");
      tag.appendChild(words);
      output.appendChild(tag);
      
    }
    document.getElementById("json").textContent = combined
    
    
  }

  doesTableExist(){
    return fetch(`http://localhost:3001/tableexists`).then(response => {
      return response.text()
    })
    .then(data => {
      return JSON.parse(data)[0].to_regclass
    })
  }

  getRestaurants(cuisine) {
    //let rests = []
    return fetch(`http://localhost:3001/?cuisine=${cuisine}`).then(response => {
      return response.text();
    })
    .then(data => {
      let rests = []
      let jsondata = JSON.parse(data)
      for (const d of jsondata){
        //this.state.restaurants.push(d);
        rests.push(d)
        //this.setState({rest : d})
        //this.setState({restaurants : this.state.restaurants.concat(this.state.rest)}, this.formatRestaurants());
      }
      //console.log(rests.slice())
      return rests
      //this.setState({restaurants : rests});
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

  dropTable = () => {
    fetch('http://localhost:3001/droptable', {
    })
  }

  createTable = () =>{
    fetch('http://localhost:3001/createtable', {
    })
  }

  buildDatabase = () => {
    this.createRestaurant('italian','La Fontana Della Citta','https://www.lafontanadellacitta.com/')
    this.createRestaurant('italian','Maggiano\'s Little Italy','https://www.maggianos.com/')
    this.createRestaurant('italian','Osteria','https://www.osteriaphilly.com/')
    this.createRestaurant('italian','Giorgio On Pine','http://www.giorgioonpine.com/')
    this.createRestaurant('italian','Pietro\'s Italian','https://pietrospizza.com/')
    this.createRestaurant('mexican','Distrito','https://www.distritophilly.com/')
    this.createRestaurant('mexican','Rosy\'s Taco Bar','https://rosystacobar.com/')
    this.createRestaurant('mexican','Mission Taqueria','https://www.missiontaqueria.com/')
    this.createRestaurant('mexican','El Vez','https://elvezrestaurant.com/')
    this.createRestaurant('mexican','El Ray','https://elreyrestaurant.com/')
    this.createRestaurant('chinese','Han Dynasty','https://handynasty.net/')
    this.createRestaurant('chinese','Sang Kee Noodle House','https://sangkeenoodlehouse.com/')
    this.createRestaurant('chinese','Dim Sum & Noodle','https://www.dimsumandnoodle.com/')
    this.createRestaurant('chinese','Mandarin Palace','https://www.phillymandarinpalace.com/')
    this.createRestaurant('chinese','Nom Wah ','https://nomwah.com/')
    this.createRestaurant('indian','Tiffin Indian Cuisine','https://order.tiffin.com/')
    this.createRestaurant('indian','Veda','https://vedaphilly.com/')
    this.createRestaurant('indian','Ekta Indian Cuisine','https://www.ektaindianrestaurant.com/')
    this.createRestaurant('indian','Ateethi','http://ateethirestaurantpa.com/')
    this.createRestaurant('indian','Thanal Indian Tavern','https://www.thanalphilly.com/')
    this.createRestaurant('american','New Deck Tavern','https://www.newdecktavern.com/')
    this.createRestaurant('american','White Dog Cafe','https://whitedog.com/location/')
    this.createRestaurant('american','Butcher Bar','http://www.butcherbarphilly.com/')
    this.createRestaurant('american','Yards Brewing Company','https://yardsbrewing.com/')
    this.createRestaurant('american','The Love.','https://theloverestaurant.com/')
    this.createRestaurant('healthy','The Quick Fixx','https://thequickfixx.com/')
    this.createRestaurant('healthy','P.S. & Co.','https://www.puresweets.com/')
    this.createRestaurant('healthy','Just Salad','https://www.justsalad.com/')
    this.createRestaurant('healthy','Freshii','https://www.freshii.com/ca/en-ca/home')
    this.createRestaurant('healthy','Crisp Kitchen','https://www.crispkitchen.com/')
    this.createRestaurant('sushi','Crazy Shushi','https://www.phillycrazysushi.com/')
    this.createRestaurant('sushi','Morimoto','https://morimotorestaurant.com/')
    this.createRestaurant('sushi','Pod','https://podrestaurant.com/')
    this.createRestaurant('sushi','Zama','http://www.zamaphilly.com/')
    this.createRestaurant('sushi','Double Knot','https://www.doubleknotphilly.com/')
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

  

  handleClick = async (e) => {
    e.preventDefault();
    let tableName = await this.doesTableExist();
    if (tableName !== "restaurants"){
      this.createTable()
      this.buildDatabase();
    }
    
    let rests = [];
    let rest;
    const opts = this.state.options
    this.setState({restaurants : []});
    for (const varName of opts){
      let cuisine = varName.substr(4,varName.length-1).toLowerCase()
      //console.log(this.getRestaurants(cuisine).slice())
      rest = await this.getRestaurants(cuisine);
      rests = rests.concat(rest)
      
    }
    this.setState({restaurants : rests},function (){
      this.formatRestaurants();
    });
    
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
          <div id="output">
          </div>
          <div id="jsondiv">
            <pre id="json"></pre>
          </div>
        </center>
      </form>
    )
  }
}
export default App;