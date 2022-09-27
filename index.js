// Fetch the data from this url and create a typeahead to filter by disease name or code

// each disease should be a <li> in the suggestions <ul>

// there is a span class of `hl` to highlight matches

// Demo: https://medicalvalues.de/wp-content/uploads/2021/01/js_challenge.mp4

// You are free to use additional libraries or frameworks, please just do not copy the whole code from somwhere else

// Once you are done, save this fiddle and send us the url

let inputbox = document.querySelector("input");
let getSearch = document.querySelector("ul");
let names = [];
const url = 'https://raw.githubusercontent.com/NCI-CBIIT/FHH/master/data/diseases.json';
// to make input field empty on load
inputbox.value = '';
inputbox.onkeyup = function(){
    // to delete all listes
    $('ul').empty();
    getDisease()
}

function getDisease() {
    if (inputbox.value == "") {
        getSearch.innerHTML = '<li>Filter for a disease or code</li>'
    }
    else {
        // fetch data from Api on array names
        fetch(url)
        .then((response) =>  response.json())
        .then((data) =>{
            for (const [key, value] of Object.entries(data)) {
                for (let index = 0; index < value.length; index++) {
                    names.push(value[index].name +", "+ value[index].code);
               
            }
            }
            // start to filter array
            // using Regex to filter out some chars
            // and the import for this in Html 
            let query = inputbox.value;
            query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\,\\|]/);
            let queryRegExp = new RegExp(query,"i");
            let results = names.filter(function(item) {
                console.log(item.textContent)

                return queryRegExp.test(item);
            });
            // write the list on Html
            results.forEach(function(item) {
                // jquery as well imported on Html
                $('ul').append("<li>" +                
             item.replace(queryRegExp,`<span class="hl">${queryRegExp}</span>`)
                + "</li>");
            });
            
        })
    }
}