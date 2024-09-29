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

async function switchMode() {
    var form = document.getElementById("skincare-quiz");
    var keywordsearch = document.getElementById("keywordsearch");

    if (form.style.visibility === "hidden") {
        form.style.visibility = "visible";
        form.style.maxHeight = "none";
        keywordsearch.style.visibility =  "hidden";
        keywordsearch.style.maxHeight = "0";
    } else {
        keywordsearch.style.visibility = "visible";
        keywordsearch.style.maxHeight = "none";
        form.style.visibility =  "hidden";
        form.style.maxHeight = "0";
    }
}