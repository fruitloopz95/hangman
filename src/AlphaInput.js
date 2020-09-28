import React from 'react';
import './hangman.css';

class AlphabetInput extends React.Component
{
	constructor(props)
	{
		super();
	}

	render()
	{
		//render the alphabet letters array received as props
		return(
			<div className = "alphaContainer"> 
				{this.props.alphabet.map(letter => 
		          (
		            	<button id = {letter} key={letter} onClick = {this.props.SelectedLetter} value = {letter} className = "alphaButton"> {letter}  </button>	
		          ))}
			</div>
		);
	}
}

export default AlphabetInput;