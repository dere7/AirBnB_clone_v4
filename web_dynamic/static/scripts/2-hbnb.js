$(function () {
  let amenities = [];
  $('li input[type="checkbox"]').bind('change', (e) => {
    const el = e.target;
    if (el.checked) {
      amenities.push(el.dataset.id);
    } else {
      amenities = amenities.filter(id => id !== el.dataset.id);
    }
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
