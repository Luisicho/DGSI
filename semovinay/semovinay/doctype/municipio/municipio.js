// Copyright (c) 2023, DGSTI / SAF and contributors
// For license information, please see license.txt

var regex_id_municipio = /^\d{3}/;
var regex_nombremunicipio = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]{1,50}$/;


 frappe.ui.form.on("Municipio", {
     id_municipio: function(frm) {
		// Marcar como erróneo el campo 'clave de municipio' si es inválido
		frm.set_df_property("id_municipio", "invalid", !(regex_id_municipio.test(frm.doc.id_municipio)));
		frm.get_field("id_municipio").set_invalid();
	},	
    nombre_municipio: function(frm) {
		// Marcar como erróneo el campo 'nombre del municipio' si es inválido
		frm.set_df_property("nombre_municipio", "invalid", !(regex_nombremunicipio.test(frm.doc.nombre_municipio)));
		frm.get_field("nombre_municipio").set_invalid();
	},
    
    validate: function(frm) {
		// Validar que seleccione un Estado
		if (!(frm.doc.id_estado)) {
			frappe.throw({
				title: "Error de validación",
				indicator: "red",
				message: "Selecciona un Estado. [Front]"
			});
			frm.validated = false;
		}
        // Validar Clave Municipio
		if (!(regex_id_municipio.test(frm.doc.id_municipio)) && (frm.doc.id_municipio)) {
			frappe.throw({
				title: "Error de validación",
				indicator: "red",
				message: "El campo clave Municipio solo acepta dígitos y hasta 3 posiciones. [Front]"
			});
			frm.validated = false;
		}

		// Validar Nombre Municipio 
		if (!(regex_nombremunicipio.test(frm.doc.nombre_municipio)) && (frm.doc.nombre_municipio)) {
			frappe.throw({
				title: "Error de validación",
				indicator: "red",
				message: "El campo nombre Municipio solo acepta letras y hasta 50 caracteres. [Front]" 
			});
			frm.validated = false;
		}
		

	}	

 });
