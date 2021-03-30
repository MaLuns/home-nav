let arr = document.getElementsByClassName('container');
let list = []
for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    let obj1 = {
        title: element.querySelector('.title').innerText,
        icon: "",
        childen: []
    }
    element.querySelectorAll('.col').forEach(item => {
        var obj = {}
        obj.url = item.querySelector('.card-link').href;
        obj.title = item.querySelector('.name').innerText;
        obj.desc = item.querySelector('.card-desc').innerText;
        obj.logo = item.querySelector('img').src;
        obj1.childen.push(obj)
    })
    list.push(obj1)
}
console.log(JSON.stringify(list))


var nav = []
var idx = 0;
for (let index = 0; index < temp1.children.length; index++) {
    const element = temp1.children[index];
    if (['FOOTER'].includes(element.tagName)) {
        break;
    }
    if (index % 2 === 0) {
        let obj = {
            title: element.querySelector('b').innerText,
            remark: element.querySelector('.remark') ? element.querySelector('.remark').innerText : '',
            children: []
        }
        nav.push(obj)
    } else {
        element.querySelectorAll('.col').forEach(item => {
            let { originalTitle = '' } = item.dataset;

            nav[nav.length - 1].children.push({
                url: item.querySelector('a').href,
                logo: item.querySelector('img').src,
                title: item.querySelector('a').innerText,
                desc: originalTitle
            })
        })
    }
    idx++;
}
copy(nav)