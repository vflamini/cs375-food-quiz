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
          <h1>Feed the Munchies</h1>
          <h5>Please Select Anything that Interests You!</h5>
          <label>
            Do you want to eat Italian?
            <input type="checkbox"
              checked={wantItalian}
              name="wantItalian"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Do you want to eat Mexican?
            <input type="checkbox"
              checked={wantMexican}
              name="wantMexican"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Do you want to eat Chinese?
            <input type="checkbox"
              checked={wantChinese}
              name="wantChinese"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Do you want to eat Indian?
            <input type="checkbox"
              checked={wantIndian}
              name="wantIndian"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Do you want to eat American?
            <input type="checkbox"
              checked={wantAmerican}
              name="wantAmerican"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Do you want to eat Healthy?
            <input type="checkbox"
              checked={wantHealthy}
              name="wantHealthy"
              onChange={this.onChange}/>
          </label>
          <br/>
          <label>
            Do you want to eat Sushi?
            <input type="checkbox"
              checked={wantSushi}
              name="wantSushi"
              onChange={this.onChange}/>
          </label>
          <br/>
          <button variant="success">Generate Locations</button> {' '}
        </center>
      </form>
    )
  }
}
export default App;