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
});
