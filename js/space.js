document.getElementById("btnBuscar").addEventListener("click", function () {
    const texto = document.getElementById("inputBuscar").value.trim(); //texto ingresado ingresado por el usuario 
    if (texto === "") {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }
  
    const url = `https://images-api.nasa.gov/search?q=${texto}`; //URL de la API
    console.log("URL para la solicitud a la API:", url);
  
    fetch(url) //solicitud a la API
      .then(response => {
        if (!response.ok) { //verifico si la respuesta es correcta
          throw new Error('La respuesta de la red no fue correcta: ' + response.statusText);
        }
        return response.json(); //convierto la respuesta a JSON
      })
      .then(data => {
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = ""; //limpia el contenedor de imágenes antes de agregar nuevas
  
        const items = data.collection.items; //obtengo el array de imágenes
        if (items.length === 0) { //verifica si no hay resultados
          contenedor.innerHTML = "<p>No se encontraron resultados.</p>"; //muestra un mensaje si no hay resultados
          return;
        }
  
        items.forEach(item => {
          const imagenUrl = item.links ? item.links[0].href : "https://via.placeholder.com/300"; //si hay imagen la muestra, si no muestra una imagen de reemplazo
          const titulo = item.data[0]?.title || "Sin título"; //si hay título lo muestra, si no muestra "Sin título"
          const descripcion = item.data[0]?.description || "Sin descripción disponible"; //si hay descripción la muestra, si no muestra "Sin descripción disponible"
          const fecha = item.data[0]?.date_created || "Fecha no disponible"; //si hay fecha la muestra, si no muestra "Fecha no disponible"
  
          //tarjeta de estilos de bootstrap para cada foto
          contenedor.innerHTML += ` 
            <div class="card" style="width: 18rem; margin-bottom: 20px;">
              <img src="${imagenUrl}" class="card-img-top" alt="${titulo}">
              <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descripcion}</p>
                <p class="card-text"><small class="text-muted">Fecha: ${fecha}</small></p>
              </div>
            </div>
          `;
        });
      })
      .catch(error => { //mensaje de error
        console.error("Hubo un problema con la operación fetch:", error);
      });
  });
  