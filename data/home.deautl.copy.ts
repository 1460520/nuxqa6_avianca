import type { copysType, Lang } from "../types/copy.type";

const copys: copysType = {
    idioma: 'es' as Lang,
    pais: 'CO',
    fecha_salida: 'ago 16',
    fecha_llegada: 'sep 12',
    ciudad_origen: 'BOG',
    ciudad_destino: 'MDE',
    es: {
        origen: 'Origen',
        destino: 'Hacia',
        buscar: 'Buscar',
        vuelta: 'Vuelta',
        pagar: 'Ir a pagar',
    },
    en: {
        origen: 'Origin',
        destino: 'Destination',
        buscar: 'Search',
        vuelta: 'Return',
        pagar: 'Go to payment',
    },
    pt: {
        origen: 'Origem',
        destino: 'Destino',
        buscar: 'Buscar voos',
        vuelta: 'Regresso',
        pagar: 'Vá pagar',
    },
    fr: {
        origen: 'Origen',
        destino: 'Destination',
        buscar: 'Rechercher',
        vuelta: 'Retour',
        pagar: ' Continuer',
    },
    getLang: () => copys.idioma
};

export { copys };