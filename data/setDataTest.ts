// Lista de reservas a probar - PNRs proporcionados
export const dataTest = [
    { es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
    },
        descripcion: "Seleccionar ciudad de origen",target_page:"home",idioma:"es",pais:"CO", ciudad_origen: "BOG"},
    { es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
    },
        descripcion: "Seleccionar ciudad de origen y destino",target_page:"home",idioma:"es",pais:"CO", ciudad_origen: "BOG" ,ciudad_destino:"MDE"},
    { es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
    },
        descripcion: "Selecciona fecha ida y vuelta y buscar",target_page:"home",idioma:"es",pais:"CO", ciudad_origen: "BOG",ciudad_destino:"MDE",fecha_salida:"ago 16",fecha_llegada:"ago 30"},
    { es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
        informacion_tarifas: 'condiciones de tu tarifa',
    },
        descripcion: "Selecciona vuelo de ida",target_page:"booking",idioma:"es",pais:"CO", ciudad_origen: "BOG",ciudad_destino:"MDE",fecha_salida:"ago 16",fecha_llegada:"ago 30"
        ,editFlightSelected: false,numero_vuelo_ida:'2',consulta_condiciones_tarifa:false,
    },
    { es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
        informacion_tarifas: 'condiciones de tu tarifa',
    },
        descripcion: "Selecciona vuelo de ida y vuelta",target_page:"booking",idioma:"es",pais:"CO", ciudad_origen: "BOG",ciudad_destino:"MDE",fecha_salida:"ago 16",fecha_llegada:"ago 30"
        ,editFlightSelected: false,numero_vuelo_ida:'2',numero_vuelo_regreso:'1',consulta_condiciones_tarifa:false,
    },
    { es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
        informacion_tarifas: 'condiciones de tu tarifa',
    },
        descripcion: "Llega a passengers",target_page:"passenger",idioma:"es",pais:"CO", ciudad_origen: "BOG",ciudad_destino:"MDE",fecha_salida:"ago 16",fecha_llegada:"ago 30"
        ,editFlightSelected: false,numero_vuelo_ida:'2',numero_vuelo_regreso:'2',consulta_condiciones_tarifa:false,
    },
    { es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
        informacion_tarifas: 'condiciones de tu tarifa',
    },
        descripcion: "ingresa a services",target_page:"service",idioma:"es",pais:"CO", ciudad_origen: "BOG",ciudad_destino:"MDE",fecha_salida:"ago 16",fecha_llegada:"ago 30"
        ,editFlightSelected: false,numero_vuelo_ida:'2',numero_vuelo_regreso:'2',consulta_condiciones_tarifa:false,
    },
  ];