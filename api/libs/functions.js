export function calcularFechasCuotas(cuotas, fechaInicial) {
  const fechasCuotas = [
    new Date(
      fechaInicial.getFullYear(),
      fechaInicial.getMonth(),
      fechaInicial.getDate() + 1
    ),
  ];

  for (let i = 1; i < cuotas; i++) {
    const fechaSiguiente = new Date(fechasCuotas[i - 1]);
    fechaSiguiente.setMonth(fechaSiguiente.getMonth() + 1);

    fechasCuotas.push(
      new Date(
        fechaSiguiente.getFullYear(),
        fechaSiguiente.getMonth(),
        fechaSiguiente.getDate() 
      )
    ); 
  }

  const fechasSinHora = fechasCuotas.map(
    (fecha) => fecha.toISOString().split("T")[0]
  );

  return fechasSinHora;
}
