import React, {Component} from 'react';

class App extends Component{
  state = {
    wantItalian : false,
    wantMexican : false,
    wantChinese : false,
    wantIndian  : false,
    wantAmerican: false,
    wantHealthy : false,
    wantSushi   : false
  };

  onChange = e => {
    if(e.target.type === "checkbox")
      this.setState({[e.target.name] : e.target.checked});
    else
      this.setState({[e.target.name] : e.target.value})
  }

  render(){
    const {wantItalian, wantMexican, wantChinese, wantIndian, wantAmerican, wantHealthy, wantSushi} = this.state;
    return (
      <form>
        <center>
          <div id="header" style={{backgroundImage: 'url("back.png")', backgroundRepeat: "no-repeat", backgroundPosition: "bottom"}}>
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
          <button id="button" variant="success">Generate Locations</button> {' '}
          </div>
        </center>
      </form>
    )
  }
}
export default App;