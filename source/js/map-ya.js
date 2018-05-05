ymaps.ready(init);
var myMap,
    myPlacemark;

function init(){
  myMap = new ymaps.Map("map", {
    center: [34.869497, -111.760186],
    zoom: 7
  });

  myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    hintContent: 'Седона!',
    balloonContent: 'Welcome to the gorgeous Sedona!'
  }, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#image',
    // Своё изображение иконки метки.
    iconImageHref: 'img/icon-map-marker.svg',
    // Размеры метки.
    iconImageSize: [27, 27],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-13, -13]
  });

  myMap.geoObjects.add(myPlacemark);
};
