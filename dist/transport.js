(() => {
  const section = document.getElementById('transport');
  if (!section) return;
  const input = section.querySelector('#bus-search');
  const routes = [...section.querySelectorAll('.bus-route')];
  const status = section.querySelector('.bus-results');
  const quick = [...section.querySelectorAll('[data-bus-query]')];
  // Match common spellings while displaying the college's original place names.
  const normalize = value => value.toLowerCase().replace(/tiruppur|tirpur/g, 'tirupur')
    .replace(/avinashi|avinahi/g, 'avinashi').replace(/sankagiri|sangiri/g, 'sankagiri')
    .replace(/[^a-z0-9]+/g, ' ').trim();
  const entries = routes.map(route => ({
    route, text: normalize(route.querySelector('h3').textContent + ' ' +
      route.querySelector('.bus-via').textContent + ' ' + route.querySelector('.bus-start').textContent)
  }));
  function filter() {
    const query = normalize(input.value);
    const number = query.match(/^(?:route\s*)?0*(\d+)$/);
    let count = 0;
    entries.forEach(({route, text}) => {
      const matches = number ? Number(route.dataset.route) === Number(number[1]) :
        query.split(' ').every(word => text.includes(word));
      route.hidden = !matches;
      if (matches) count++;
    });
    status.textContent = query ? `${count} ${count === 1 ? 'route' : 'routes'} found` : `Showing all ${routes.length} routes`;
    section.querySelector('.bus-empty').hidden = count !== 0;
    section.querySelector('.bus-directory').hidden = count === 0;
    section.querySelector('.bus-directory').scrollTop = 0;
    quick.forEach(button => button.setAttribute('aria-pressed', String(normalize(button.dataset.busQuery) === query)));
  }
  input.addEventListener('input', filter);
  quick.forEach(button => button.addEventListener('click', () => {
    input.value = button.dataset.busQuery;
    filter();
  }));
  section.querySelectorAll('.bus-clear').forEach(button => button.addEventListener('click', () => {
    input.value = '';
    filter();
    input.focus({preventScroll: true});
  }));
  section.querySelector('.bus-tools').hidden = false;
})();
