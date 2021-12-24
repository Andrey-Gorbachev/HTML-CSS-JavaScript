const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
//const modalClose = document.querySelector('.modal-close');

const openModal = function(){
	modalCart.classList.add('show');
};
const closeModal = () => { // такой варинат записи функции
	modalCart.classList.remove('show');
};

//openModal(); // здесь со скобками

buttonCart.addEventListener('click', openModal);
//modalClose.addEventListener('click', closeModal);

modalCart.addEventListener('click', event => {
	const target = event.target;
	if (target.classList.contains('overlay') || target.classList.contains('modal-close')) {
		closeModal();
		
	}
	
});
// scroll smooth
//(function () {
{	 //так тоже работает
	const scrollLinks = document.querySelectorAll('a.scroll-link');

	// вариант 1
	/*
	for (let i=0; i<scrollLinks.length; i++) {
		scrollLinks[i].addEventListener('click', (event) => {
			event.preventDefault();
			console.log(event);
			//const id = scrollLinks[i].href;
			const id = scrollLinks[i].getAttribute("href");
			console.log(id);
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "start"
			})
		});
	}*/
	// вариант 2
	for (const scrollLink of scrollLinks) {
		scrollLink.addEventListener('click', (event) => {
			event.preventDefault();
			console.log(event);
			const id = scrollLink.getAttribute("href");
			console.log(id);
			document.querySelector(id).scrollIntoView({
				behavior: "smooth",
				block: "start"
			})
		})
	}
}
//})();


//const more = document.querySelector('.more');
const viewAll = document.querySelectorAll('.view-all');
const navgationLink = document.querySelectorAll('.navigation-link:not(.view-all)'); // вариант 1
//const navgationLink = document.querySelectorAll('.navigation-link:[data-field]'); // вариант 2 - не сработал
const longGoodsList = document.querySelector('.long-goods-list');

const showAccessories = document.querySelectorAll('.show-accessories');
const showClothing = document.querySelectorAll('.show-clothing');

const getGoods = async function () { 
	url = 'db/db.json'; // 
	const result = await fetch(url); // result это промисс
	//const result = await fetch('https://jsonplaceholder.typicode.com/todos/');// todos/1'
	//console.log(result);
	if (!result.ok) {
		throw 'Ошибочка вышла:' + result.status
	}
	return await result.json();  // если текст то result.text
	//await
}

//console.log(getGoods());
//getGoods().then(function (data) {
//	console.log(data);
//});

// вариант
/*fetch('db/db.json')
		.then(function (response) {
				return response.json()})
		.then(function (data) { 
				console.log(data);
		})
*/		

const createCard1 = function(objCard) {
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6'

	// вариант 1
	card.innerHTML = `
		<div class="goods-card">
			${objCard.label ? 
					`<span class="label">${objCard.label}</span>` :
					''}
			
			
			<img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
			<h3 class="goods-title">${objCard.name}</h3>
			
			<p class="goods-description">${objCard.description}</p>
			
			<button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
				<span class="button-price">$${objCard.price}</span>
			</button>
		</div>
		`; 	// Обратные кавычки = шаблонные строчки
	
	//вариант 2 - деструктуризация массива
	const  {label, img, name, description, id, price} = objCard; // деструктуризация массива
	card.innerHTML = `
		<div class="goods-card">
			${label ? 
					`<span class="label">${label}</span>` :
					''}
			
			<img src="db/${img}" alt="${name}" class="goods-image">
			<h3 class="goods-title">${name}</h3>
			
			<p class="goods-description">${description}</p>
			
			<button class="button goods-card-btn add-to-cart" data-id="${id}">
				<span class="button-price">$${price}</span>
			</button>
		</div>
		`; 	// Обратные кавычки = шаблонные строчки
	
	//console.log(card);
	return(card);

};

// варинат 3 // деструктуризация массива
const createCard = function({label, img, name, description, id, price}) {
	
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6'

	
	card.innerHTML = `
		<div class="goods-card">
			${label ? 
					`<span class="label">${label}</span>` :
					''}
			
			<img src="db/${img}" alt="${name}" class="goods-image">
			<h3 class="goods-title">${name}</h3>
			
			<p class="goods-description">${description}</p>
			
			<button class="button goods-card-btn add-to-cart" data-id="${id}">
				<span class="button-price">$${price}</span>
			</button>
		</div>
		`; 	// Обратные кавычки = шаблонные строчки
	
	//console.log(card);
	return(card);

};
//createCard() 

const renderCards = function (data) {
	// можно было и innerHTML - но жто шустрее
	longGoodsList.textContent = '';
	const cards = data.map(createCard)
	console.log(cards);
	//вариант 1
	/*cards.forEach(function(card){ // map и forEach как бы одинакывы только map возвращате массив
		longGoodsList.append(card);
	})*/
	// вариант 2
	longGoodsList.append(...cards); // spread оператор


	document.body.classList.add('show-goods')

}
/*
const arr = [
	{
    "id": "001",
    "img": "img/image-122.jpg",
    "name": "Striped Long Sleeve Shirt",
    "label": "new",
    "description": "Red/Sky Blue",
    "price": "119",
    "category": "Clothing",
    "gender": "Womens"
  },
  {
    "id": "002",
    "img": "img/201mt210e.jpg",
    "name": "Poplin Top With Sleeve Bow",
    "label": "Bestseller",
    "description": "Bright Blue",
    "price": "129",
    "category": "Clothing",
    "gender": "Womens"
  },
  {
    "id": "003",
    "img": "img/61SVZdHi1SL.jpg",
    "name": "TOMS Women's Alpargata Loafer",
    "label": "Bestseller",
    "description": "Red",
    "price": "219",
    "category": "Shoes",
    "gender": "Womens"
  }];
	*/

//renderCards(arr)

// перенес в ДЗ
/*more.addEventListener('click', function (event) {
	event.preventDefault(); // чтобы исключить стандартную реализацию браузера по перезагрузке страницы
	getGoods().then(renderCards);
})
*/
const filterCards = function(field, value) {
	getGoods()
		.then(function(data) {
			const filteredGoods = data.filter(function(good) {
				return good[field] === value
			})
			return filteredGoods;
		})
		.then(renderCards);
}

//filterCards('gender','Mens')

navgationLink.forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		const field = link.dataset.field // чтобы получить дата атрибуты data-field
		const value = link.textContent;
		//if (!field) return;  //вариант выбрать все
		filterCards(field, value);
	})
})


// с интесива 24/03/2021 - про промисы
//fetch('db.db.json').then(()=>{},()=>{})
//fetch('db/db.json').then((data)=>{console.log(data)},()=>{console.error("нет такого файла db2.json")});

// вариант 1
/*fetch('db/db.json')
	.then((data)=>{
		if (data.status !== 200) {
			throw new Error("Ошибка");
		}
		console.log(data);
	},
	()=>{
		(data) => {console.error("нет такого файла db2.json")}
	});
*/
// вариант 2 
/*
fetch('db/db2.json')
	.then((data)=>{
		if (data.status !== 200) {
			throw new Error("Ошибка");
		}
		console.log(data);
	})
	.catch( // функция обработки ошибки
		()=> {
			(data) => {console.error(data)}
		}
	)
*/	
// вариант 3
/*
fetch('db/db2.json')
	.then((data)=>{
		if (data.status !== 200) {
			throw new Error("Ошибка");
		}
		console.log(data);
	})
	.catch((data) => {console.error(data)})
*/
//ДЗ 2-го дня

const showAll = function (event) {
	event.preventDefault(); // чтобы исключить стандартную реализацию браузера по перезагрузке страницы
	getGoods().then(renderCards);
}

viewAll.forEach(function (elem) {
	elem.addEventListener('click', showAll);
}) //https://youtu.be/IjgzTFWBYHE?t=4751  https://youtu.be/IjgzTFWBYHE?t=5078

showAccessories.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'Accessories');

	})
})	

showClothing.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'Clothing');
	})
})