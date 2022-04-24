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
});
