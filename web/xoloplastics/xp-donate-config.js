/* Configuración de donativos (un clic).
 * Mientras un monto no tenga liga de pago, el botón "Donar" abre el formulario de contacto con el monto en la etiqueta.
 * Para conectar pagos, pega aquí la liga de pago (Stripe, Mercado Pago, etc.) de cada combinación:
 *   clave = <persona|empresa>-<mes|unico>-<monto>   por ejemplo: 'persona-mes-500'
 *   custom = liga para "Otro monto" por tipo y frecuencia, por ejemplo: 'persona-mes'
 */
window.XP_DONATE = {
  links: {
    // 'persona-mes-200': '', 'persona-mes-500': '', 'persona-mes-1000': '',
    // 'persona-unico-500': '', 'persona-unico-1000': '', 'persona-unico-2500': '',
    // 'empresa-mes-5000': '', 'empresa-mes-10000': '', 'empresa-mes-25000': '',
    // 'empresa-unico-10000': '', 'empresa-unico-25000': '', 'empresa-unico-50000': ''
  },
  custom: {
    // 'persona-mes': '', 'persona-unico': '', 'empresa-mes': '', 'empresa-unico': ''
  }
};
