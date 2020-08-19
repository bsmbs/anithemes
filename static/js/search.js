document.querySelector('#search').addEventListener('keydown', (e) => {
    if(e.keyCode == 13) search();
})

document.querySelector('#search-btn').addEventListener('click', search)

function search() {
    let q = document.querySelector('#search').value;
    location.href = '/search?q='+q;
}