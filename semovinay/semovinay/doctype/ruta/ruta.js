// Copyright (c) 2022, DGSTI / SAF and contributors
// For license information, please see license.txt

frappe.ui.form.on('Ruta', {
	onload: function(frm) {
		frm.set_query('municipio', () => {
			return {
				filters: {
					id_estado: 18,
				}
			}
		});
	},

	validate: function(frm) {
		// Validar el número máximo de puntos de ruta
		if (frm.doc.puntos_ruta.length > 6) {
			frappe.throw("Se permite un máximo de 6 puntos de ruta.");
		}

		// Validar que solo un punto de ruta esté marcado como "final"
		let finales = frm.doc.puntos_ruta.filter(x => x.destino_final === 1);
		if (finales.length > 1) {
			frappe.throw("Solo se puede tener un punto de destino final en la ruta.");
		}
	}
});

frappe.ui.form.on("Punto de ruta", "fecha", function(frm, cdt, cdn) {
	let item = locals[cdt][cdn];
		
	if (item.fecha > frappe.datetime.nowdate()) {
		item.fecha = null;
		frm.refresh_field('puntos_ruta');
		frappe.throw("No se puede definir una fecha mayor a la actual para los puntos de ruta.");
	}
});

frappe.ui.form.on("Punto de ruta", "mapa", function(frm, cdt, cdn) {
	let item = locals[cdt][cdn];

	//console.log(JSON.parse(frm.doc.ubicacion));
	let mapdata = JSON.parse(item.mapa).features[0];
	//console.log(mapdata.geometry.type);
	if (mapdata && mapdata.geometry.type=='Point') {
		let lat = mapdata.geometry.coordinates[1];
		let lon = mapdata.geometry.coordinates[0];
		console.log(lat, lon);

		// make an api call
		// Obtniendo la descrición del domicilio, p ej.  Calle Coahuila, San José de Mojarras, Santa María del Oro, Nayarit, 63840, México
		frappe.call({
			type: "GET",
			url : `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
			callback: function(r){
				console.log (r);
				//frm.set_value('domicilio', r.display_name);
				//frm.set_value()					
			}	
		})
	}
});