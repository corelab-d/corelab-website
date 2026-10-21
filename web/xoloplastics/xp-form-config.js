// Configuración de los formularios de contacto del sitio.
// enabled:false -> el modal abre el correo del usuario con el mensaje listo (respaldo, no pierde contactos).
// enabled:true  -> envía por FormSubmit al primer correo de "to" y copia a los demás.
//                  La primera vez, FormSubmit manda un correo de activación al PRIMER correo de la lista:
//                  alguien con acceso a esa bandeja debe confirmarlo (si prefieres activar info@, ponlo primero).
window.XP_FORM = {
  enabled: false,
  to: ['xoloplastics@imaginalco.org', 'info@xoloplastics.com']
};
