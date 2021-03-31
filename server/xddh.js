//hhttps://webjike.com/web.html
const cheerio = require('cheerio');
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

String.prototype.replaceAll = function (str, str2) {
    return this.split(str).join(str2)
}


async function getHTML(url, frisrt = true) {
    let data = await fetch(url).then(res => (res.text()))
    let $ = cheerio.load(data);
    let arr = []
    $('.row.duty-item').each(function () {
        let item = $(this)
        let obj = {
            "title": item.find('.duty-item-name').text(),
            "remark": "",
            "children": []
        }
        item.find('.col-md-3.col-sm-4.col-xs-6').each(function () {
            let element = $(this)
            obj.children.push({
                "url": element.find('a').attr('href'),
                "title": element.find('.duty-card-tit').text(),
                "logo": 'https://webjike.com' + element.find('img').attr('data-original'),
                "desc": element.find('.duty-card-des').text()
            })
        })

        arr.push(obj)
    });
    return (arr);
}


getHTML('https://webjike.com/web.html').then(res => {
    fs.writeFile(path.resolve(__dirname, '../static/mock/web.json'), JSON.stringify(res), function (err) {
        if (err) console.log(err)
    })
})
