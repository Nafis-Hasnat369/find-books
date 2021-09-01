const searchBook = async () => {
    // get input
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field
    searchField.value = "";

    // clear previous result
    const totalResult = document.getElementById("total-result");
    totalResult.textContent = "";
    // search result
    if (searchText === "") {
        const searchResult = document.getElementById("search-result");
        searchResult.textContent = "";
        const div = document.createElement('div');
        div.classList.add("mx-auto");
        div.innerHTML = "<h5>Write something to search...</h5>";
        searchResult.appendChild(div);
    }
    else {
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displaySearchResult(data);
    }
};
// display search results
const displaySearchResult = books => {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    if (books.docs.length == "0") {
        const div = document.createElement('div');
        div.classList.add("mx-auto");
        div.innerHTML = "<h5>No results found!</h5>";
        searchResult.appendChild(div);
    }
    else {
        books.docs.forEach(book => {
            const div = document.createElement('div');
            div.classList.add("col");
            div.innerHTML = `
            <div class="card h-50">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body my-auto">
                    <h3 class="card-title">Name:<span class="text-danger"> ${book.title}</span></h3>
                    <h5 class="card-title">Author names:<span class="text-primary"> ${book.author_name}</span></h5>
                    <h4 class="card-title">Publisher:<span class="text-success"> ${book.publisher}</span></h4>
                    <h4 class="card-title">First Published:<span class="text-info"> ${book.first_publish_year}</span></h4>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
            // display total result
            const totalResult = document.getElementById("total-result");
            totalResult.innerHTML = `<h3>Total search result: <span class="text-primary">${books.numFound}</span></h3>`;
        })
    }
};