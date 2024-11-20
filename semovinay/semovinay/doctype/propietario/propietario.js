// Copyright (c) 2023, DGSTI / SAF and contributors
// For license information, please see license.txt
var regex_curp = /^([A-Za-z][AaEeIiOoUuXx][A-Za-z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HXM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
var regex_rfc_fisica = /^$|^([A-Za-zÑñ&]{4})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))(([A-Za-z\d]{2})([Aa\d]))?$/;
var regex_rfc_moral= /^$|^([A-Za-zÑñ&]{3})(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]))(([A-Za-z\d]{2})([Aa\d]))?$/;
var regex_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]*$/;
var regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var regex_telefono = /^\d{10}/;
var regex_extensiones_telefono = /^\d{3,5}(,\s*\d{3,5})*$/;
var regex_numeros = /^\d*$/;
var regex_numeros_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. \d]*$/;
var regex_numeros_letras_esp = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. \d][\w.\-]*$/;
var titulo = "Error de validación"
//var prev_route = ""
frappe.ui.form.on('Propietario', {	
	
	onload: function(frm) {		
		frm.trigger('habilitarPersona')	
		 // Obtener la ruta de la página anterior
		 //prev_route = frappe.get_prev_route();	 
		
	 },

	 refresh:function(frm){
		frm.set_df_property('rfc', 'hidden', 0);
		if (!frm.is_new()){
			frm.set_df_property('rfc', 'read_only', 1);
		}
	 },
	/* after_save: function(frm) {
        // Después de guardar el documento, cerrar el documento actual
		if (prev_route && prev_route[0] === 'Form') {
			// El documento fue llamado desde otro formulario
			console.log("El documento fue llamado desde otro formulario");
			frappe.ui.form.close()
		}
    },*/
	 validate: function(frm) { 
		if ((frm.doc.correo_electronico) && !(regex_email.test(frm.doc.correo_electronico))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El e-mail es incorrecto."
			});
			frm.validated = false;
		}
		// Validar CURP	
		if ((frm.doc.curp) && !(regex_curp.test(frm.doc.curp)) && (frm.doc.tipo_persona == "FÍSICA")) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor ingresado para la CURP es incorrecto."
			});
			frm.validated = false;
		}
		// Validar RFC Persona Física
		if (!(regex_rfc_fisica.test(frm.doc.rfc)) && (frm.doc.tipo_persona == "FÍSICA")  ) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor ingresado para el RFC es incorrecto."
			});
			frm.validated = false;
		}
		// Validar RFC Persona Moral	
		if (!(regex_rfc_moral.test(frm.doc.rfc)) && (frm.doc.tipo_persona == "MORAL")  ) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor ingresado para el RFC es incorrecto."
			});
			frm.validated = false;
		}
		if (!(regex_letras.test(frm.doc.nombre))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor ingresado para el nombre es incorrecto."
			});
			frm.validated = false;
		}
		if (!(regex_letras.test(frm.doc.apellido_paterno))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor ingresado para el apellido paterno es incorrecto."
			});
			frm.validated = false;
		}
		if (!(regex_letras.test(frm.doc.apellido_materno))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor ingresado para el apellido materno es incorrecto."
			});
			frm.validated = false;
		}
	},

	 tipo_persona: function(frm){
		frm.trigger('habilitarPersona')
	},

	rfc: function(frm) {
		// Marcar como erróneo el campo 'RFC' si es inválido
		frm.set_value("rfc", frm.doc.rfc.toUpperCase());
		if (frm.doc.tipo_persona == "FÍSICA"){
			frm.set_df_property("rfc", "invalid", !(regex_rfc_fisica.test(frm.doc.rfc)));
			frm.get_field("rfc").set_invalid();
			/*nac = frm.doc.fecha_nacimiento.substring(2,4) + frm.doc.fecha_nacimiento.substring(5,7) +frm.doc.fecha_nacimiento.substring(8,10)
			if (nac != frm.doc.rfc.substring(4,10)){
				frm.get_field("rfc").set_invalid();
			}*/
		}
		// Marcar como erróneo el campo 'RFC' si es inválido
		if (frm.doc.tipo_persona == "MORAL"){
			frm.set_df_property("rfc", "invalid", !(regex_rfc_moral(frm.doc.rfc)));
			frm.get_field("rfc").set_invalid();
		}
	},
	correo_electronico: function(frm) {
		frm.set_df_property("correo_electronico", "invalid", !(regex_email.test(frm.doc.correo_electronico)));
		frm.get_field("correo_electronico").set_invalid();
	},		
	curp: function(frm) {
		frm.set_value("curp", frm.doc.curp.toUpperCase());
		// Marcar como erróneo el campo 'CURP' si es inválido
		frm.set_df_property("curp", "invalid", !(regex_curp.test(frm.doc.curp)));
		frm.get_field("curp").set_invalid();
	},		 

	nombre: function(frm) {
		frm.set_value("nombre", frm.doc.nombre.toUpperCase());
		frm.set_df_property("nombre", "invalid", !(regex_numeros_letras.test(frm.doc.nombre)));
		frm.get_field("nombre").set_invalid();
	},		 

	apellido_paterno: function(frm) {
		frm.set_value("apellido_paterno", frm.doc.apellido_paterno.toUpperCase());
		// Marcar como erróneo el campo 'apellido paterno' si es inválido
		frm.set_df_property("apellido_paterno", "invalid", !(regex_numeros_letras.test(frm.doc.apellido_paterno)));
		frm.get_field("apellido_paterno").set_invalid();
	},		 

	apellido_materno: function(frm) {
		frm.set_value("apellido_materno", frm.doc.apellido_materno.toUpperCase());
		frm.set_df_property("apellido_materno", "invalid", !(regex_numeros_letras.test(frm.doc.apellido_materno)));
		frm.get_field("apellido_materno").set_invalid();
	},
	clave_identificacion: function(frm) {
		frm.set_value("clave_identificacion", frm.doc.clave_identificacion.toUpperCase());
	},
	razon_social: function(frm) {
		frm.set_value("razon_social", frm.doc.razon_social.toUpperCase());
		frm.set_df_property("razon_social", "invalid", !(regex_numeros_letras.test(frm.doc.razon_social)));
		frm.get_field("razon_social").set_invalid();
		
	},
	telefono_fijo: function(frm) {
		frm.set_df_property("telefono_fijo", "invalid", !(regex_telefono.test(frm.doc.telefono_fijo)));
		frm.get_field("telefono_fijo").set_invalid();
	},
	extension: function(frm) {
		frm.set_df_property("extension", "invalid", !(regex_extensiones_telefono.test(frm.doc.extension)));
		frm.get_field("extension").set_invalid();
	},
	telefono_movil: function(frm) {
		// Marcar como erróneo el campo 'apellido materno' si es inválido
		frm.set_df_property("telefono_movil", "invalid", !(regex_telefono.test(frm.doc.telefono_movil)));
		frm.get_field("telefono_movil").set_invalid();
	},
	nombre_vialidad: function(frm) {
		frm.set_value("nombre_vialidad", frm.doc.nombre_vialidad.toUpperCase());
		frm.set_df_property("nombre_vialidad", "invalid", !(regex_numeros_letras_esp.test(frm.doc.nombre_vialidad)));
		frm.get_field("nombre_vialidad").set_invalid();
	},	
	inciso: function(frm) {
		frm.set_value("inciso", frm.doc.inciso.toUpperCase());
		frm.set_df_property("inciso", "invalid", !(regex_letras.test(frm.doc.inciso)));
		frm.get_field("inciso").set_invalid();
	},
	numero_exterior: function(frm) {
		frm.set_value("numero_exterior", frm.doc.numero_exterior.toUpperCase());
		frm.set_df_property("numero_exterior", "invalid", !(regex_numeros.test(frm.doc.numero_exterior)));
		frm.get_field("numero_exterior").set_invalid();
	},
	numero_interior: function(frm) {
		frm.set_df_property("numero_interior", "invalid", !(regex_numeros.test(frm.doc.numero_interior)));
		frm.get_field("numero_interior").set_invalid();
	},
	entre_calle1: function(frm) {
		frm.set_value("entre_calle1", frm.doc.entre_calle1.toUpperCase());
	},
	entre_calle2: function(frm) {
		frm.set_value("entre_calle2", frm.doc.entre_calle2.toUpperCase());
	},
	referencia: function(frm) {
		frm.set_value("referencia", frm.doc.referencia.toUpperCase());
	},

	habilitarPersona(frm) {		
		if (frm.doc.tipo_persona == "FÍSICA"){// Mostrar campos persona física
			frm.set_df_property("representante", "hidden", 1);
			frm.set_df_property("curp", "hidden", 0);
			frm.set_df_property("genero", "hidden", 0);	
			frm.set_df_property('razon_social', 'reqd', 0);
			frm.set_df_property("razon_social", "hidden", 1);
			frm.set_df_property('tipo_identificacion', 'options', ['CREDENCIAL INE','PASAPORTE', 'CEDULA PROFESIONAL'])	;
			if (frm.is_new()) {
				frm.set_value("tipo_identificacion", "CREDENCIAL INE");
			}
		}
		else{// Mostrar campos persona moral
			frm.set_df_property("representante", "hidden", 0);
			frm.set_df_property("curp", "hidden", 1);
			frm.set_df_property("genero", "hidden", 1);
			frm.set_df_property('razon_social', 'reqd', 1)
			frm.set_df_property("razon_social", "hidden", 0);
			frm.set_df_property('tipo_identificacion', 'options', ['ACTA CONSTITUTIVA/INE']);
			if (frm.is_new()) {
				frm.set_value("tipo_identificacion", "ACTA CONSTITUTIVA/INE");	
			}
		}
	}
});

