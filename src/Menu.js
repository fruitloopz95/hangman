import React from 'react';
import { Link ,Route , BrowserRouter } from 'react-router-dom';
import MainPage from './MainPage';
import './hangman.css';

class MainMenu extends React.Component
{
	constructor()
	{
		super();
	}

//render main menu button and title
	playButton()
	{
		return(
		<div className = "menuButtonDiv">
			<p className = "hangmanTitle">HANGMAN</p>
			<Link to= '/game' >	<button className = "playButtonMenu" >PLAY</button> </Link>	
		</div>);
		
	}


	render()
	{
		return(
//set routes for game pages
			<BrowserRouter> 
			    <div>
			    <switch>
			        <Route exact={true} path="/" component={this.playButton} />
			        <Route exact={true} path="/game" component={MainPage} />
			    </switch>
			    </div>
 		    </BrowserRouter>

		);
	}
}
 export default MainMenu;

