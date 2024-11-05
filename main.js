let title = document.getElementById('title');
let price = document.getElementById('price');
let texas = document.getElementById('texas');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';


let tmp;
// Get Total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +texas.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "#023ca0"
    } else {
        total.innerHTML = '';
        total.style.background = '#023ca084';
    }
}
//Creat Proudct
let datapro;
if (localStorage.proudct != null) {
    datapro = JSON.parse(localStorage.proudct);
} else {
    datapro = [];
}
submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        texas: texas.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if (title.value && price.value != '') {
        if (mood === 'create') {
            if (newpro.count > 1 && newpro.count < 100) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            } else {
                alert("You Should Pick a Number Bigger Than 1 And Less Than 100");
            }
        } else {
            datapro[tmp] = newpro;
            mood = 'create'
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        cleansdata()
    } else { alert("Continue Info") }


    //Save localstorage
    localStorage.setItem('proudct', JSON.stringify(datapro));
    showdata()
}
//Clear input
function cleansdata() {
    title.value = '';
    price.value = '';
    ads.value = '';
    texas.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML = '';
}

//Read
function showdata() {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `
               <tr>
              <td>${i + 1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].texas}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button onclick='updatep(${i})' id="update">Update</button></td>
              <td><button onclick='deletdata(${i})' id="delete">Delete</button></td>
            </tr>
        `;

    }
    document.getElementById('tbody').innerHTML = table;
    let btndelet = document.getElementById('deletAll');
    if (datapro.length > 0) {
        btndelet.innerHTML = `<button onclick="deletAll()">DeleteAll (${datapro.length})</button>`

    } else {
        btndelet.innerHTML = '';
    }
}
showdata()
//Count

//delet
function deletdata(i) {
    let x = confirm("ARE YOU SURE?");
    if (x == true) {
        datapro.splice(i, 1);
        localStorage.proudct = JSON.stringify(datapro)
        showdata()
    }

}
function deletAll() {
    let y = confirm("ARE YOU SURE?")
    if (y == true) {
        localStorage.clear();
        datapro.splice(0);
        showdata();
    }
}
//update
function updatep(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    texas.value = datapro[i].texas;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = datapro[i].category;
    submit.innerHTML = 'Update';
    mood = 'c'
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}
//search
let searchmood = 'title';
function getsearchmood(id) {
    let search = document.getElementById('search')
    if (id == 'searchtitle') {
        searchmood = 'title';
        search.placeholder = 'Search By Title';

    } else {
        searchmood = 'category';
        search.placeholder = 'Search By Category';
    }
    search.focus();
}
function searchdata(value) {
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmood == 'title') {
            if (datapro[i].title.includes(value)) {
                table += `
                <tr>
               <td>${i + 1}</td>
               <td>${datapro[i].title}</td>
               <td>${datapro[i].price}</td>
               <td>${datapro[i].texas}</td>
               <td>${datapro[i].ads}</td>
               <td>${datapro[i].discount}</td>
               <td>${datapro[i].total}</td>
               <td>${datapro[i].category}</td>
               <td><button onclick='updatep(${i})' id="update">Update</button></td>
               <td><button onclick='deletdata(${i})' id="delete">Delete</button></td>
             </tr>
         `;
            }

        }
        else {

            if (datapro[i].category.includes(value)) {
                table += `
                <tr>
               <td>${i + 1}</td>
               <td>${datapro[i].title}</td>
               <td>${datapro[i].price}</td>
               <td>${datapro[i].texas}</td>
               <td>${datapro[i].ads}</td>
               <td>${datapro[i].discount}</td>
               <td>${datapro[i].total}</td>
               <td>${datapro[i].category}</td>
               <td><button onclick='updatep(${i})' id="update">Update</button></td>
               <td><button onclick='deletdata(${i})' id="delete">Delete</button></td>
             </tr>
         `;
            }
        }



        document.getElementById('tbody').innerHTML = table;

    }
}










//CleanData