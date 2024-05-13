export function calcularFechasCuotas(cuotas, fechaInicial) {
    const fechasCuotas = [new Date(fechaInicial.getFullYear(), fechaInicial.getMonth(), fechaInicial.getDate())]; // Inicializamos el array con la fecha inicial sin hora
    
    // Iteramos para calcular las fechas de las cuotas restantes
    for (let i = 1; i < cuotas; i++) {
        const fechaSiguiente = new Date(fechasCuotas[i - 1]);
        fechaSiguiente.setMonth(fechaSiguiente.getMonth() + 1); // Añadimos un mes a la fecha anterior
        
        // Convertimos las fechas a formato de cadena de texto con formato YYYY-MM-DD
 
        fechasCuotas.push(new Date(fechaSiguiente.getFullYear(), fechaSiguiente.getMonth(), fechaSiguiente.getDate())); // Añadimos la fecha sin hora al array
    }
    
      const fechasSinHora = fechasCuotas.map(fecha => fecha.toISOString().split('T')[0]);
    
    return fechasSinHora;
}