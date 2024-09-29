const url = 'https://sephora.p.rapidapi.com';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '9033ee82abmsh58965a37e0b692bp164847jsndff4e9cb3477',
		'x-rapidapi-host': 'sephora.p.rapidapi.com'
	}
};

async function getProducts() {
var list = document.getElementById("products");
list.innerHTML = "";
var loadingImage = document.getElementById("loading");
loadingImage.style.visibility = "visible";
var dropdown = document.getElementById("sort").value;
var form = document.getElementById("skincare-quiz");
var textField;
if (form.style.visibility === "hidden") {
    textField = document.getElementById("keywords").value;
} else {
    textField = "";
    var skinType = document.querySelectorAll("input[name = 'q1']");

    for (const type of skinType) {
        if (type.checked) {
          textField = type.value;
          break;
        }
    }

    var skinConcerns = document.querySelectorAll("input[name = 'q2']")

    for (const concern of skinConcerns) {
        if (concern.checked) {
          textField = textField + concern.value;
          break;
        }
    }

    var productType = document.querySelectorAll("input[name = 'q3']")

    for (const type of productType) {
        if (type.checked) {
          textField = textField + type.value;
          break;
        }
    }
}

var keywords = textField.replace(/ /g,'');
const apiUrl = url + '/us/products/v2/search?pageSize=10&currentPage=1&q=' + keywords + "&node=cat150006" +  dropdown;
fetch(apiUrl, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    loadingImage.style.visibility = "hidden";
    var products = data.products;
    for (var i = 0; i < products.length; i++) {
        var card = document.createElement("div");
        var heroImage = document.createElement("img");
        heroImage.src = products[i].heroImage;
        heroImage.width = "200";
        heroImage.height = "200";
        var imageLink = document.createElement("a");
        imageLink.href = "https://sephora.com" + products[i].targetUrl;
        imageLink.target = "_blank";
        imageLink.appendChild(heroImage);
        card.appendChild(imageLink);
        console.log("Image info: " + heroImage.src);
        card.appendChild(document.createTextNode(products[i].displayName.toUpperCase() + ", Price: " + products[i].currentSku.listPrice));
        var li = document.createElement('li');
        li.appendChild(card);
        list.appendChild(li);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

async function switchMode() {
    var form = document.getElementById("skincare-quiz");
    var keywordsearch = document.getElementById("keywordsearch");
    var button = document.getElementById("switchMode");

    if (form.style.visibility === "hidden") {
        button.innerText = "Want to get more specific with your search? Click here";
        form.style.visibility = "visible";
        form.style.maxHeight = "none";
        keywordsearch.style.visibility =  "hidden";
        keywordsearch.style.maxHeight = "0";
    } else {
        button.innerText = "Don't know what to search? Click here";
        keywordsearch.style.visibility = "visible";
        keywordsearch.style.maxHeight = "none";
        form.style.visibility =  "hidden";
        form.style.maxHeight = "0";
    }
}