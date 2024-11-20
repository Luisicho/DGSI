// Copyright (c) 2023, DGSTI / SAF and contributors
// For license information, please see license.txt

var regex_id_estado = /^\d{2}/;
var regex_nombreestado = /^[A-Za-z ]{1,30}$/;
var regex_abreviatura = /^[A-Za-z]{1,4}$/;

frappe.ui.form.on("Estado", {
    id_estado: function(frm) {
		// Marcar como erróneo el campo 'clave de estado' si es inválido
		frm.set_df_property("id_estado", "invalid", !(regex_id_estado.test(frm.doc.id_estado)));
		frm.get_field("id_estado").set_invalid();
	},	
    nombre_estado: function(frm) {
		// Marcar como erróneo el campo 'nombre del estado' si es inválido
		frm.set_df_property("nombre_estado", "invalid", !(regex_nombreestado.test(frm.doc.nombre_estado)));
		frm.get_field("nombre_estado").set_invalid();
	},	
    abreviatura: function(frm) {
		// Marcar como erróneo el campo 'abreviatura' si es inválido
		frm.set_df_property("abreviatura", "invalid", !(regex_abreviatura.test(frm.doc.abreviatura)));
		frm.get_field("abreviatura").set_invalid();
	},

    validate: function(frm) {
		// Validar clave Estado	y es Obligatorio
		if (!(regex_id_estado.test(frm.doc.id_estado)) && (frm.doc.id_estado)) {
			frappe.throw({
				title: "Error de validación",
				indicator: "red",
				message: "El campo ingresado solo acepta dígitos. [Front]"
			});
			frm.validated = false;
		}

		// Validar Nombre Estado y es Obligatorio
		if (!(regex_nombreestado.test(frm.doc.nombre_estado)) &&  (frm.doc.nombre_estado)) {
			frappe.throw({
				title: "Error de validación",
				indicator: "red",
				message: "El campo nombre Estado solo acepta letras. [Front]" 
			});
			frm.validated = false;
		}


		// Validar Abreviatura
		if (!(regex_abreviatura.test(frm.doc.abreviatura)) &&  (frm.doc.abreviatura)) {
			frappe.throw({
				title: "Error de validación",
				indicator: "red",
				message: "El campo Abreviatura solo acepta letras. [Front]"
			});
			frm.validated = false;
		}
	

	}	

});
