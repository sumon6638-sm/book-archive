document.getElementById('spinner').style.display = "none";

const searchBook = () => {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value;
    const url = `https://openlibrary.org/search.json?q=${searchText}`;

    document.getElementById('spinner').style.display = "block";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            //Search Details about your search keyword
            const searchDetails = document.getElementById('search-details');
            document.getElementById('spinner').style.display = "none";
            //clear search details
            searchDetails.textContent = '';

            const searchDetailsResult = document.createElement('div');
            searchDetailsResult.classList.add('text-center');
            if (data.numFound === 0) {
                searchDetailsResult.innerHTML = `
                    <div class="container border border-danger rounded-3 border-3">
                        <h2><span class = 'text-danger'>'${data.numFound}'</span> books found about <span class = 'text-danger'>"${searchText}"</span></h2>
                        <h2 class="text-danger">Sorry! Please search with a proper book name.</h2>
                    </div>
                `;
            }
            else {
                searchDetailsResult.innerHTML = `
                    <div class="container border border-primary rounded-3 border-3">
                        <h1>You are searching with the keyword: <span style="color: rgba(22, 9, 160, 0.623)">${searchText}</span></h1>
                        <h2><span style="color: rgba(22, 9, 160, 0.623)">${data.numFound}</span> books found about "${searchText}"</h2>
                    </div>
                `;
            }
            searchDetails.appendChild(searchDetailsResult);

            //Show all books
            const bookContainer = document.getElementById('book-container');

            //clear book details...
            bookContainer.textContent = '';

            //append all books
            (data.docs).forEach((book) => {
                const div = document.createElement('div');
                div.classList.add('col-md-12');
                div.innerHTML = `
                    <!-- image -->
                    <div class="card mb-3" style="max-width: 100%;">
                        <div class="row">
                            <div class="col-md-4">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"
                                class="img-fluid rounded" style="height: 250px;" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title text-primary">${book.title}</h5 >
                                    <p class="card-text">by ${book.author_name}</p>
                                    <p class="card-text"><span class='text-danger'>Publisher:</span> ${book.publisher}</p>
                                    <p class="card-text"><small class="text-muted">First published in ${book.first_publish_year} at ${book.publish_place} </small></p>
                                    <p class="card-text"><small class="text-muted">It's have ${book.edition_count} edition </small></p>
                                    <a target="_blank" href="https://openlibrary.org${book.key}"><button class="btn btn-outline-primary">More About...</button></a>
                                </div >
                            </div >
                        </div >
                    </div >
                    `;

                //When book cover will not found then this default image will be shown
                if (book.cover_i === book[-1]) {
                    div.innerHTML = `
                    <!-- image -->
                    <div class="card mb-3" style="max-width: 100%;">
                        <div class="row">
                            <div class="col-md-4">
                            <img src="img/img_not_found.png"
                                class="img-fluid rounded" style="height: 250px;" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title text-primary">${book.title}</h5 >
                                    <p class="card-text">by ${book.author_name}</p>
                                    <p class="card-text"><span class='text-danger'>Publisher:</span> ${book.publisher}</p>
                                    <p class="card-text"><small class="text-muted">First published in ${book.first_publish_year} at ${book.publish_place} </small></p>
                                    <p class="card-text"><small class="text-muted">It's have ${book.edition_count} edition </small></p>
                                    <a target="_blank" href="https://openlibrary.org${book.key}"><button class="btn btn-outline-primary">More About...</button></a>
                                </div >
                            </div >
                        </div >
                    </div >
                    `
                }
                bookContainer.appendChild(div);
            });

            //clear input value
            searchInput.value = '';
        });
}