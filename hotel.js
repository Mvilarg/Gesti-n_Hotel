let habitaciones = [];

function T_espera(ms){
    return new Promise((resolve, reject) => setTimeout(resolve,ms))
};

async function menu() {
    let opcion = prompt(
      "============= Hotel ============= \n" +
        "1. Registrar una nueva Habitacion\n" +
        "2. Listar habitaciones\n" +
        "3. Buscar habitacion por numero\n" +
        "4. Actualizar estado de habitacion\n" +
        "5. Eliminar habitacion\n" +
        "6. Salir",
    );
  
    switch (opcion) {
      case "1":
        await registrar();
        break;
      case "2":
        mostrar();
        break;
      case "3":
        await buscar();
        break;
      case "4":
        await actualizar();
        break;
      case "5":
        eliminar();
        break;
      case "6":
        console.log("Saliendo....");
        return;
      default:
        console.log("Opción no válida!");
    }
    menu();
}


async function registrar() {
    let numero = prompt("Numero:");
    let tipo = prompt("Tipo (sencilla, Doble o Suite):")
    let precioNoche= parseInt(prompt("Precio:"))
    let estado = prompt("Estado (Libre, Ocupada, Limpieza):")
    let huesped = prompt("Nombre del huesped (Vacio si esta libre);");
    
    let habitacion = {
        numero,
        tipo,
        precioNoche,
        estado,
        huesped,
    };

    console.log("Validando informacion de la habitracion");
    await T_espera(2000)
    
    habitaciones.push(habitacion);
    console.log("Habitacion registrada correctamente")
};

function mostrar(){
  if (habitaciones.length === 0  ) {
    console.log("No hay habitaciones registradas");
    return;
  }
    console.log("============= Habitaciones =============");
    habitaciones.forEach((habitacion) => {
        console.log( `Numero: ${habitacion.numero} | Tipo: ${habitacion.tipo} | Precio por noche: Q${habitacion.precioNoche} | Estado: ${habitacion.estado} | Huesped: ${habitacion.huesped} | `)
    });
}

async function buscar() {
  let numero = prompt("Numero de habitacion");

  await T_espera(2000);

  let numerobuscado = habitaciones.find((habitacion) => {
    return habitacion.numero.toLowerCase() === numero.toLowerCase();
  });
  if (numerobuscado){
    console.log("============= Habitacion encontrada =============")
    console.log(`Numero: ${numerobuscado.numero} | Tipo: ${numerobuscado.tipo} | Precio por noche: Q${numerobuscado.precioNoche} | Estado: ${numerobuscado.estado} | Huesped: ${numerobuscado.huesped} | `)
  } else{
    console.log("Habitacion no encontrada")
  }
}

async function actualizar() {
  let numero = prompt("Numero de habitacion a actualizar:");
  console.log("Esperando al personal del hotel....");

  await T_espera(2000);

  let numerobuscado = habitaciones.find((habitacion) => {
    return habitacion.numero.toLowerCase() === numero.toLowerCase();
  });
  if (numerobuscado) {
    let nuevoEstado = prompt("Ingrese el nuevo estado (Ocupado, Libre, Limpieza):");
      if (nuevoEstado.toLowerCase() === "ocupado"){
        numerobuscado.estado = nuevoEstado;
        let nombreHuesped = prompt("Nombre del Huesped: ");
        numerobuscado.huesped = nombreHuesped;
        console.log("Habitacion actualizada correctamente ");
      }
      else if (nuevoEstado.toLowerCase() === "libre"){
          numerobuscado.estado = nuevoEstado;
          numerobuscado.huesped = " "
          console.log("Habitacion actualizada correctamente ");
      }
      else if (nuevoEstado.toLowerCase() === "limpieza"){
          numerobuscado.estado = nuevoEstado;
          console.log("Habitacion actualizada correctamente ");
      }
      else{
          console.log("Estado no reconocido")
      }      
  } else {
    console.log("Habitacion no encontrada...");
  }
}

function eliminar() {
  let numero = prompt("Numero de la habitacion a eliminar: ");

  let indice = habitaciones.findIndex((habitacion) => {
    return habitacion.numero.toLowerCase() === numero.toLowerCase();
  });

  if (indice !== -1) {
    habitaciones.splice(indice, 1);
    console.log("Habitacion: " + numero + " eliminada");
  } else {
    console.log("Habitacion no encontrada...");
  }
}

menu()