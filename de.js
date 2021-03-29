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