var load = document.querySelectorAll('.load');
var reload = document.querySelectorAll('.reload');
var loader = document.querySelector('.loader');
var container = document.querySelector('.container')
var reveal = document.querySelector('.reveal')
var centerAnchor = 'center center';
var intro = document.querySelector('.page')
var tlLoader = new TimelineMax({repeat: 2, onComplete: playIntro})
var introAnim = new TimelineMax()

tlLoader
	.set(loader, {autoAlpha: 1})
	.staggerFrom(load, .2, {
		autoAlpha: 0,
		y: -30,
		transformOrigin: centerAnchor,
		ease: Power3.easeOut
	}, .1)

	.staggerTo(load, .2, {
		y: 30,
		ease: Power3.easeIn,
		autoAlpha: 0
	}, .1)

function playIntro() {

	
	introAnim

		.set(intro, {
			autoAlpha: 1
		})

		.to(reveal, .2, {
			scaleY: '0%',
			ease: Power2.easeIn,
			transformOrigin: 'center bottom'
		
		})

		

		.from(intro, .5, {
			y: -50,
			autoAlpha: 0,
			ease: Back.easeOut
		})
};

reload.addEventListener("click", playIntro)