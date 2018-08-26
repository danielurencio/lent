'use strict'

class App extends React.Component {
   render() {
     return (
	<div>
          <div id='header'>Lent</div>
	  <canvas/>
	</div>
     )
   }
}


let domContainer = document.querySelector('div#root');
ReactDOM.render(<App/>, domContainer);

