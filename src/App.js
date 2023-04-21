import logo from './logo.svg';
import './App.css';
import {Component} from 'react';

class App extends Component{
  constructor() {
    super();

    this.state = {
          monsters: [],
          searchField: '',

    };

  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(()=>{
          return {monsters: users}
    }),
    () => {console.log(this.state)}
    );
  }

  onSearchChange= (event)=> {
    const searchField = event.target.value.toLowerCase();
    this.setState(()=> {
      return {searchField: searchField};
    });
  }
  render() {

    const { monsters, searchField} = this.state;
    const {onSearchChange} = this.onSearchChange;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });


    return (
      <div className="App">
      <input className='search-bar' type='search' placeholder='search monsters' onChange={onSearchChange}/>

      {
          filteredMonsters.map((filteredMonster)=>{
              return <div key={filteredMonster.id}><h1>{filteredMonster.name}</h1></div>
          })
      }
      </div>
    );

  }


}

export default App;
