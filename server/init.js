const { Nav, LinkClass, LinkInfo } = require('./models')
const navJson = require('../static/mock/index-nav.json')

function initNav() {
    navJson.forEach((item, index) => {
        let nav = new Nav({
            title: item.title,
            url: item.url,
            sort: index,
        })
        nav.save(function (err, doc) {
            switch (item.url) {
                case '/nav':
                    initLinkClass(doc, require('../static/mock/nav.json'))
                    break;
                case '/design':
                    initLinkClass(doc, require('../static/mock/design.json'))
                    break;
                case '/wallpaper':
                    initLinkClass(doc, require('../static/mock/wallpaper.json'))
                    break;
                case '/hot':
                    initLinkClass(doc, require('../static/mock/hot.json'))
                    break;
                case '/tool':
                    initLinkClass(doc, require('../static/mock/tool.json'))
                    break;
                case '/web':
                    initLinkClass(doc, require('../static/mock/web.json'))
                    break;
                default:
                    break;
            }
        })
    })
}

function initLinkClass(doc, arr) {
    arr.forEach((item, index) => {
        let linkclass = new LinkClass({
            title: item.title,
            desc: item.remark,
            sort: index,
            navID: doc._id
        })
        linkclass.save(function (err, docs) {
            if (err)
                console.log(err)
            else
                initLinkInfo(docs._id, item.children)
        })
    })
}

function initLinkInfo(id, arr) {
    arr.forEach((item, index) => {
        let { title = '', logo = '', url = '', desc = '' } = item;
        let linkinfo = new LinkInfo({
            title,
            logo,
            url,
            desc,
            sort: index,
            classID: id
        })
        linkinfo.save(function (err, docs) {
            if (err)
                console.log(err)
            else
                console.log(docs.title)
        })
    })
}