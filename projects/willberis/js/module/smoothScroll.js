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
