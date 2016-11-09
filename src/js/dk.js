var getRandomNumberBetween = function (from, to) {
	return Math.floor(Math.random() * to) + from 
}

var dk = window.dk = {}

dk.showhide = function (el) {
	if ($(el).hasClass('hide')) $(el).removeClass('hide')
	else $(el).addClass('hide')
}

dk.initIntroPieces = function () {

	var n = 0
	var even = true

	$('.intro-piece').each(function(){
		console.log('intropiece')
		$(this).css('top', n * 280 + 20 +'px')

		if(!even) {
			if($(this).hasClass('intro-piece-text')) $(this).css('right',  getRandomNumberBetween(5, 20) + '%')
			else $(this).css('right', getRandomNumberBetween(5, 20) + '%')
		} else {
			if($(this).hasClass('intro-piece-text')) $(this).css('left', getRandomNumberBetween(5, 20) + '%')
			else $(this).css('left', getRandomNumberBetween(5, 20) + '%')
		}

		if(even) {
			even = false
		} else {
			even = true
			n++
		}
	})

}

dk.switchIntroPieces = function (layer) {

	if(layer == 'video') {
		$('.intro-background').css('z-index', 2)
		$('.intro-piece-text').css('z-index', 1)
		$('.intro-piece-video').css('z-index', 100)
	}

	if(layer == 'text') {
		$('.intro-background').css('z-index', 2)
		$('.intro-piece-video').css('z-index', 1)
		$('.intro-piece-text').css('z-index', 100)
	}

	if(layer == 'home') {
		$('.intro-piece-text').css('z-index', 1)
		$('.intro-piece-video').css('z-index', 1)
		$('.intro-background').css('z-index', 100)
	}

}
