const url = 'https://sephora.p.rapidapi.com';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9033ee82abmsh58965a37e0b692bp164847jsndff4e9cb3477',
		'x-rapidapi-host': 'sephora.p.rapidapi.com'
	}
};

async function getProducts() {
var dropdown = document.getElementById("sort").value;
const apiUrl = url + '/us/products/v2/search?pageSize=60&currentPage=1&q=eczema' + dropdown;
fetch(apiUrl, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    var list = document.getElementById("products");
    var products = data.products;
    for (var i = 0; i < products.length; i++) {
        var li = document.createElement('li');
        li.appendChild(document.createTextNode(products[i].displayName));
        list.appendChild(li);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}