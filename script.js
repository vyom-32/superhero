// access-token : 1375110819558664

//https://superheroapi.com/api/1375110819558664

console.log("hello");

function debounced(func, delay) {
	let timer;
	const debouncedFunction = () => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			getData();
		}, delay);
	};
	return debouncedFunction;
}


const getData = async () => {

	const searchString = document.getElementById("search");
	const url = `https://superheroapi.com/api.php/1375110819558664/search/${searchString.value}`;
	console.log("Making a request : " + url);
	const response = await fetch(url);
	const data = await response.json();
	var result = data.results;
	console.log(result);
	if (searchString.value.length != 0) {

		const slist = document.getElementById("searchlist");
		slist.innerHTML = "";
		result.map((element, i) => {
			id = element.id;
			console.log(element.name);
			slist.innerHTML += `
		  	<li class="card">
		  		<img src="${element.image.url}" alt="" />
		  		<div class="card-content">
					<h2>${element.name}</h2>
					<button onclick="javascript : searchSuperhero(${id});" class="btn btn-info">Search</button>
					<button onclick="javascript : addFavourite(${id});" class="btn btn-success">Add to Favourites</button>
		  		</div>
			</li>`;
		});
	}
}

async function searchSuperhero(id) {
	console.log(id);
	const url = `https://superheroapi.com/api.php/1375110819558664/${id}`;
	let response = await fetch(url);
	const data = await response.json();
	localStorage.setItem("searchData", JSON.stringify(data));
	location.href = "./details.html";
}

async function addFavourite(id) {
	console.log("addFav : " + id);
	const url = `https://superheroapi.com/api.php/1375110819558664/${id}`;
	let response = await fetch(url);
	const data = await response.json();
	console.log(data);
	var ref = JSON.parse(localStorage.getItem("favList"));
	let flag = true;
	if (ref != null) {
		ref.forEach((element) => {
			if (element.id == data.id) {
				flag = false;
				alert(`${data.name} is Already added in list`);
			}
		});
		if (flag) {
			let favList = [];
			favList = [...ref, data];
			localStorage.setItem("favList", JSON.stringify(favList));
			alert(`${data.name} is Successfully added in list`);
		}
	}
	if (ref == null || ref == undefined) {
		let favList = [data];
		localStorage.setItem("favList", JSON.stringify(favList));
		alert(`${data.name} is Successfully added in list`);
	}
}

document.getElementById("search").addEventListener("input", debounced(getData, 250));


