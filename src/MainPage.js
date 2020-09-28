import React from 'react';
import { Link ,Route , BrowserRouter } from 'react-router-dom';
import { CSSTransition , TransitionGroup } from 'react-transition-group';
import TheWord from './TheWord';
import AlphabetInput from './AlphaInput';
import './hangman.css';


import stand from './Images/stand.png';
import hang1 from './Images/1.jpg';
import hang2 from './Images/2.jpg';
import hang3 from './Images/3.jpg';
import hang4 from './Images/4.jpg';
import hang5 from './Images/5.jpg';
import hang6 from './Images/6.jpg';
import win from './Images/smiley.jpg';
import lose from './Images/troll.jpg';

const hangmanImgs = [stand , hang1 , hang2 , hang3 , hang4 , hang5 , hang6 ] ;

class MainPage extends React.Component
{
	//init state with values
	constructor(props)
	{
		super();
		
		this.state = {hangManImg : hangmanImgs[0] , 
					  incorrectCounter : 1 ,
					  alphabet : ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v", "w" , "x","y","z"] , 
					  words : ["cilanto" , "orchestrate" , "phialides" , "magnanimous" , "anachronistic" , "camaraderie" , "circumlocution" ,
					            "cognizant" , "demagogue" , "egregious" , "equanimity" , "idiosyncratic" , "incumbent" , "licentious" , 
					            "pejorative" , "pertinacious" , "phlegmatic" , "sanctimonious" , "vicissitude" , "carouse" , "desideratum" , 
					            "deleterious" , "excogitate" , "gasconading" , "grandiloquent" , "parsimonious" , "perspicacious" , 
					            "querulous" , "saxicolous" , "sesquipedalian" , "unparagoned" , "brobdingnagian"] , 
					  currentWord : "" , 
					  currentWordArray : [] , 
					  divClass : "hiddenLetters" , 
					  gameStatus : "Start"
					 } ;
	}

	reset()
	{
		//get all elements where className is wrongletter then update them back to initial class
		let resetButtons = document.getElementsByClassName("wrongLetter");
		console.log(resetButtons);
		if(resetButtons.length > 0)
		{
			for(let i = 0 ; i < resetButtons.length ; i++)
			{
				resetButtons[i].className = "alphaButton";
			}
		}

		//get new word for game . get total number of words then generate a random number to use as an index for the new word
		const allWords = this.state.words;
		const randomWordIndex = Math.floor(Math.random() * allWords.length) ;
		const SelectedWord = allWords[randomWordIndex];
		//get length of word then create a "hidden" string to display on screen and update state
		const SelectedWordtoArray = [] ;
		for(let i = 0 ; i < SelectedWord.length ; i ++)
		{
			SelectedWordtoArray.push(" _ ");
		}
		this.setState({currentWordArray : SelectedWordtoArray , currentWord : SelectedWord , incorrectCounter : 1 , hangManImg : hangmanImgs[0] , gameStatus : "Restart"  });	
	}

	SelectedLetter(event)
	{
		const inputLetter = event.target.value;
		const currWord = this.state.currentWord;
		const arrayWord = this.state.currentWordArray;
		let newCurrWordArray = [];
		let rightwrongindicator = 0;

		// get input letter , loop through the current game word ,if input matches then update the hidden string displayed on screen

		for(let i = 0 ; i < currWord.length ; i ++)
		{
			if(inputLetter == currWord.charAt(i))
			{
				newCurrWordArray.push(currWord.charAt(i));
				rightwrongindicator = rightwrongindicator+1;
			}
			else
			{
				newCurrWordArray.push(arrayWord[i]);
			}		
		}
		if(rightwrongindicator > 0)
		{
			this.setState({currentWordArray : newCurrWordArray  });
		}
		else
		{
			this.setState({currentWordArray : newCurrWordArray , hangManImg : hangmanImgs[this.state.incorrectCounter] , incorrectCounter : this.state.incorrectCounter+1  });
			document.getElementById(event.target.value).className = "wrongLetter";
		}		
	}


	render()
	{

		//render component based on game status - either start of game, during game , game won and game lost
		if(this.state.gameStatus == "Start")
		{
			return(
				<div className = "container">
				<div className = "MainHangmanContainer">
					<Link to= '/' className = "menuTopLeft">	<button className = "MenuButton">menu </button> </Link>
					<img src = {this.state.hangManImg}  alt="Logo" className = "hangImage"/>
				</div>
				<div className = "MainCurrentWordContainer">
					<div>
						<TheWord word = {this.state.currentWordArray} divClass = {this.state.divClass} />
					</div>
					<div className = "tryAgainButton">
						<button className = "startButton" onClick = {this.reset.bind(this)} > {this.state.gameStatus}  </button>
					</div>
				</div>
				<div className = "mainAlphabetContainer">
					<AlphabetInput alphabet = {this.state.alphabet} SelectedLetter = {this.SelectedLetter.bind(this)}  />
				</div>
			</div>
				);
		}
		// if lose
		else if(this.state.incorrectCounter > 6)
		{
			return(
				<div className = "container">
					<div className = "MainHangmanContainer">
							<Link to= '/' className = "menuTopLeft">	<button className = "MenuButton"> menu </button> </Link>
							<img src = {this.state.hangManImg}  alt="Logo" className = "hangImage"/>
					</div>
					<div className = "MainCurrentWordContainer">
						<div>
						<p className = "wrongResult">
							the word is <strong>{this.state.currentWord}</strong>
						</p>
						<img src = {lose}  alt="Logo" className = "loseFace"/>
						</div>
						<div className = "tryAgainButton">
							<button className = "startButton" onClick = {this.reset.bind(this)} > Try again  </button>
						</div>
					</div>
				</div>
			);
		}
		//in game
		else if( this.state.currentWordArray.includes(" _ ") ) // this.state.currentWordArray.includes(" _ ") &&
		{
			return(
				<div className = "container">
				{this.state.currentWord}
				<div className = "MainHangmanContainer">
					<Link to= '/' className = "menuTopLeft">	<button className = "MenuButton">menu </button> </Link>
					<img src = {this.state.hangManImg}  alt="Logo" className = "hangImage"/>
				</div>
				<div className = "MainCurrentWordContainer">
					<div className = "currentWord">
						<TheWord word = {this.state.currentWordArray} divClass = {this.state.divClass} />
					</div>
					<div className = "tryAgainButton">
						<button className = "startButton" onClick = {this.reset.bind(this)} > {this.state.gameStatus}  </button>
					</div>
				</div>
				<div className = "mainAlphabetContainer">
					<AlphabetInput alphabet = {this.state.alphabet} SelectedLetter = {this.SelectedLetter.bind(this)}  />
				</div>
			</div>
			);	
		}
		
	    //if win
		else
		{
			return(
				<div className = "CorrectContainer">
					<div className = "MainHangmanContainer">
						<Link to= '/' className = "menuTopLeft">	<button className = "MenuButton">menu </button> </Link>
						<img src = {win}  alt="Logo" className = "smiley"/>
					</div>

					<div className = "displayCorrectResult">
						<p className = "rightResult">{this.state.currentWord}</p>
						<p className = "rightResult">Correct !!!</p>
					</div>

					<div className = "tryAgainButton">
						<button className = "startButton" onClick = {this.reset.bind(this)} > Play again </button>
					</div>
				</div>

				);
		}
		
	}
}

export default MainPage;

