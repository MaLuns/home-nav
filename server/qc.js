//http://www.qiachu.com/
const cheerio = require('cheerio');
const fetch = require('node-fetch')

String.prototype.replaceAll = function (str, str2) {
    return this.split(str).join(str2)
}

async function getHTML(url, frisrt = true) {
    let data = await fetch(url).then(res => (res.text()))
    let $ = cheerio.load(data);
    let items = $('.item').toArray();

    let promises = []
    for (let index = 0; index < items.length; index++) {
        const item = $(items[index]);
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
    }

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

module.exports = getQCJson