function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomDeg() {
    return Math.floor(Math.random() * 360) + 'deg';
}

var BgGenerator = React.createClass({

	getInitialState: function(){
		return {deg: getRandomDeg(), colorBg1: getRandomColor(), colorBg2: getRandomColor()}
	},
	chandeColor:function(){
		this.setState({deg: getRandomDeg(), colorBg1: getRandomColor(), colorBg2: getRandomColor()});
	},

	copyCss:function(e){
		e.preventDefault();
		var msg = $('.footer__msg');
		$('.header__text').select();

		try{
			var successful = document.execCommand('copy');
			var info = successful ? 'successful' : 'unsuccessful';
			console.log('Copy ' + info);
		}catch(err){
			console.log('Oops, unable to copy');
		};
		msg.fadeIn('100').animate({top: '-55px'});

		setTimeout(function(){
			msg.fadeOut('fast').animate({top: '-40px'});
		}, 1000);
	},

	render: function(){
		return(
			<div className='body-cont' style={{background: 'linear-gradient(' + this.state.deg + ', ' + this.state.colorBg1 + ', ' + this.state.colorBg2 + ')'}}>
				<div className='header'>
					<h3 className='header__text-h1'>Generate gradient by clicking</h3>
					<button className='header__btn' onClick={this.chandeColor}>
						<span>Generate</span>
					</button>
					<textarea style={{visability: 'hidden'}} className='header__text' readOnly value={'background: linear-gradient(' + this.state.deg + ', ' + this.state.colorBg1 + ', ' + this.state.colorBg2 + ');'}></textarea>
				</div>
				<div className='footer'>
					<div className='footer__msg'>
						<div className='footer__msg_copy'>Copied</div>
					</div>
					<button title='Click to copy CSS' name='Copy CSS' onClick={this.copyCss} className='footer__button-icon'><i className="fa fa-clipboard fa-3x" aria-hidden="true"></i></button>
					<div className='color-block'>
						<div className='color-block__color-round' style={{background: this.state.colorBg1, marginBottom: '5px'}}></div>
						<span className='color-block__color-text'style={{marginBottom: '5px'}}> {this.state.colorBg1}</span><br/>
						<div className='color-block__color-round' style={{background: this.state.colorBg2}}></div>
						<span className='color-block__color-text'>{this.state.colorBg2}</span>
					</div>
					<div className='links'>
						<hr />
						<span className='links__block'>
							Made by <a href="https://github.com/smyzin" target="_blank" title="GitHub | @smyzin" className="links__a"><i aria-hidden="true" className="fa fa-github-alt fa-lg bottom__icon"></i> smyzin.</a>
							 <a href="https://smyzin.github.io/" target="_blank" title="Portfolio" className="links__a"><i aria-hidden="true" className="fa fa-rocket fa-lg"></i> Portfolio</a> page.
						</span>
						<span className='links__block'>
							Other works on <a href="" target="_blank" title="CodePen | @therealnorman" className="links__a"><i aria-hidden="true" className="fa fa-codepen fa-lg"></i> CodePen</a>
						</span>
					</div>
				</div>
			</div>
		);
	}
});

ReactDOM.render(<BgGenerator/>, document.getElementById('app'));
