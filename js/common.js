// Как только будет загружен API и готов DOM, выполняем инициализацию
ymaps.ready(init);

// Инициализация и уничтожение карты при нажатии на кнопку.
function init () {
    var btn = $('.map_filial .map__point'),
    	btn_back = $('.map__back'),
    	map_container = $('.map__real'),
    	map_bg = $('.map-bg');
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 9,
      behaviors: ['default', 'scrollZoom']
    });

    btn.on('click', function () {
    	// Получаем название города
        var map_city = $(this).attr('href');

        map_container.fadeIn();
        btn_back.fadeIn();
        map_bg.fadeOut();

        // Поиск координат
        ymaps.geocode(map_city, {
        	results: 1 // Если нужен только один результат, экономим трафик пользователей
        }).then(function (res) {
        	// Выбираем первый результат геокодирования.
        	var firstGeoObject = res.geoObjects.get(0),
            	// Координаты геообъекта.
            	coords = firstGeoObject.geometry.getCoordinates(),
            	// Область видимости геообъекта.
            	bounds = firstGeoObject.properties.get('boundedBy');
        	// Добавляем первый найденный геообъект на карту.
        	//myMap.geoObjects.add(firstGeoObject);
        	// Масштабируем карту на область видимости геообъекта.
        	myMap.setBounds(bounds, {
        		checkZoomRange: true // проверяем наличие тайлов на данном масштабе.
        	});
        	var myPlacemark = new ymaps.Placemark(coords, {
        		iconContent: ''
        	}, {
        		// Опции.
        		// Своё изображение иконки метки.
        		iconImageHref: 'img/map-marker.png',
        		// Размеры метки.
        		iconImageSize: [30, 36],
        		// Смещение левого верхнего угла иконки относительно
        		// её "ножки" (точки привязки).
        		iconImageOffset: [-15, -32]
        	});
        	myMap.geoObjects.add(myPlacemark);
        }, function (success) {
            // Если геокодирование не удалось, сообщаем об ошибке.
            alert('sdfa');
        });

        return false;
    });
	btn_back.on('click', function(){
		//myMap.destroy(); // Деструктор карты
		//myMap = null;
		map_container.fadeOut();
		btn_back.fadeOut();
		map_bg.fadeIn();
		return false;
	});
}

$(document).ready(function() {

	// select
    var select = $('.js-select');
    select.find('select').on('change', function() {
        var optionSelected = $("option:selected", this),
            valueSelected = this.value;
        $(this).parent().find('.select__head span').html(valueSelected);
    });

    // question
    var question = $('.js-question'),
        question_sm = $('.js-question-sm');
    question.find('.question__link a').on('click', function(){
        var text1 = 'Ответ',
            text2 = 'Скрыть ответ';
        $(this).parent().prev().slideToggle();
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).html(text1);
        }
        else{
            $(this).addClass('is-active');
            $(this).html(text2);
        }
        return false;
    });
    question_sm.find('.question__sm-text').on('click', function(){
        $(this).toggleClass('is-active');
        $(this).next().slideToggle();
    });

    // info accordeon
    var accos = $('.js-info-accos');
    accos.find('.info__accos-title').on('click', function(){
        $(this).toggleClass('is-active');
        $(this).next().slideToggle();
    });

    // popup
    var popup = $('.js-popup'),
        popup_close = $('.popup__close, .popup__bg');
    popup.on('click', function(){
        var el = $(this).data('popup');
        $('.'+el).fadeIn();
        return false;
    });
    popup_close.on('click', function(){
        $(this).parents('.popup').fadeOut();
    });

    // fancybox
    var fancybox_el = $('.js-fancybox');
    if (fancybox_el.length) {
        fancybox_el.fancybox({
            maxWidth: 840,
            padding: [60, 60, 20, 60],
            helpers: {
                title: {
                    type: 'inside',
                    locked: false
                }
            }
        });
    };

    // city
    var city = $('.js-city');
    city.find('.city__head i').on('click', function(){
        $(this).parent().parent().toggleClass('is-active');
        $(this).parent().next().toggle();
    });

});