
let pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
  iniciarApp();
})

function iniciarApp(){
  mostrarServicios()

  // Realta la seccion autual 
  
  cambiarSeccion();
  
  // Oculta o muestra el tab actual

}

function cambiarSeccion() {
  const enlaces = document.querySelectorAll('.tabs button');

  enlaces.forEach( enlace => {
    enlace.addEventListener('click', e => {
      e.preventDefault();

      pagina = parseInt(e.target.dataset.paso);
    })
  })
}

async function mostrarServicios(){
  try {
    const resultado = await fetch("./servicios.json") ;
    const db = await resultado.json(); 

    const { servicios } = db;
    
    // Generar el HTML

    servicios.forEach( servicio => {
      const {id, nombre, precio} = servicio;

      // DOM Scripting

      const nombreServicio = document.createElement('P');
      nombreServicio.textContent = nombre;
      nombreServicio.classList.add("nombre-servicio");

      const precioServicio = document.createElement('P');
      precioServicio.textContent = `$ ${precio}`;
      precioServicio.classList.add("precio-servicio");
      
      // Crear div contemedor de serviicio
      const servicioDiv = document.createElement("DIV");
      servicioDiv.classList.add("servicio");
      servicioDiv.dataset.idServicio = id;

      // Selecciona un servicio para la cita

      servicioDiv.onclick = selecionarServicio;

      // Inyector el precio y nombre en el div servicio

      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);
      
      // Inyectar los servicios en el div servicios

      document.querySelector("#servicios").appendChild(servicioDiv);


    })

  } catch (error) {
    console.log(error);
  }
}

function selecionarServicio(e){

  let elemento;

  // Forzar el click del elemento hacia el div

  if(e.target.tagName == 'P'){
    elemento = e.target.parentElement;
  }else {
    elemento = e.target;
  }

  if(elemento.classList.contains("seleccionado")){
    elemento.classList.remove("seleccionado");
  }else {
    elemento.classList.add("seleccionado");
  }

  
}