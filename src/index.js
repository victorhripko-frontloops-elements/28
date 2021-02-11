import './style.scss';

(() => {

  const API = 'https://pokeapi.co/api/v2/pokemon/';

  const input = document.querySelector('.input__field');
  const inputDropdown = document.querySelector('.input__dropdown');

  input.addEventListener('input', (evt) => {
    const val = evt.target.value;

    fetch(API).then(res => res.json()).then(json => {

      const results = val ? json.results : [];
      const filtered = results.filter((el) => el.name.startsWith(val));

      filtered.length ? renderItems(filtered) : closeDropdown();

    });
  });


  function renderItems(items) {
    const className = 'input__item';

    inputDropdown.innerHTML = items.reduce((prev, current) => {
      return prev + `<li class="${className}">${current.name}</li>`;
    }, '');

    const elements = document.querySelectorAll(`.${className}`);

    elements.forEach((el) => {
      el.addEventListener('click', (evt) => {
        evt.preventDefault();
        input.value = el.textContent;
        closeDropdown();
      });
    });
  };

  function closeDropdown(){ inputDropdown.innerHTML = '' };

})();
