// Copyright (c) 2023, DGSTI / SAF and contributors
// For license information, please see license.txt
var regex_numero_economico = /(^[a-zA-Z]{3,6}-[\d]{1,4}$)|(^[a-zA-Z]{3,6}[\d]{1,4}$)/;
var regex_numeros_letras_guiones = /^[a-zA-Z0-9\-]*$/
var regex_numeros_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. \d]*$/
var regex_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]*$/
var regex_numeros = /^\d*$/
var titulo_error = "Error de validación"
var today = new Date();
var year = today.getFullYear();
frappe.ui.form.on('Permiso', {
	onload: function(frm) {
		frm.set_query('municipio_asignado', () => {
			return {
				filters: { id_estado: "18"}
			}
		})
		/*if (frm.is_new()) {
			frm.set_intro("<b>Nota:</b> El número económico del nuevo permiso será generado automáticamente por el sistema durante el guardado.", "green");
		}*/
		/*if (!frm.is_new()){
			frm.set_query('gestor', () => {
				return {
					filters: { parent: frm.doc.organizacion, activo: '1' }
				}
			})
		}*/
	},
	validate: function(frm) {
		if ((frm.doc.numero_economico) && !(regex_numero_economico.test(frm.doc.numero_economico))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El número económico debe contener de 3 a 6 letras, un guión y de 1 a 4 números"
			});
			frm.validated = false;
		}
		if ((frm.doc.numero_economico_anterior) && !(regex_numero_economico.test(frm.doc.numero_economico_anterior))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El número económico anterior debe contener de 3 a 6 letras, un guión y de 1 a 4 números"
			});
			frm.validated = false;
		}
		if ((frm.doc.año_ultimo_refrendo) && ((frm.doc.año_ultimo_refrendo > year) || (frm.doc.año_ultimo_refrendo < (year-5)))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El año de ultimo refrendo no puede ser mayor ni menor a 5 años del actual"
			});
			frm.validated = false;
		}
		if ((frm.doc.fecha_ultimo_movimiento) && (frm.doc.fecha_ultimo_movimiento > frappe.datetime.get_today())){
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "La fecha de ultimo movimiento no puede ser mayor a la fecha actual."
			});
			frm.validated = false;
		}
		if ((frm.doc.numero_engomado) && !(regex_numeros.test(frm.doc.numero_engomado))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El número de engomado es numérico"
			});
			frm.validated = false;
		}
		if ( (frm.doc.gestor_propietario) && !(regex_letras.test(frm.doc.gestor_propietario))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El gestor propietario no es valido"
			});
			frm.validated = false;
		}
	},
	refresh: function(frm) {
		if (!frm.is_new()){
			frm.set_df_property('numero_economico', 'hidden', 0);
			frm.set_df_property('numero_economico', 'read_only', 1);
		}
		frm.toggle_display("sitio", frm.doc.categoria_modalidad == "SITIO");
		frm.toggle_display("ruta", frm.doc.categoria_modalidad == "RUTA");
		frm.toggle_display("organizacion", frm.doc.pertenece_organizacion);
		frm.set_df_property("presidente", "hidden", !frm.doc.pertenece_organizacion);
		frm.toggle_display("gestor_propietario", !frm.doc.pertenece_organizacion);
	},

	modalidad: function(frm) {
		frm.toggle_display("sitio", frm.doc.categoria_modalidad == "SITIO");
		frm.toggle_display("ruta", frm.doc.categoria_modalidad == "RUTA");
		if (frm.doc.clasificacion_permiso){
			frm.set_query('vehiculo', () => {
				return {
					filters: {clasificacion: frm.doc.clasificacion_permiso}
				}
			})
		}	
		else{
			frm.set_query('vehiculo', () => {
				return {}
			})
		}
	},

	pertenece_organizacion: function(frm) {
		frm.toggle_display("organizacion", frm.doc.pertenece_organizacion);
		frm.set_df_property("presidente", "hidden", !frm.doc.pertenece_organizacion);
		frm.toggle_display("gestor_propietario", !frm.doc.pertenece_organizacion);
	},
	numero_economico: function(frm) {
		frm.set_df_property("numero_economico", "invalid", !(regex_numero_economico.test(frm.doc.numero_economico)));     
		frm.get_field("numero_economico").set_invalid();
		frm.set_value("numero_economico", frm.doc.numero_economico.toUpperCase());
	},

	numero_economico_anterior: function(frm) {
		frm.set_df_property("numero_economico_anterior", "invalid", !(regex_numero_economico.test(frm.doc.numero_economico_anterior)));     
		frm.get_field("numero_economico_anterior").set_invalid();
		frm.set_value("numero_economico_anterior", frm.doc.numero_economico_anterior.toUpperCase());
	},
	numero_engomado: function(frm) {
		frm.set_df_property("numero_engomado", "invalid", !(regex_numeros.test(frm.doc.numero_engomado)));     
		frm.get_field("numero_engomado").set_invalid();
		frm.set_value("numero_engomado", frm.doc.numero_engomado.toUpperCase());
	},
	gestor_propietario:function(frm){
		frm.set_df_property("gestor_propietario", "invalid", !(regex_numeros_letras.test(frm.doc.gestor_propietario)));     
		frm.get_field("gestor_propietario").set_invalid();
		frm.set_value("gestor_propietario", frm.doc.gestor_propietario.toUpperCase());
	}

/*	organizacion: function(frm){
		frm.set_value("gestor", "");
		frm.set_query('gestor', () => {
			return {
				filters: { parent: frm.doc.organizacion, activo: '1' }
			}
		})
	},*/

	/*before_save: function(frm) {
		// Definir nuevo número económico para el permiso
		// TODO: esto no pasa antes de las validaciones! (p.ej. si faltan campos obligatorios)
		if (frm.is_new() && !frm.doc.numero_economico) {
			frappe.call({
				method: "movilidad_nayarit.servicio_público.doctype.permiso.api.get_nuevo_numero_economico",
				args: {
					municipio: frm.doc.municipio_asignado,
					modalidad: frm.doc.modalidad
				},
				freeze: true,
				callback: (r) => {
					console.log(r);
					frm.set_value("numero_economico", r.message.numero_economico);
				}
			})
		}
	}*/
});


