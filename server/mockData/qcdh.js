//http://www.qiachu.com/
const cheerio = require('cheerio');
const fetch = require('node-fetch')
const { write } = require('./util')
const path = require('path')

String.prototype.replaceAll = function (str, str2) {
    return this.split(str).join(str2)
}

async function getHTML(url, frisrt = true) {
    let data = await fetch(url).then(res => (res.text()))
    let $ = cheerio.load(data);

    let promises = []
    $('.item').each(function () {
        const item = $(this);
        let obj = {
            url: item.find('.a').attr('href'),
            logo: item.find('img').attr('src'),
            title: item.find('h3').text(),
            desc: item.find('p').text().replaceAll('\n', '').replaceAll('\t', '').replaceAll(' ', ''),
        }

        promises.push(
            fetch(obj.url).then(res => res.text()).then(res => {
                obj.url = cheerio.load(res)('a.btn.transition').attr('href')
                return obj;
            })
        )
    });

    if (frisrt) {
        let url_list = []
        $('.pagebar a.page-numbers').each(function () {
            let url = $(this).attr('href');
            if (!url_list.includes(url))
                url_list.push(url)
        })
        url_list.forEach(item => {
            promises.push(getHTML(item, false))
        })
    }
    return Promise.allSettled(promises).then(res => res.map(item => item.value));

}

const getQCJson = (url) => {
    return getHTML(url, true).then(res => {
        let arr = []
        res.forEach(item => {
            if (Array.isArray(item)) {
                arr.push(...item);
            } else {
                arr.push(item);
            }
        })
        return arr
    })
}


getQCJson('http://www.qiachu.com/category-2.html').then(res => {
    let data = [{ "title": "排行", "icon": "", "children": res }]
    write(path.resolve(__dirname, '../static/mock/hot.json'), JSON.stringify(data))
})