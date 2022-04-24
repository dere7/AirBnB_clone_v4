$(function () {
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
  $.getJSON('http://127.0.0.1:5001/api/v1/status', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
