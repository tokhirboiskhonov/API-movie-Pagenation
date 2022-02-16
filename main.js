const elMovieForm = findElement('.movie__form');
const elMovieInputSearch = findElement('.movie__input-search');
const elMovieList = findElement('.movie__list');
const elMovieTemplate = findElement('.movie__template').content;
const elPrevButton = findElement('.films__prev-button');
const elNextButton = findElement('.films__next-button');


const API_KEY = '6bacc047';

let search = 'hulk';

let page = 1;

function renderMovie(array, node) {
    
    node.innerHTML = null;
    
    const movieFragment = document.createDocumentFragment();
    
    array.forEach((row) => {
        
        const clonedMovieTemplate = elMovieTemplate.cloneNode(true);
        
        clonedMovieTemplate.querySelector('.movie__title').textContent = row.Title;
        clonedMovieTemplate.querySelector('.movie__poster').src = row.Poster;
        clonedMovieTemplate.querySelector('.movie__year').textContent = row.Year;
        clonedMovieTemplate.querySelector('.movie__type').textContent = row.Type;
        clonedMovieTemplate.querySelector('.movie__id').textContent = row.imdbID;
        movieFragment.appendChild(clonedMovieTemplate);
    });
    node.appendChild(movieFragment);
}

async function getMovies() {
    try{
        const res = await fetch(
            
            'https://www.omdbapi.com/?apikey=' +
            API_KEY +
            '&s=' +
            search +
            '&page=' +
            page,
            
            );
            
            const data = await res.json();
            
            if(data.Search.length > 0){
                renderMovie(data.Search, elMovieList);
            }
            
            
            if(page === 1){
                elPrevButton.disabled = true;
            } else{
                elPrevButton.disabled = false;
            }
            
            const lastPage = Math.ceil(data.totalResults / 10);
            
            if(page === lastPage){
                elNextButton.disabled = true;
            }else{
                elNextButton.disabled = false;
            }
        } catch (err) {
            elMovieList.textContent = 'Xatolik yuz berdi'
        } finally {
            console.log('Final');
        }
    }
    
    elMovieForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
        search = elMovieInputSearch.value.trim();
        
        getMovies();
        getMovies();
        
        elMovieInputSearch.value = null;
    })
    
    elPrevButton.addEventListener('click', () => {
        page--;
        getMovies();
    });
    
    elNextButton.addEventListener('click', () => {
        page++;
        getMovies();
    });
    
    getMovies();