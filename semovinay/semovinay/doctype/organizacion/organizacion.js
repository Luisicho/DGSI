// Copyright (c) 2022, DGSTI / SAF and contributors
// For license information, please see license.txt
var regex_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]{1,50}$/;
var regex_telefono = /^\(?(?:(\d{2,3})\)?[-. ]?)?(\d{2,3})[-. ]?(\d{4})$/;
var regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
var regex_numeros_letras = /^[a-zA-Z0-9&\'".\-]*$/;
var titulo = "Error de captura"
frappe.ui.form.on('Organizacion', {
    validate: function(frm) { 
        if ((frm.doc.nombre_organizacion) && !(regex_numeros_letras.test(frm.doc.nombre_organizacion))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El nombre de la organizacion es incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.presidente) && !(regex_letras.test(frm.doc.presidente))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El presidente es incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.secretario) && !(regex_letras.test(frm.doc.secretario))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El secretario es incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.telefono) && !(regex_telefono.test(frm.doc.telefono))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El formato del teléfono son 111-111-1111."
			});
			frm.validated = false;
		}
        if ((frm.doc.nombre_vialidad) && !(regex_numeros_letras.test(frm.doc.nombre_vialidad))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El nombre de la vialidad es incorrecto."
			});
			frm.validated = false;
		}
		if ((frm.doc.correo_electronico) && !(regex_email.test(frm.doc.correo_electronico))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El e-mail es incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.nombre_vialidad) && !(regex_numeros_letras.test(frm.doc.nombre_vialidad))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El nombre vialidad incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.numero_exterior) && !(regex_numeros_letras.test(frm.doc.numero_exterior))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El numero exterior incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.numero_interior) && !(regex_numeros_letras.test(frm.doc.numero_interior))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El numero interior incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.inciso) && !(regex_numeros_letras.test(frm.doc.inciso))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El inciso incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.entre_calle_1) && !(regex_numeros_letras.test(frm.doc.entre_calle_1))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El entre calle incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.entre_calle_2) && !(regex_numeros_letras.test(frm.doc.entre_calle_2))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El entre calle incorrecto."
			});
			frm.validated = false;
		}
        if ((frm.doc.referencia) && !(regex_numeros_letras.test(frm.doc.referencia))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El referencia incorrecto."
			});
			frm.validated = false;
		}
    },
    nombre_organizacion: function(frm) {
		frm.set_value("nombre_organizacion", frm.doc.nombre_organizacion.toUpperCase());
		frm.set_df_property("nombre_organizacion", "invalid", !(regex_numeros_letras.test(frm.doc.nombre_organizacion)));
		frm.get_field("nombre_organizacion").set_invalid();
	},
    presidente: function(frm) {
		frm.set_value("presidente", frm.doc.presidente.toUpperCase());
		frm.set_df_property("presidente", "invalid", !(regex_letras.test(frm.doc.presidente)));
		frm.get_field("presidente").set_invalid();
	},
	secretario: function(frm) {
		frm.set_value("secretario", frm.doc.secretario.toUpperCase());
		frm.set_df_property("secretario", "invalid", !(regex_letras.test(frm.doc.secretario)));
		frm.get_field("secretario").set_invalid();
	},
    telefono: function(frm) {
		frm.set_value("telefono", frm.doc.telefono.toUpperCase());
		frm.set_df_property("telefono", "invalid", !(regex_telefono.test(frm.doc.telefono)));
		frm.get_field("telefono").set_invalid();
	},
    correo_electronico: function(frm) {
		frm.set_df_property("correo_electronico", "invalid", !(regex_email.test(frm.doc.correo_electronico)));
		frm.get_field("correo_electronico").set_invalid();
	},	
    nombre_vialidad: function(frm) {
		frm.set_value("nombre_vialidad", frm.doc.nombre_vialidad.toUpperCase());
		frm.set_df_property("nombre_vialidad", "invalid", !(regex_numeros_letras.test(frm.doc.nombre_vialidad)));
		frm.get_field("nombre_vialidad").set_invalid();
	},
    numero_exterior: function(frm) {
		frm.set_value("numero_exterior", frm.doc.numero_exterior.toUpperCase());
		frm.set_df_property("numero_exterior", "invalid", !(regex_numeros_letras.test(frm.doc.numero_exterior)));
		frm.get_field("numero_exterior").set_invalid();
	},
    numero_interior: function(frm) {
		frm.set_value("numero_interior", frm.doc.numero_interior.toUpperCase());
		frm.set_df_property("numero_interior", "invalid", !(regex_numeros_letras.test(frm.doc.numero_interior)));
		frm.get_field("numero_interior").set_invalid();
	},
    inciso: function(frm) {
		frm.set_value("inciso", frm.doc.inciso.toUpperCase());
		frm.set_df_property("inciso", "invalid", !(regex_numeros_letras.test(frm.doc.inciso)));
		frm.get_field("inciso").set_invalid();
	},
    entre_calle_1: function(frm) {
		frm.set_value("entre_calle_1", frm.doc.entre_calle_1.toUpperCase());
		frm.set_df_property("entre_calle_1", "invalid", !(regex_numeros_letras.test(frm.doc.entre_calle_1)));
		frm.get_field("entre_calle_1").set_invalid();
	},
    entre_calle_2: function(frm) {
		frm.set_value("entre_calle_2", frm.doc.entre_calle_2.toUpperCase());
		frm.set_df_property("entre_calle_2", "invalid", !(regex_numeros_letras.test(frm.doc.entre_calle_2)));
		frm.get_field("entre_calle_2").set_invalid();
	},
    referencia: function(frm) {
		frm.set_value("referencia", frm.doc.referencia.toUpperCase());
		frm.set_df_property("referencia", "invalid", !(regex_numeros_letras.test(frm.doc.referencia)));
		frm.get_field("referencia").set_invalid();
	},
})
