const params = new URLSearchParams(window.location.search);

document.querySelector('#search').value = params.get('q');