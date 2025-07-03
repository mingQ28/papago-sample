const checkbox = document.getElementById('checkbox');
const html = document.querySelector('html');

const toggleDarkMode = () => checkbox.checked ? html.classList.add('dark') : html.classList.remove('dark');

checkbox.addEventListener('click', toggleDarkMode);