// Copyright (c) 2024, DGSTI / SAF and contributors
// For license information, please see license.txt
var regex_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]*$/;
var regex_curp = /^([A-Za-z][AaEeIiOoUuXx][A-Za-z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/;
var regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
var regex_numeros = /^\d*$/;
var regex_serie = /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;
//Acepta modelo de un rango del 2007 al 2024: Para el año actual (2023)
var regex_modelo = /^(200[5-9]|201[0-9]|202[0-4])$/;
//Acepta un rango de dígitos del 5 a 10 caractéres 
var regex_placa_automovil = /(^[1-9]{1}[0-9]{1}[-][0-9]{2}-M[D-J]{1}[A-Z]{1}$)|(^A-[0-9]{3}-MD[A-K]{1}$)/;
var regex_placa_camioneta = /(^[1-9]{1}[-][P-R]{1}[A-F]{1}[A-Z]{1}[-][1-9]{1}[0-9]{2}$)|(^[1-2]{1}-PFA-[0-9]{1}[1-9]{1}A$)/;
var regex_placa_omnibus = /^([1-7]{1}[3-4]{1}[0-9]{1}[-][0-9]{3}[-][P-R]{1}$)|(^A-7[3-4]{1}[0-4]{1}[0-9]{2}-P$)/;
var regex_numero_motor = /^([HECHO EN |hecho en ][a-zA-Z'\ \d\-]{5,40})$|[a-zA-Z\d\-]{5,25}|^[A-Z\d\-]{5,25}$/;
var regex_numero = /^\d{1,3}$/;
var regex_numeros_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü-\d]*$/
var regex_clave_documento = /^([A-Za-z\d]{1}[A-Za-z\d\-]{1,30})$/;
var regex_telefono = /^\d{10}/;
var regex_extensiones_telefono = /^\d{3,5}(,\s*\d{3,5})*$/
var today = new Date();
var year = today.getFullYear();
var titulo_error = "Error de validación";
function confirmarFirmas(frm) {
	return new Promise((r) => {
		frappe.confirm('¿Realmente desea marcar el documento como ' + frm.doc.status + '?',
		() => {
			// Sí. Continuar con el cambio dedel estado
			r(true);
		 },
		() =>  {
			// No. Cancelar cambio de estado
			r(false);
		 });
	});
}

function Refrendo(frm){
	// FORMATO UNICO
	frm.set_df_property("fecha", "read_only", 1);
	frm.set_df_property("tramite", "read_only", 1);
	
	//PROPIETARIO
	frm.set_df_property("rfc", "read_only", 1);
	frm.set_df_property("tipo_persona", "read_only", 1);
	frm.set_df_property("curp", "read_only", 0);
	frm.set_df_property("genero", "read_only", 0);
	frm.set_df_property("razon_social", "read_only", 1);
	frm.set_df_property("nombre_completo", "read_only", 1);
	frm.set_df_property("representante", "read_only", 1);
	if (frm.doc.tipo_persona = "MORAL"){
		frm.set_df_property("nombre", "read_only", 0);
		frm.set_df_property("apellido_paterno", "read_only", 0);
		frm.set_df_property("apellido_materno", "read_only", 0);
	}
	else{
		frm.set_df_property("nombre", "read_only", 1);
		frm.set_df_property("apellido_paterno", "read_only", 1);
		frm.set_df_property("apellido_materno", "read_only", 1);
	}
	frm.set_df_property("estatus", "read_only", 1);
	frm.set_df_property("correo_electronico", "read_only", 0);
	frm.set_df_property("telefono_fijo", "read_only", 0);
	frm.set_df_property("extension", "read_only", 0);
	frm.set_df_property("telefono_movil", "read_only", 0);
	frm.set_df_property("tipo_identificacion", "read_only", 0);
	frm.set_df_property("clave_identificacion", "read_only", 0);
	frm.set_df_property("tipo_vialidad", "read_only", 0);
	frm.set_df_property("nombre_vialidad", "read_only", 0);
	frm.set_df_property("numero_exterior", "read_only", 0);
	frm.set_df_property("numero_interior", "read_only", 0);
	frm.set_df_property("inciso", "read_only", 0);
	frm.set_df_property("entre_calle1", "read_only", 0);
	frm.set_df_property("entre_calle2", "read_only", 0);
	frm.set_df_property("referencia", "read_only", 0);
	frm.set_df_property("codigo_postal", "read_only", 0);

	//PERMISO
	frm.set_df_property("numero_economico", "read_only", 1);
	frm.set_df_property("numero_engomado", "read_only", 0);
	frm.set_df_property("permisionario_original", "read_only", 1);
	frm.set_df_property("vehiculo_original", "read_only", 1);
	frm.set_df_property("municipio_asignado", "read_only", 1);
	frm.set_df_property("modalidad", "read_only", 1);
	frm.set_df_property("modalidad", "hidden", 0);
	frm.set_df_property("categoria_modalidad", "read_only", 1);
	frm.set_df_property("categoria_modalidad", "hidden", 0);
	frm.set_df_property("sitio", "read_only", 1);
	frm.set_df_property("ruta", "read_only", 1);
	frm.set_df_property("pertenece_organizacion", "read_only", 0);
	frm.toggle_display("organizacion", frm.doc.pertenece_organizacion);
	frm.set_df_property("organizacion", "read_only", 0);
	frm.set_df_property("gestor_organizacion", "hidden", !frm.doc.pertenece_organizacion);
	frm.set_df_property("gestor_organizacion", "read_only", 0);
	frm.set_df_property("gestor_propietario", "hidden", frm.doc.pertenece_organizacion);
	frm.set_df_property("gestor_propietario", "read_only", 0);
	frm.set_df_property("presidente", "hidden", !frm.doc.pertenece_organizacion);
	frm.set_df_property("presidente", "read_only", 1);
	

	//VEHICULO
	frm.set_df_property("aseguradora", "read_only", 0);
	frm.set_df_property("poliza", "read_only", 0);
	frm.set_df_property("fecha_vigencia_inicial", "read_only", 0);
	frm.set_df_property("fecha_vigencia_final", "read_only", 0);
	frm.set_df_property("servicio", "read_only", 1);
	frm.set_df_property("serie", "read_only", 1);
	frm.set_df_property("modelo_anio", "read_only", 1);
	frm.set_df_property("placa", "read_only", 1);
	frm.set_df_property("clave_vehicular", "read_only", 1);
	frm.set_df_property("marca", "read_only", 1);
	frm.set_df_property("modelo", "read_only", 1);
	frm.set_df_property("version", "read_only", 1);
	frm.set_df_property("clase", "read_only", 1);
	frm.set_df_property("tipo", "read_only", 1);
	frm.set_df_property("combustible", "read_only", 1);
	frm.set_df_property("cilindros", "read_only", 1);
	frm.set_df_property("puertas", "read_only", 1);
	frm.set_df_property("color_principal", "read_only", 0);
	frm.set_df_property("color_secundario", "read_only", 0);
	frm.set_df_property("numero_pasajeros", "read_only", 1);
	frm.set_df_property("unidad_carga", "read_only", 1);
	frm.set_df_property("capacidad_carga", "read_only", 1);
	frm.set_df_property("numero_motor", "read_only", 1);
	frm.set_df_property("factura_cambio_motor", "read_only", 0);
	frm.set_df_property("nuevo_numero_motor", "read_only", 1);
	frm.set_df_property("folio_repuve", "read_only", 1);
	frm.set_df_property("fecha_folio_repuve", "read_only", 1);
	frm.set_df_property("tipo_documento", "read_only", 0);
	frm.set_df_property("fecha_documento", "read_only", 0);
	frm.set_df_property("clave_documento", "read_only", 0);
	frm.set_df_property("fecha_pago", "read_only", 0);
	frm.set_df_property("num_ult_recibo", "read_only", 0);
}

function cesionDeDerechos(frm){
	//HABILITADOS PROPIETARIO		
	frm.set_df_property("rfc",  "read_only", 0);
	frm.set_df_property("curp", "read_only", 0);
	frm.set_df_property("tipo_persona", "read_only", 0);
	frm.set_df_property("genero", "read_only", 0);
	frm.set_df_property("nombre", "read_only", 0);
	frm.set_df_property("apellido_paterno", "read_only", 0);
	frm.set_df_property("apellido_materno", "read_only", 0);
	frm.set_df_property("genero", "read_only", 0);
	frm.set_df_property("correo_electronico", "read_only", 0);
	frm.set_df_property("telefono_fijo", "read_only", 0);
	frm.set_df_property("extension", "read_only", 0);
	frm.set_df_property("telefono_movil", "read_only", 0);
	frm.set_df_property("tipo_identificacion", "read_only", 0);
	frm.set_df_property("clave_identificacion", "read_only", 0);
	frm.set_df_property("tipo_vialidad", "read_only", 0);
	frm.set_df_property("nombre_vialidad", "read_only", 0);
	frm.set_df_property("numero_exterior", "read_only", 0);
	frm.set_df_property("numero_interior", "read_only", 0);
	frm.set_df_property("inciso", "read_only", 0);
	frm.set_df_property("entre_calle1", "read_only", 0);
	frm.set_df_property("entre_calle2", "read_only", 0);
	frm.set_df_property("referencia", "read_only", 0);
	frm.set_df_property("codigo_postal", "read_only", 0);

	//HABILITADOS PERMISO
	frm.set_df_property("pertenece_organizacion", "read_only", 0);
	frm.set_df_property("gestor_propietario", "read_only", 0);
	frm.set_df_property("organizacion", "read_only", 0);
	frm.set_df_property("presidente", "read_only", 0);
	
	//HABILITADOS VEHICULO
	frm.set_df_property("aseguradora", "read_only", 0);
	frm.set_df_property("poliza", "read_only", 0);
	frm.set_df_property("fecha_vigencia_inicial", "read_only", 0);
	frm.set_df_property("fecha_vigencia_final", "read_only", 0);
	frm.set_df_property("tipo_documento", "read_only", 0);
	frm.set_df_property("clave_documento", "read_only", 0);
	frm.set_df_property("fecha_documento", "read_only", 0);
	frm.set_df_property("fecha_pago", "read_only", 0);
	frm.set_df_property("num_ult_recibo", "read_only", 0);
	//DESHABILITADOS VEHICULO
	frm.set_df_property("servicio", "read_only", 1);
	frm.set_df_property("serie", "read_only", 1);
	frm.set_df_property("serie", "hidden", 0);
	frm.set_df_property("modelo_anio", "read_only", 1);
	frm.set_df_property("modelo_anio", "hidden", 0);
	frm.set_df_property("placa", "read_only", 1);
	frm.set_df_property("clave_vehicular", "read_only", 1);
	frm.set_df_property("marca", "read_only", 1);
	frm.set_df_property("modelo", "read_only", 1);
	frm.set_df_property("version", "read_only", 1);
	frm.set_df_property("clase", "read_only", 1);
	frm.set_df_property("tipo", "read_only", 1);
	frm.set_df_property("combustible", "read_only", 1);
	frm.set_df_property("cilindros", "read_only", 1);
	frm.set_df_property("puertas", "read_only", 1);
	frm.set_df_property("color_principal", "read_only", 1);
	frm.set_df_property("color_secundario", "read_only", 1);
	frm.set_df_property("numero_pasajeros", "read_only", 1);
	frm.set_df_property("unidad_carga", "read_only", 1);
	frm.set_df_property("capacidad_carga", "read_only", 1);
	
	//DESHABILITADOS PERMISO
	frm.set_df_property("numero_economico", "read_only", 1);
	frm.set_df_property("numero_engomado", "read_only", 1);
	frm.set_df_property("municipio_asignado", "read_only", 1);
	frm.set_df_property("modalidad", "read_only", 1);
}

function cambioDeVehiculo(){
	//HABILITADOS PROPIETARIO		
	frm.set_df_property("rfc",  "read_only", 0);
	frm.set_df_property("curp", "read_only", 0);
	frm.set_df_property("tipo_persona", "read_only", 1);
	frm.set_df_property("genero", "read_only", 1);
	frm.set_df_property("nombre", "read_only", 1);
	frm.set_df_property("apellido_paterno", "read_only", 1);
	frm.set_df_property("apellido_materno", "read_only", 1);
	frm.set_df_property("genero", "read_only", 1);
	frm.set_df_property("correo_electronico", "read_only", 0);
	frm.set_df_property("telefono_fijo", "read_only", 0);
	frm.set_df_property("extension", "read_only", 0);
	frm.set_df_property("telefono_movil", "read_only", 0);
	frm.set_df_property("tipo_identificacion", "read_only", 0);
	frm.set_df_property("clave_identificacion", "read_only", 0);
	frm.set_df_property("tipo_vialidad", "read_only", 0);
	frm.set_df_property("nombre_vialidad", "read_only", 0);
	frm.set_df_property("numero_exterior", "read_only", 0);
	frm.set_df_property("numero_interior", "read_only", 0);
	frm.set_df_property("inciso", "read_only", 0);
	frm.set_df_property("entre_calle1", "read_only", 0);
	frm.set_df_property("entre_calle2", "read_only", 0);
	frm.set_df_property("referencia", "read_only", 0);
	frm.set_df_property("codigo_postal", "read_only", 0);

	//HABILITADOS PERMISO
	frm.set_df_property("pertenece_organizacion", "read_only", 1);
	frm.set_df_property("gestor_propietario", "read_only", 1);
	frm.set_df_property("organizacion", "read_only", 1);
	frm.set_df_property("presidente", "read_only", 1);
	frm.set_df_property("numero_economico", "read_only", 1);
	frm.set_df_property("numero_economico_anterior", "read_only", 1);
	frm.set_df_property("numero_engomado", "read_only", 1);
	frm.set_df_property("municipio_asignado", "read_only", 1);
	frm.set_df_property("modalidad", "read_only", 1);

	//HABILITADOS VEHICULO
	frm.set_df_property("aseguradora", "read_only", 0);
	frm.set_df_property("poliza", "read_only", 0);
	frm.set_df_property("fecha_vigencia_inicial", "read_only", 0);
	frm.set_df_property("fecha_vigencia_final", "read_only", 0);
	frm.set_df_property("tipo_documento", "read_only", 0);
	frm.set_df_property("clave_documento", "read_only", 0);
	frm.set_df_property("fecha_documento", "read_only", 0);
	frm.set_df_property("fecha_pago", "read_only", 0);
	frm.set_df_property("num_ult_recibo", "read_only", 0);
	frm.set_df_property("servicio", "read_only", 1);
	frm.set_df_property("serie", "read_only", 1);
	frm.set_df_property("modelo_anio", "read_only", 1);
	frm.set_df_property("placa", "read_only", 0);
	frm.set_df_property("clave_vehicular", "read_only", 1);
	frm.set_df_property("marca", "read_only", 1);
	frm.set_df_property("modelo", "read_only", 1);
	frm.set_df_property("version", "read_only", 1);
	frm.set_df_property("clase", "read_only", 1);
	frm.set_df_property("tipo", "read_only", 0);
	frm.set_df_property("combustible", "read_only", 0);
	frm.set_df_property("cilindros", "read_only", 0);
	frm.set_df_property("puertas", "read_only", 0);
	frm.set_df_property("color_principal", "read_only", 0);
	frm.set_df_property("color_secundario", "read_only", 0);
	frm.set_df_property("numero_pasajeros", "read_only", 0);
	frm.set_df_property("unidad_carga", "read_only", 0);
	frm.set_df_property("capacidad_carga", "read_only", 0);
}

frappe.ui.form.on('Tramite', {
	before_save: async (frm) =>{
		var res = await confirmarFirmas(frm);
		if (!res) {
			frappe.throw("Se cancela la acción de cambio de estado!");
		}
	},
	refresh:function(frm){
		if (!frm.is_new()){
			frm.trigger('EstadosTramite')
			frm.trigger('funcionesTramite')
			frm.trigger('habilitarPersona')
			frm.trigger('validaCambiomotor')		
		}
	},
	validate: function(frm) {
		console.log("Evento validate");
		// Validar CURP	
		if ((frm.doc.curp) && !(regex_curp.test(frm.doc.curp)) && (frm.doc.tipo_persona == "FÍSICA")) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor ingresado para la CURP es incorrecto."
			});
			frm.validated = false;
		}
		if (!(regex_letras.test(frm.doc.nombre))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor ingresado para el nombre es incorrecto."
			});
			frm.validated = false;
		}
		if (!(regex_letras.test(frm.doc.apellido_paterno))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor ingresado para el apellido paterno es incorrecto."
			});
			frm.validated = false;
		}
		if (!(regex_letras.test(frm.doc.apellido_materno))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor ingresado para el apellido materno es incorrecto."
			});
			frm.validated = false;
		}
		// Validar e-mail
		if ((frm.doc.correo_electronico) && !(regex_email.test(frm.doc.correo_electronico))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El e-mail es incorrecto."
			});
			frm.validated = false;
		}
		// Validar engomado
		if ((frm.doc.numero_engomado) && !(regex_numeros.test(frm.doc.numero_engomado))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El número de engomado es numérico"
			});
			frm.validated = false;
		}
		// Validar gestor propietario
		if ( (frm.doc.gestor_propietario) && !(regex_letras.test(frm.doc.gestor_propietario))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El gestor propietario no es valido"
			});
			frm.validated = false;
		}
		// Validar presidente (Nombre del representante de la organización)
		if ( (frm.doc.presidente) && !(regex_letras.test(frm.doc.presidente))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El presidente no es valido"
			});
			frm.validated = false;
		}
		// Validar poliza
		if ((frm.doc.poliza) && !(regex_numeros_letras.test(frm.doc.poliza))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor de polizas debe ser alfanumerico"
			});
			frm.validated = false;
		}
		// Validar vigencia de poliza
		if (frm.doc.fecha_vigencia_inicial > frappe.datetime.get_today()){
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "La fecha inicial no puede ser mayor a la fecha actual."
			});
			frm.validated = false;
		}
		if (frm.doc.fecha_vigencia_final <= frm.doc.fecha_vigencia_inicial) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "La fecha de final no puede ser menor a la fecha inicial."
			});
			frm.validated = false;
		}
		// Validar SERIE	
		if (!(regex_serie.test(frm.doc.serie)) && (frm.doc.regex_serie)) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor de la serie es incorrecto"
			});
			frm.validated = false;
		}
		if ((frm.doc.numero_pasajeros) && !(regex_numero.test(frm.doc.numero_pasajeros))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor del número de pasajeros es incorrecto"
			});
			frm.validated = false;
		}
		if ((frm.doc.capacidad_carga) && !(regex_numero.test(frm.doc.capacidad_carga))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor de capacidad de carga es incorrecto"
			});
			frm.validated = false;
		}
		if ((frm.doc.numero_motor) && !(regex_numero_motor.test(frm.doc.numero_motor))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El valor del número motor es incorrecto"
			});
			frm.validated = false;
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
		frm.set_df_property("nombre", "invalid", !(regex_letras.test(frm.doc.nombre)));
		frm.get_field("nombre").set_invalid();
	},		 

	apellido_paterno: function(frm) {
		frm.set_value("apellido_paterno", frm.doc.apellido_paterno.toUpperCase());
		// Marcar como erróneo el campo 'apellido paterno' si es inválido
		frm.set_df_property("apellido_paterno", "invalid", !(regex_letras.test(frm.doc.apellido_paterno)));
		frm.get_field("apellido_paterno").set_invalid();
	},		 

	apellido_materno: function(frm) {
		frm.set_value("apellido_materno", frm.doc.apellido_materno.toUpperCase());
		frm.set_df_property("apellido_materno", "invalid", !(regex_letras.test(frm.doc.apellido_materno)));
		frm.get_field("apellido_materno").set_invalid();
	},
	tipo_persona: function(frm){
		frm.trigger('habilitarPersona')
	},
	telefono_fijo: function(frm) {
		frm.set_df_property("telefono_fijo", "invalid", !(regex_telefono.test(frm.doc.telefono_fijo)));
		frm.get_field("telefono_fijo").set_invalid();
	},
	clave_identificacion: function(frm) {
		frm.set_value("clave_identificacion", frm.doc.clave_identificacion.toUpperCase());
	},
	razon_social: function(frm) {
		frm.set_value("razon_social", frm.doc.razon_social.toUpperCase());
	},
	extension: function(frm) {
		frm.set_df_property("extension", "invalid", !(regex_extensiones_telefono.test(frm.doc.extension)));
		frm.get_field("extension").set_invalid();
	},
	telefono_movil: function(frm) {
		frm.set_df_property("telefono_movil", "invalid", !(regex_telefono.test(frm.doc.telefono_movil)));
		frm.get_field("telefono_movil").set_invalid();
	},
	nombre_vialidad: function(frm) {
		frm.set_value("nombre_vialidad", frm.doc.nombre_vialidad.toUpperCase());
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
	numero_engomado: function(frm) {
		frm.set_df_property("numero_engomado", "invalid", !(regex_numeros.test(frm.doc.numero_engomado)));     
		frm.get_field("numero_engomado").set_invalid();
		frm.set_value("numero_engomado", frm.doc.numero_engomado.toUpperCase());
	},
	pertenece_organizacion: function(frm) {
		frm.set_df_property("organizacion", "hidden", !frm.doc.pertenece_organizacion);
		frm.set_df_property("presidente", "hidden", !frm.doc.pertenece_organizacion);
		frm.set_df_property("gestor_organizacion", "hidden", !frm.doc.pertenece_organizacion);
		frm.set_df_property("gestor_propietario", "hidden", frm.doc.pertenece_organizacion);
	},
	gestor_propietario:function(frm){
		frm.set_df_property("gestor_propietario", "invalid", !(regex_numeros_letras.test(frm.doc.gestor_propietario)));     
		frm.get_field("gestor_propietario").set_invalid();
		frm.set_value("gestor_propietario", frm.doc.gestor_propietario.toUpperCase());
	},
	presidente:function(frm){
		frm.set_df_property("presidente", "invalid", !(regex_numeros_letras.test(frm.doc.presidente)));     
		frm.get_field("presidente").set_invalid();
		frm.set_value("presidente", frm.doc.presidente.toUpperCase());
	},
	serie: function(frm) {
		// Marcar como erróneo el campo 'serie' si es inválido
		frm.set_df_property("serie", "invalid", !(regex_serie.test(frm.doc.serie)));
		frm.get_field("serie").set_invalid();
		frm.set_value("serie", frm.doc.serie.toUpperCase());
		if (frm.doc.serie.charAt(9)){
			frappe.db.get_value('Vin', frm.doc.serie.charAt(9), 'modelo_anio')
			.then(d => {
				frm.set_value("modelo_anio", d.message.modelo_anio);
			});
		}
		else{
			frm.set_value("modelo_anio", null);
		}
	},
	modelo_anio: function(frm) {
		frm.set_df_property("modelo_anio", "invalid", !(regex_modelo.test(frm.doc.modelo_anio)));     
		frm.get_field("modelo_anio").set_invalid(); 
	},
	placa: function(frm){
		frm.set_value("placa", frm.doc.placa.toUpperCase());
		if (frm.doc.placa){
			if (frm.doc.clase=="AUTOMÓVIL"){
				frm.set_df_property("placa", "invalid", !(regex_placa_automovil.test(frm.doc.placa)));     	
				frm.get_field("placa").set_invalid(); 					
			}
			if (frm.doc.clase=="CAMIÓN"){
				frm.set_df_property("placa", "invalid", !(regex_placa_camioneta.test(frm.doc.placa)));     	
				frm.get_field("placa").set_invalid(); 	
						
			}
			if (frm.doc.clase=="MICROBUS"){
				frm.set_df_property("placa", "invalid", !(regex_placa_omnibus.test(frm.doc.placa)));     	
				frm.get_field("placa").set_invalid(); 	
			}	
		}
	},
	numero_motor: function(frm){
		frm.set_value("numero_motor", frm.doc.numero_motor.toUpperCase());
		if(frm.doc.numero_motor){
			frm.set_df_property("numero_motor", "invalid", !(regex_numero_motor.test(frm.doc.numero_motor)));     	
			frm.get_field("numero_motor").set_invalid(); 			
		}	
	},
	nuevo_numero_motor: function(frm){
		frm.set_value("nuevo_numero_motor", frm.doc.nuevo_numero_motor.toUpperCase());
		if(frm.doc.nuevo_numero_motor){
			frm.set_df_property("nuevo_numero_motor", "invalid", !(regex_numero_motor.test(frm.doc.nuevo_numero_motor)));     	
			frm.get_field("nuevo_numero_motor").set_invalid(); 			
		}	
	},
	factura_cambio_motor: function(frm){
		frm.trigger('validaCambiomotor')	
	},
	folio_repuve: function(frm){
		if(frm.doc.folio_repuve){
			frm.set_df_property("folio_repuve", "invalid", !(regex_numero.test(frm.doc.folio_repuve)));     	
			frm.get_field("folio_repuve").set_invalid(); 			
		}	
	},
	clave_documento: function(frm){
		if(frm.doc.clave_documento){
			frm.set_value("clave_documento", frm.doc.clave_documento.toUpperCase());
			frm.set_df_property("clave_documento", "invalid", !(regex_clave_documento.test(frm.doc.clave_documento)));     	
			frm.get_field("clave_documento").set_invalid(); 			
		}	
	},
	poliza: function(frm){
		if(frm.doc.poliza){
			frm.set_value("poliza", frm.doc.poliza.toUpperCase());
			frm.set_df_property("poliza", "invalid", !(regex_numeros_letras.test(frm.doc.poliza)));     	
			frm.get_field("poliza").set_invalid(); 			
		}	
	},	
	tramite: function(frm){
		frm.trigger('funcionesTramite')
	},
	rfc: function(frm) {
		//vaciar campos
		frm.set_value("curp", '');
		frm.set_value("razon_social", '');
		frm.set_value("nombre_completo", '');
		frm.set_value("nombre", '');
		frm.set_value("apellido_paterno", '');	
		frm.set_value("apellido_materno", '');
		frm.set_value("genero", '');
		frm.set_value("estatus", '');
		frm.set_value("correo_electronico", '');
		frm.set_value("telefono_movil", '');
		frm.set_value("telefono_fijo", '');
		frm.set_value("extension", '');
		frm.set_value("tipo_identificacion", '');
		frm.set_value("clave_identificacion", '');
		frm.set_value("tipo_vialidad", '');
		frm.set_value("nombre_vialidad", '');
		frm.set_value("numero_exterior", '');
		frm.set_value("numero_interior", '');
		frm.set_value("inciso", '');
		frm.set_value("entre_calle1", '');
		frm.set_value("entre_calle2", '');
		frm.set_value("referencia", '');
		frm.set_value("codigo_postal", '');
		frm.set_value("estado", '');
		frm.set_value("municipio", '');
		frm.set_value("colonia", '');
		frm.set_value("nombre_asentamiento", '');
		if (frm.doc.rfc && frm.doc.rfc.length >= 10){
			frappe.db.get_doc('Propietario', frm.doc.rfc)
			.then(doc => {
				frm.set_value("curp", doc.curp);
				frm.set_value("razon_social", doc.razon_social);
				frm.set_value("tipo_persona", doc.tipo_persona);
				frm.set_value("nombre_completo", doc.nombre_completo);
				frm.set_value("nombre", doc.nombre);
				frm.set_value("apellido_paterno", doc.apellido_paterno);	
				frm.set_value("apellido_materno", doc.apellido_materno);
				frm.set_value("genero", doc.genero);
				frm.set_value("estatus", doc.status);
				frm.set_value("correo_electronico", doc.correo_electronico);
				frm.set_value("telefono_movil", doc.telefono_movil);
				frm.set_value("telefono_fijo", doc.telefono_fijo);
				frm.set_value("extension", doc.extension);
				frm.set_value("tipo_identificacion", doc.tipo_identificacion);
				frm.set_value("clave_identificacion", doc.clave_identificacion);
				frm.set_value("tipo_vialidad", doc.tipo_vialidad);
				frm.set_value("nombre_vialidad", doc.nombre_vialidad);
				frm.set_value("numero_exterior", doc.numero_exterior);
				frm.set_value("numero_interior", doc.numero_interior);
				frm.set_value("inciso", doc.inciso);
				frm.set_value("entre_calle1", doc.entre_calle1);
				frm.set_value("entre_calle2", doc.entre_calle2);
				frm.set_value("referencia", doc.referencia);
				frm.set_value("codigo_postal", doc.codigo_postal);
				frm.set_value("estado", doc.estado);
				frm.set_value("municipio", doc.municipio);
				frm.set_value("colonia", doc.colonia);
				frm.set_value("nombre_asentamiento", doc.nombre_asentamiento);
				//readOnlyVehiculo(frm, 1)
			})
		}
		
	},
	numero_economico: function(frm) {
		//vaciar campos
		if(frm.is_new()){
			frm.set_value("permisionario_original", '');
			frm.set_value("vehiculo_original", '');
			frm.set_value("numero_engomado", '');
			frm.set_value("municipio_asignado", '');
			frm.set_value("modalidad", '');
			frm.set_value("categoria_modalidad", '');	
			frm.set_value("pertenece_organizacion", '');
			frm.set_value("presidente", '');
			frm.set_value("pertenece_organizacion", '');
			frm.set_value("gestor_propietario", '');
			frm.set_value("organizacion", '');
			frm.set_value("gestor_organizacion", '');
			if (frm.doc.numero_economico){
				frappe.db.get_doc('Permiso', frm.doc.numero_economico)
				.then(doc => {
					frm.set_value("numero_engomado", doc.numero_engomado);
					frm.set_value("numero_economico_anterior", doc.numero_economico_anterior);
					frm.set_value("municipio_asignado", doc.municipio_asignado);
					frm.set_value("modalidad", doc.modalidad);
					frm.set_value("categoria_modalidad", doc.categoria_modalidad);	
					frm.set_value("pertenece_organizacion", doc.pertenece_organizacion);
					frm.set_value("presidente", doc.presidente);
					frm.set_value("pertenece_organizacion", doc.pertenece_organizacion);
					frm.set_value("gestor_propietario", );doc.gestor_propietario
					frm.set_value("organizacion", doc.organizacion);
					frm.set_value("gestor_organizacion", doc.gestor_organizacion);
					frm.set_value("permisionario_original", doc.permisionario);
					frm.set_value("vehiculo_original", doc.vehiculo);
					frm.set_value("categoria_modalidad", doc.categoria_modalidad)
					frm.set_value("modalidad", doc.modalidad_categoria)
					frm.set_df_property("categoria_modalidad", "hidden", 0);
					frm.set_df_property("modalidad", "hidden", 0);
					if (doc.categoria_modalidad == "SITIO"){
						frm.set_value("sitio", doc.sitio)
						frm.set_df_property("sitio", "hidden", 0);
					}
					else{
						frm.set_df_property("sitio", "hidden", 1);
					}
					if (doc.categoria_modalidad == "RUTA"){
						frm.set_value("ruta", doc.ruta)
						frm.set_df_property("ruta", "hidden", 0);
					}
					else{
						frm.set_df_property("ruta", "hidden", 1);
					}
					frm.set_value("rfc", doc.permisionario);//cambio del valor permisionario q viene en el permiso original
					if (!frm.doc.serie){
						frappe.db.get_doc('Vehiculo', doc.vehiculo)// checar si existe el automovil
						.then(docV => {
							frm.set_value("servicio", docV.servicio);
							frm.set_value("serie", docV.serie);
							frm.set_value("placa", docV.placa);
							frm.set_value("tipo_documento", docV.tipo_documento);
							frm.set_value("clave_documento", docV.clave_documento);	
							frm.set_value("fecha_documento", docV.fecha_documento);
							frm.set_value("clave_vehicular", docV.clave_vehicular);
							frm.set_value("marca", docV.marca);
							frm.set_value("modelo_anio", docV.modelo_anio);
							frm.set_value("version", docV.version);
							frm.set_value("clase", docV.clase);
							frm.set_value("tipo", docV.tipo);
							frm.set_value("combustible", docV.combustible);
							frm.set_value("numero_motor", docV.numero_motor);
							frm.set_value("cilindros", docV.cilindros);
							frm.set_value("numero_pasajeros", docV.numero_pasajeros);
							frm.set_value("color_principal", docV.color_principal);
							frm.set_value("color_secundario", docV.color_secundario);
							frm.set_value("unidad_carga", docV.unidad_carga);
							frm.set_value("capacidad_carga", docV.capacidad_carga);
							frm.set_value("puertas", docV.puertas);
							frm.set_value("aseguradora", docV.aseguradora);
							frm.set_value("poliza", docV.poliza);
							frm.set_value("fecha_vigencia_inicial", docV.fecha_vigencia_inicial);
							frm.set_value("fecha_vigencia_final", docV.fecha_vigencia_final);
						})
					}
				})
			}
		}
	},
	formato_unico: function(frm) {
		//vaciar campos
		frm.set_value("servicio", '');
		frm.set_value("serie", '');
		frm.set_value("placa", '');
		frm.set_value("tipo_documento", '');
		frm.set_value("clave_documento", '');	
		frm.set_value("fecha_documento", '');
		frm.set_value("clave_vehicular", '');
		frm.set_value("marca", '');
		frm.set_value("modelo_anio", '');
		frm.set_value("version", '');
		frm.set_value("numero_economico", '');
		frm.set_value("rfc", '');
		frm.set_value("clase", '');
		frm.set_value("tipo", '');
		frm.set_value("combustible", '');
		frm.set_value("numero_motor", '');
		frm.set_value("factura_cambio_motor", '');
		frm.set_value("nuevo_numero_motor", '');
		frm.set_value("folio_repuve", '');
		frm.set_value("cilindros", '');
		frm.set_value("numero_pasajeros", '');
		frm.set_value("color_principal", '');
		frm.set_value("color_secundario", '');
		frm.set_value("unidad_carga", '');
		frm.set_value("capacidad_carga", '');
		frm.set_value("puertas", '');
		frm.set_value("tramite", '');
		frm.set_value("fecha", '');
		frm.set_value("aseguradora", '');
		frm.set_value("poliza", '');
		frm.set_value("fecha_vigencia_inicial", '');
		frm.set_value("fecha_vigencia_final", '');
		frm.set_value("fecha_pago", '');
		frm.set_value("num_ult_recibo", '');
		if (frm.doc.formato_unico){
			frappe.db.get_doc('Formato unico', frm.doc.formato_unico)// checar si existe el automovil
			.then(doc => {
				frm.set_value("tramite", doc.tramite);
				frm.set_value("servicio", doc.servicio);
				frm.set_value("serie", doc.serie);
				frm.set_value("placa", doc.placa);
				frm.set_value("tipo_documento", doc.tipo_documento);
				frm.set_value("clave_documento", doc.clave_documento);	
				frm.set_value("fecha_documento", doc.fecha_documento);
				frm.set_value("clave_vehicular", doc.clave_vehicular);
				frm.set_value("marca", doc.marca);
				frm.set_value("modelo_anio", doc.modelo_anio);
				frm.set_value("version", doc.version);
				frm.set_value("clase", doc.clase);
				frm.set_value("tipo", doc.tipo);
				frm.set_value("combustible", doc.combustible);
				frm.set_value("numero_motor", doc.numero_motor);
				frm.set_value("factura_cambio_motor", doc.factura_cambio_motor);
				if (doc.factura_cambio_motor){
					frm.trigger('validaCambiomotor')
				}
				frm.set_value("nuevo_numero_motor", doc.nuevo_numero_motor);
				frm.set_value("folio_repuve", doc.folio_repuve);
				frm.set_value("cilindros", doc.cilindros);
				frm.set_value("numero_pasajeros", doc.numero_pasajeros);
				frm.set_value("color_principal", doc.color_principal);
				frm.set_value("color_secundario", doc.color_secundario);
				frm.set_value("unidad_carga", doc.unidad_carga);
				frm.set_value("capacidad_carga", doc.capacidad_carga);
				frm.set_value("puertas", doc.puertas);
				frm.set_value("fecha", doc.fecha);
				frm.set_value("aseguradora", doc.aseguradora);
				frm.set_value("poliza", doc.poliza);
				frm.set_value("fecha_vigencia_inicial", doc.fecha_vigencia_inicial);
				frm.set_value("fecha_vigencia_final", doc.fecha_vigencia_final);
				frm.set_value("fecha_pago", doc.fecha_pago);
				frm.set_value("num_ult_recibo", doc.num_ult_recibo);
				if (!doc.numero_economico){
					frappe.db.get_value('Permiso', {'vehiculo': frm.doc.serie}, ['numero_economico'])
					.then(d => {
						if (d.message.numero_economico){
							frm.set_value("numero_economico", d.message.numero_economico)
						}
					});
				}
				else{
					frm.set_value("numero_economico", doc.numero_economico);// cambio de valor permiso original
				}
				if ((doc.tramite  === "Regularización por cesión de derechos") || 
					(doc.tramite  === "Regularización por cesión testamentaria") ||
					(doc.tramite  === "Regularización por cesión intestamentaria")) {
					cesionDeDerechos(frm)
				}
				else if (doc.tramite == "Cambio de Vehículo") {
					cambioDeVehiculo(frm)
				}
				else if (doc.tramite == "Refrendo") {
					Refrendo(frm)
				}
			})
		}
		
	},
	//TRIGGERS
	habilitarPersona(frm) {		
		if (frm.doc.tipo_persona == "FÍSICA"){// Mostrar campos persona física
			frm.set_df_property("representante", "hidden", 1);
			frm.set_df_property("curp", "hidden", 0);
			frm.set_df_property("genero", "hidden", 0);	
			frm.set_df_property('razon_social', 'reqd', 0);
			frm.set_df_property("razon_social", "hidden", 1);
			frm.set_df_property("nombre", "read_only", 1);
			frm.set_df_property("apellido_paterno", "read_only", 1);
			frm.set_df_property("apellido_materno", "read_only", 1);
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
			frm.set_df_property("nombre", "read_only", 0);
			frm.set_df_property("apellido_paterno", "read_only", 0);
			frm.set_df_property("apellido_materno", "read_only", 0);
			frm.set_df_property('tipo_identificacion', 'options', ['ACTA CONSTITUTIVA/INE']);
			if (frm.is_new()) {
				frm.set_value("tipo_identificacion", "ACTA CONSTITUTIVA/INE");	
			}
		}
	},
	// manejara los estados 
	EstadosTramite: function(frm){
		if(frm.is_new()){
			var param = "Capturado"
			frm.set_value('status', 'Capturado')
			frm.set_df_property("status", "read_only", 1);	
		}
		else{
			if (frm.doc.status == "Capturado"){
				var param = "Capturado, En revisión"
				frm.set_value('status', 'En revisión')
				frm.set_df_property("status", "read_only", 1);
			}
			else if (frm.doc.status == 'En revisión' && !frm.doc.__unsaved){
				var param = "En revisión, Devuelto, En firmas, Cancelado"
				frm.set_value('status', 'En firmas')
				frm.set_df_property("status", "read_only", 0);
			}
			else if (frm.doc.status == 'En firmas'){
				var param = "Firmado, En firmas"
				frm.set_value('status', 'Firmado')
				frm.set_df_property("status", "read_only", 0);
			}
			else if (frm.doc.status == 'Firmado'){
				var param = "Firmado, Entregado"
				frm.set_value('status', 'Entregado')
				frm.set_df_property("status", "read_only", 0);
			}
			else if (frm.doc.status == 'Entregado'){
				var param = "Entregado, Pagado"
				frm.set_value('status', 'Pagado')
				frm.set_df_property("status", "read_only", 1);
			}
			else if (frm.doc.status == "Pagado"){
				var param = "Pagado, Archivado"
				frm.set_value('status', 'Archivado')
				frm.set_df_property("status", "read_only", 1);
			}
			frm.set_query('status', () => {
				return {
					filters: { 'estado': ['in', param] }
				}
			})
		}
	},
	// manejara los estados 
	funcionesTramite: function(frm){
		if ((frm.doc.tramite  === "Regularización por cesión de derechos") || 
			(frm.doc.tramite  === "Regularización por cesión testamentaria") ||
			(frm.doc.tramite  === "Regularización por cesión intestamentaria")) {
			cesionDeDerechos(frm)
		}
		else if (frm.doc.tramite == "Cambio de Vehículo") {
			cambioDeVehiculo(frm)
		}
		else if (frm.doc.tramite == "Refrendo") {
			Refrendo(frm)
		}
	},
	// manejara los estados 
	validaCambiomotor: function(frm){
		if(frm.doc.factura_cambio_motor){ 
			frm.set_df_property("nuevo_numero_motor", "read_only", 0);
			frm.set_df_property("nuevo_numero_motor", "reqd", 1);
			frm.set_df_property("folio_repuve", "read_only", 0);
			frm.set_df_property("folio_repuve", "reqd", 1);
			frm.set_df_property("fecha_folio_repuve", "read_only", 0);
			frm.set_df_property("fecha_folio_repuve", "reqd", 1);
		}
		else{

			if (frm.doc.tramite == "Cambio de Vehículo" || frm.doc.tramite == "Cambio de motor" || frm.doc.tramite == "Regularización por cesión de derechos"
			|| frm.doc.tramite == "Regularización por cesión testamentaria" || frm.doc.tramite == "Regularización por cesión de derechos"
			|| frm.doc.tramite == "Cambio de motor" || frm.doc.tramite == "Reposición de placas" || frm.doc.tramite == "Refrendo"){
				frm.set_df_property("nuevo_numero_motor", "read_only", 0);
				frm.set_df_property("nuevo_numero_motor", "reqd", 1);
				frm.set_df_property("folio_repuve", "read_only", 0);
				frm.set_df_property("folio_repuve", "reqd", 1);
				frm.set_df_property("fecha_folio_repuve", "read_only", 0);
				frm.set_df_property("fecha_folio_repuve", "reqd", 1);
			}
			else{
				frm.set_df_property("nuevo_numero_motor", "read_only", 1);
				frm.set_df_property("nuevo_numero_motor", "reqd", 0);
				frm.set_value("nuevo_numero_motor", "");
				frm.set_df_property("folio_repuve", "read_only", 1);
				frm.set_df_property("folio_repuve", "reqd", 0);
				frm.set_value("folio_repuve", "");
				frm.set_df_property("fecha_folio_repuve", "read_only", 1);
				frm.set_df_property("fecha_folio_repuve", "reqd", 0);
				frm.set_value("fecha_folio_repuve", "");
			}
		}
	}
});
