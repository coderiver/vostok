// Как только будет загружен API и готов DOM, выполняем инициализацию
ymaps.ready(init);

// Инициализация и уничтожение карты при нажатии на кнопку.
function init () {
    var map_el = $('.map_filial');
    if (map_el.length) {
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
            }, function (err) {
                // Если геокодирование не удалось, сообщаем об ошибке.
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
    };
}

$(document).ready(function() {

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
        popup_close = $('.popup__close, .popup__bg'),
        popup_biography = $('.js-popup-biography');
    popup.on('click', function(){
        var el = $(this).data('popup');
        $('.'+el).fadeIn();
        return false;
    });
    popup_biography.on('click', function(){
        var el = $(this).attr('href');
        $('#'+el).fadeIn();
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

    // top
    var el_top = $('.js-top'),
        city = el_top.find('.city');
    city.find('.city__head i').on('click', function(){
        $(this).parents('.city').find('.city__in').toggleClass('is-active');
        $(this).parents('.city').find('.city__list').toggle();
    });
    el_top.find('.top__close').on('click', function(){
        $(this).parents('.top').slideUp();
    });
    el_top.find('.city__ask-yes').on('click', function(){
        $(this).parents('.top').slideUp();
    });
    el_top.find('.city__ask-no').on('click', function(){
        $(this).parents('.city').find('.city__in').toggleClass('is-active');
        $(this).parents('.city').find('.city__list').toggle();
    });

    // question
    var review = $('.js-review');
    review.find('.review__more a').on('click', function(){
        var text1 = 'Подробнее',
            text2 = 'Скрыть подробнее';
        $(this).parent().prev().toggleClass();
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

    // menu
    var menu = $('.js-menu');
    menu.find('li > span').on('click', function(){
        $(this).parent().toggleClass('is-active');
        $(this).next().slideToggle();
    });

    //select
    function select() {
        var el = $('.js-select');
            el_date = $('.js-select-date');
        el.find('.select__head').bind('click', function(){      
            if ($(this).parent().hasClass('is-open')) {
                $(this).parent().removeClass('is-open');
                $(this).next().hide();
            }
            else {
                el.removeClass('is-open');
                el.find('.select__list').hide();
                $(this).parent().addClass('is-open');
                $(this).next().show();
            }
        });
        // datepicker
        var dp = el_date.find('.select__date');
        if (dp.length) {
            $.datepicker.regional['ru'] = { 
                closeText: 'Закрыть', 
                prevText: '&#x3c;Пред', 
                nextText: 'След&#x3e;', 
                currentText: 'Сегодня', 
                monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь', 
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], 
                monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн', 
                'Июл','Авг','Сен','Окт','Ноя','Дек'], 
                dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'], 
                dayNamesShort: ['Вск','Пнд','Втр','Срд','Чтв','Птн','Сбт'], 
                dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], 
                dateFormat: 'dd.mm.yy', 
                firstDay: 1, 
                isRTL: false 
            }; 
            $.datepicker.setDefaults($.datepicker.regional['ru']); 
            dp.datepicker({
                showOtherMonths: true,
                showMonthAfterYear: false,
                changeMonth: true,
                changeYear: true
            });
        }; 
        el_date.find('.select__head').bind('click', function(){    
            if ($(this).parent().hasClass('is-open')) {
                $(this).parent().removeClass('is-open');
                $(this).next().hide();
            }
            else {
                el.removeClass('is-open');
                el.find('.select__list').hide();
                $(this).parent().addClass('is-open');
                $(this).next().show();
            };
        });
        el.find('.select__list li').bind('click', function(){
            var val = $(this).text();
            $(this).parent().parent().prev().find('span').html(val);
            $(this).parent().parent().next().val(val);
            $(this).parent().parent().hide();
            $(this).parent().parent().parent().removeClass('is-open');
        });
        el.click(function(event){
            event.stopPropagation();
        });
        el_date.click(function(event){
            event.stopPropagation();
        });
        $(document).click(function() {
            el.find('.select__list').hide();
            el_date.find('.select__date').hide();
            el.removeClass('is-open');
            el_date.removeClass('is-open');
        });
    }
    select();

    $('.js-none').click(function(){
        $('.js-none').hide();
        $('.js-blur').addClass('is-active');
        var map_region = $(this).attr('href');
        // console.log(map_region);
        $(".js-region[data-block="+map_region+"]").show();    
        return false;
    })

});