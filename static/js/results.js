const params = new URLSearchParams(window.location.search);

document.querySelector('#search').value = params.get('q');

const sortYear = document.querySelector('#sort-year');
const sortTitle = document.querySelector('#sort-title');

const sorting = params.get('sort');
if(sorting == 'year') {
    sortYear.classList.add('active');
} else {
    sortTitle.classList.add('active');
}

sortYear.addEventListener('click', () => {
    params.set('sort', 'year');
    location.href = location.pathname+'?'+params.toString();
})

sortTitle.addEventListener('click', () => {
    params.set('sort', 'title')
    location.href = location.pathname+'?'+params.toString();
})