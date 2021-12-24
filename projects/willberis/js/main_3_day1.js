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
const modalClose = document.querySelector('.modal-close');
const more = document.querySelector('.more');
const viewAll = document.querySelectorAll('.view-all');
const navgationLink = document.querySelectorAll('.navigation-link:not(.view-all)'); // вариант 1
//const navgationLink = document.querySelectorAll('.navigation-link:[data-field]'); // вариант 2 - не сработал
const longGoodsList = document.querySelector('.long-goods-list');
const showAccessories = document.querySelectorAll('.show-accessories');
const showClothing = document.querySelectorAll('.show-clothing');
const cartTableGoods = document.querySelector('.cart-table__goods');
const cardTableTotal = document.querySelector('.card-table__total');


//const getGoods = async function () { 
const getGoods = async () => { 	
	url = 'db/db.json'; // 
	const result = await fetch(url); // result это промисс
	//const result = await fetch('https://jsonplaceholder.typicode.com/todos/');// todos/1'
	if (!result.ok) {
		throw 'Ошибочка вышла:' + result.status
	}
	return await result.json();  // если текст то result.text
}

const cart = {
	cartGoods: [],
	/*cartGoods: [
		//тестовые данные
		{
			id: "099",
			name: "Часы Dior",
			price: 999,
			count: 2,
		},
		{
			id: "090",
			name: "Кеды  Вдики",
			price: 9,
			count: 3,
		},
	],*/
	
	renderCart() {
		cartTableGoods.textContent = '';
		this.cartGoods.forEach( ({id, name, price, count}) => {
			const trGood = document.createElement('tr');
			trGood.className = 'cart-item' ;
			trGood.dataset.id = id;
			//вариант 1 для deleteGood
			trGood.innerHTML = `
				<td>${name}</td>
				<td>${price}</td>
				<td><button class="cart-btn-minus" data-id="${id}">-</button></td>
				<td>${count}</td>
				<td><button class="cart-btn-plus" data-id="${id}">+</button></td>
				<td>${price*count}</td>
				<td><button class="cart-btn-delete" data-id="${id}">x</button></td>
			`;
			//вариант 2 для deleteGood
			trGood.innerHTML = `
				<td>${name}</td>
				<td>${price}</td>
				<td><button class="cart-btn-minus">-</button></td>
				<td>${count}</td>
				<td><button class="cart-btn-plus">+</button></td>
				<td>${price*count}</td>
				<td><button class="cart-btn-delete">x</button></td>
			`;
			cartTableGoods.append(trGood);
			
		});
		const totalPrice = this.cartGoods.reduce((sum, item /*, index, arr*/) => { 
			return sum + item.price * item.count;
		}, 0); // 0 - начальное занчение acc (sum) - аккумулятора
		cardTableTotal.textContent = totalPrice + '$';
	},
	deleteGood(id) {
		this.cartGoods = this.cartGoods.filter( item => id !== item.id);
		this.renderCart();
	},
	//foo: function (id) {} // так писали раньше
	minusGood(id) {
		for (const item of this.cartGoods) {
			if (item.id === id) {
				if (item.count <= 1) {
					this.deleteGood(id);
				} else {
					item.count--;
					break;
				}
			}
		}
		this.renderCart();	
	},
	plusGood(id) {
		for (const item of this.cartGoods) {
			if (item.id === id) {
				item.count++;
				break;
			}
		}
		this.renderCart();
	},
	addCartGoods(id) {
		const  goodItem = this.cartGoods.find( item => item.id === id);
		//console.log(goodItem);
		if (goodItem) {
			this.plusGood(id);
		} else {
			getGoods()
				.then( data => data.find( item => item.id === id))
				// если находим
				//.then( item => {
				.then( ({id, name, price}) => { // деструткурируем
					this.cartGoods.push({
						id,
						name,
						price,
						count: 1
					})
				})
		}

	},
}
// тестируем 
//cart.renderCart();
//cart.deleteGood('099');
//cart.addCartGoods('001')

document.body.addEventListener('click', event => {
	//const target = event.target;
	const addToCart = event.target.closest('.add-to-cart');
	//console.log(addToCart);
	//if (target.classList.contains('add-to-cart')) {
	if (addToCart) {
		//console.log('Добавить товар в корзину')
		cart.addCartGoods(addToCart.dataset.id);
	}
})

cartTableGoods.addEventListener('click', event => {
	const target = event.target;
	if (target.tagName === "BUTTON") {
		const id = target.closest('.cart-item').dataset.id;
		if (target.classList.contains('cart-btn-delete')) {
		//cart.deleteGood('099'); // тестовый вариант 
		//вариант 1 для deleteGood
		////cart.deleteGood(target.dataset.id); // вариант 1
		//вариант 2 для deleteGood
		///const parent = target.closest('.cart-item');
		///cart.deleteGood(parent.dataset.id); 
		//вариант 3 для deleteGood
		//const id = target.closest('.cart-item').dataset.id;
		cart.deleteGood(id); 
	};
	if (target.classList.contains('cart-btn-minus')) {
		//const id = target.closest('.cart-item').dataset.id;
		cart.minusGood(id); 	
	};
	if (target.classList.contains('cart-btn-plus')) {
		//const id = target.closest('.cart-item').dataset.id;
		cart.plusGood(id); 
	};
	}
	
})

//const openModal = function(){
const openModal = () => {	
	cart.renderCart();
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
//more.addEventListener('click', function (event) {
more.addEventListener('click', event => {	
	event.preventDefault(); // чтобы исключить стандартную реализацию браузера по перезагрузке страницы
	getGoods().then(renderCards);
})

const filterCards = function(field, value) {
	getGoods()
		//.then(function(data) {
		//.then( data => {			
			//const filteredGoods = data.filter(function(good) {
			//	return good[field] === value
			//})
			/////const filteredGoods = data.filter( good => good[field] === value);
			// в такой форме можно обйотись без return - функциоанльное выражение
			///return filteredGoods;

			// или еще короче
			//return data.filter( good => good[field] === value);

			//bkb cjdctv rjhjnrj
		.then( data => data.filter( good => good[field] === value))
		.then(renderCards);
}

//filterCards('gender','Mens')

navgationLink.forEach(function (link) {
	//link.addEventListener('click', function (event) {
	link.addEventListener('click', event => {
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