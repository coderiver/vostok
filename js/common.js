// Как только будет загружен API и готов DOM, выполняем инициализацию
ymaps.ready(init);

// Инициализация и уничтожение карты при нажатии на кнопку.
function init () {
    var btn = $('.map_filial .map__point'),
    	btn_back = $('.map__back'),
    	map_container = $('.map__real'),
    	map_bg = $('.map-bg');
    btn.on('click', function () {
    	// Получаем название города
        var map_city = $(this).attr('href');

        map_container.fadeIn();
        btn_back.fadeIn();
        map_bg.fadeOut();


        myMap = new ymaps.Map('map', {
          center: [55.753994, 37.622093],
          zoom: 9,
          behaviors: ['default', 'scrollZoom']
        });
        
        
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
        });
        return false;
    });
	btn_back.on('click', function(){
		myMap.destroy(); // Деструктор карты
		myMap = null;
		map_container.fadeOut();
		btn_back.fadeOut();
		map_bg.fadeIn();
		return false;
	});
}





$(document).ready(function() {

	//map 
	
	

	// Для уничтожения используется метод destroy.
	//myMap.destroy();

});