// Copyright (c) 2023, DGSTI / SAF and contributors
// For license information, please see license.txt
frappe.provide('frappe.ui.keys.handlers');
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
var titulo = "Error de validación";

function setValuesClase(frm){
	frm.set_df_property("alert_camion", "hidden", 1);	
	frm.set_df_property("alert_automovil", "hidden", 1);
	frm.set_df_property("alert_microbus", "hidden", 1);	
	frm.set_df_property("numero_pasajeros", "hidden", 0);
	frm.set_df_property("numero_pasajeros", "reqd", 1);
	if (frm.doc.clase=="CAMIÓN"){
		frm.set_df_property('tipo', 'options', ['PICK UP','REDILAS', 'ESTACAS', 'VOLTEO','PENAL','PLATAFORMA','GRUA','TANDEN','PIPA'])	;
		frm.set_df_property("alert_camion", "hidden", 0);	
		frm.set_df_property("unidad_carga", "hidden", 0);
		frm.set_df_property("capacidad_carga", "hidden", 0);
		frm.set_df_property("numero_pasajeros", "hidden", 1);
		frm.set_df_property("numero_pasajeros", "reqd", 0);
	}
	else{
		if (frm.doc.clase=="AUTOMÓVIL"){
			frm.set_df_property('tipo', 'options', ['SEDAN','SEDANETA'])	;
			frm.set_df_property("alert_automovil", "hidden", 0);
			frm.set_df_property("capacidad_carga", "hidden", 1);
		}
		else{
			frm.set_df_property('tipo', 'options', ['OMNIBUS','AUTOBÚS']);
			frm.set_df_property("alert_microbus", "hidden", 0);	
		}
	}
}

frappe.ui.form.on("Vehiculo", {
	onload: function(frm) {
		frm.set_query('clave_vehicular', () => {
			return {
				filters: {id_clasificacion:['!=', '3']}
			}
		})
	},
	refresh: function (frm) {
		setValuesClase(frm)
		if (!frm.is_new()){
			frm.set_df_property('serie', 'hidden', 0);
			frm.set_df_property('serie', 'read_only', 1);
		}
	},

	validate: function(frm) {
		//llamar a funcion vehiculo mandar email
		/*frappe.call({
			method: "semovinay.semovinay.doctype.vehiculo.vehiculo.send_vigencia_notifications",
			args: {},
			freeze: true,
			freeze_message: "Generando datos...",
			callback: function(c) {
				if (c.message == true){
				 console.log("SE PUDO")	
				}
			}
		});*/
		// Validar SERIE	
		if (!(regex_serie.test(frm.doc.serie)) && (frm.doc.regex_serie)) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor de la serie es incorrecto"
			});
			frm.validated = false;
		}	
		if ((frm.doc.numero_motor) && !(regex_numero_motor.test(frm.doc.numero_motor))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor del número motor es incorrecto"
			});
			frm.validated = false;
		}	
		if ((frm.doc.capacidad_carga) && !(regex_numero.test(frm.doc.capacidad_carga))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor de capacidad de carga es incorrecto"
			});
			frm.validated = false;
		}
		if ((frm.doc.numero_pasajeros) && !(regex_numero.test(frm.doc.numero_pasajeros)) || (frm.get_docfield("numero_pasajeros").hidden == 0 && frm.doc.numero_pasajeros <= 0)) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor del número de pasajeros es númerico y mayor a cero"
			});
			frm.validated = false;
		}
		if ((frm.doc.poliza) && !(regex_numeros_letras.test(frm.doc.poliza))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor de polizas debe ser alfanumerico"
			});
			frm.validated = false;
		}		
		if (frm.doc.fecha_documento > frappe.datetime.get_today()){
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "La fecha documento no puede ser mayor a la fecha actual."
			});
			frm.validated = false;
		}
		if (frm.doc.fecha_vigencia_inicial > frappe.datetime.get_today()){
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "La fecha inicial no puede ser mayor a la fecha actual."
			});
			frm.validated = false;
		}
		if (frm.doc.fecha_vigencia_final <= frm.doc.fecha_vigencia_inicial) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "La fecha de final no puede ser menor a la fecha inicial."
			});
			frm.validated = false;
		}	
		if (frm.doc.importe <= "0") {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El importe debe de ser mayor a cero"
			});
			frm.validated = false;
		}	
	},	

    serie: function(frm) {
		// Marcar como erróneo el campo 'serie' si es inválido
		frm.set_df_property("serie", "invalid", !(regex_serie.test(frm.doc.serie.toUpperCase())));
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

	clave_vehicular: function(frm){
		frappe.db.get_value('Clave vehicular', frm.doc.clave_vehicular, 'id_clasificacion')
			.then(d => {
				if (d.message.id_clasificacion == 0){
					frm.set_value("clase", "AUTOMÓVIL")
				}
				else if (d.message.id_clasificacion == 1){
					frm.set_value("clase", "CAMIÓN")
				}
				else if (d.message.id_clasificacion == 2){
					frm.set_value("clase", "MICROBUS")
				}
			});
	},

	clase: function(frm){
		setValuesClase(frm)
	},
	
	capacidad_carga: function(frm){
		if(frm.doc.capacidad_carga){
			frm.set_df_property("capacidad_carga", "invalid", !(regex_numero.test(frm.doc.capacidad_carga)));     	
			frm.get_field("capacidad_carga").set_invalid(); 			
		}	
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
	numero_pasajeros: function(frm){
		if(frm.doc.numero_pasajeros){
			frm.set_df_property("numero_pasajeros", "invalid", !(regex_numero.test(frm.doc.numero_pasajeros)));     	
			frm.get_field("numero_pasajeros").set_invalid(); 			
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

 });


