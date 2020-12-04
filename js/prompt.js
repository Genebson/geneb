const documentoDelUsuario = (prompt('¿Tenés DNI?') || '').toLowerCase();

function entraralbar() {
	if (documentoDelUsuario === 'si') {
	  let edadDelUsuario = Number(prompt('¿Qué edad tenés?'));
	  if (edadDelUsuario >= 18) {
	    alert('Bienvenido/a al bar');
	  } else {
	    alert('Lo siento, no tiene la edad suficiente para ingresar al bar');
	  }
	} else if (documentoDelUsuario === 'no') {
	  alert('Lo siento, no puede ingresar al bar');
	} else {
	  alert('No entendí tu respuesta');
	}
};
entraralbar();
