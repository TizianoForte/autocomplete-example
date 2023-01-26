const search = document.getElementById("search-input")


search.addEventListener('input',()=>{
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','/data/data.json' ,true);
    ourRequest.onload = () => {    
        const ourData = JSON.parse(ourRequest.responseText);
        renderHtml(ourData,search.value);
    }; 
    ourRequest.send(); 
});

function renderHtml(data, searchTerm) {
    var list = document.getElementById("suggestions-list");
    list.innerHTML = "";
    if (!searchTerm) {
        list.innerHTML = "";
        return;
      }
      searchTerm = searchTerm.toLowerCase();
      var filteredData = data.filter(item => item.name.toLowerCase().includes(searchTerm));
      var items = filteredData.map(item => {
        var itemList = document.createElement("li");
        itemList.innerHTML = item.name;
        itemList.addEventListener("click", () => {
          search.value = item.name;
          list.innerHTML = "";
        });
        return itemList;
      });
      list.append(...items);
  }
