let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', ()=>{
    if (pagina <1000) {
        pagina +=1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', ()=>{
    if (pagina > 1) {
        pagina -=1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async() => {
    try {
        const respuesta = await fetch  (`https://api.themoviedb.org/3/movie/popular?api_key=1f4a01712605a2abe5cc1f190d88a345&language=es-MX&page=${pagina}`);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas += `
                <div class = "pelicula">
                <img class = "poster" src ="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                <h3 class="titulo">${pelicula.title}</h3>
                </div>
                `;
            });
            document.getElementById('contenedor').innerHTML = peliculas;

        }else if(respuesta.status === 401){
            console.log('la url esta escrita incorrectamente');
        }else if(respuesta.status === 404){
            console.log('la pelicula buscada no existe');
        }else{
            console.log('Error no esperado y desconocido');
        }

    } catch (error) {
        console.log(error);
    }
};

cargarPeliculas();