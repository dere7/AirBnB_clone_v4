$(function () {
  const HOST = 'http://127.0.0.1:5001';
  const amenities = {};
  $('li input[type="checkbox"]').bind('change', (e) => {
    const el = e.target;
    if (el.checked) {
      amenities[el.dataset.name] = el.dataset.id;
    } else {
      delete amenities[el.dataset.name];
    }
    $('.amenities h4').text(Object.keys(amenities).sort().join(', '));
  });
  // check status of api
  $.getJSON(`${HOST}/api/v1/status`, (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $('.filters button').bind('click', searchPlace);
  searchPlace();

  // fetch places
  function searchPlace () {
    $.post({
      url: `${HOST}/api/v1/places_search`,
      data: JSON.stringify({ amenities: Object.values(amenities) }),
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        $('section.places').empty();
        data.forEach((place) =>
          $('section.places').append(
            `<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest${
              place.max_guest !== 1 ? 's' : ''
            }</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${
              place.number_rooms !== 1 ? 's' : ''
            }</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
              place.number_bathrooms !== 1 ? 's' : ''
            }</div>
        </div> 
        <div class="description">
          ${place.description}
        </div>
      </article>`
          )
        );
      },
      dataType: 'json'
    });
  }
});
