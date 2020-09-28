import React from 'react';
import './hangman.css';
class TheWord extends React.Component
{
	constructor(props)
	{
		super();
	}

	render()
	{

		//render the game word array received as props
		return(
			<div className = "currentWord">
				{this.props.word.map(letter => 
          		(
		          	<div className = "hiddenWordBorder" >
		            	<button key={letter} value = {letter} className = {this.props.divClass}> {letter}  </button>	
		            </div>
		        ))}
			</div>
		);
	}
}

export default TheWord;

