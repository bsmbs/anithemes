const examples = ['Toradora', 'Toaru', 'Evangelion', 'Code Geass', 'Steins;Gate', 'Gintama', 'Monogatari', 'Gurren Lagann', 'Re:Zero', 'Madoka', 'Seishun Buta Yarou', 'Clannad', 'Date A Live', 'Fate', 'Chuunibyou', 'Suzumiya', 'Lucky Star', 'Kimetsu no Yaiba', 'Shingeki no Kyojin', 'Sword Art Online', 'No Game No Life', 'Angel Beats', 'Mirai Nikki', 'Shigatsu wa Kimi no Uso', 'Ano Hi Mita Hana'];

let c = document.querySelector('.results');
examples.forEach(a => {
    let el = document.createElement('a');
    el.href = '/search?q='+a;
    el.innerText = a;
    el.className = 'item';

    c.appendChild(el);
})