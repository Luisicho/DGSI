// Copyright (c) 2024, DGSTI / SAF and contributors
// For license information, please see license.txt
var regex_serie = /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/;
//Acepta modelo de un rango del 2007 al 2024: Para el año actual (2023)
var regex_modelo = /^(200[5-9]|201[0-9]|202[0-4])$/;
var regex_numero_economico = /(^[a-zA-Z]{3,6}-[\d]{1,4}$)|(^[a-zA-Z]{3,6}[\d]{1,4}$)/;
//Acepta un rango de dígitos del 5 a 10 caractéres 
var regex_placa_automovil = /(^[1-9]{1}[0-9]{1}[-][0-9]{2}-M[D-J]{1}[A-Z]{1}$)|(^A-[0-9]{3}-MD[A-K]{1}$)/;
var regex_placa_camioneta = /(^[1-9]{1}[-][P-R]{1}[A-F]{1}[A-Z]{1}[-][1-9]{1}[0-9]{2}$)|(^[1-2]{1}-PFA-[0-9]{1}[1-9]{1}A$)/;
var regex_placa_omnibus = /^([1-7]{1}[3-4]{1}[0-9]{1}[-][0-9]{3}[-][P-R]{1}$)|(^A-7[3-4]{1}[0-4]{1}[0-9]{2}-P$)/;
var regex_numero_motor = /^([HECHO EN |hecho en ][a-zA-Z'\ \d\-]{5,40})$|[a-zA-Z\d\-]{5,25}|^[A-Z\d\-]{5,25}$/;
var regex_numero = /^\d*$/;
var regex_numeros_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. \d]*$/
var regex_clave_documento = /^([A-Za-z\d]{1}[A-Za-z\d\-]{1,30})$/;
var titulo = "Error de validación";

function setValuesClase(frm){
	frm.set_df_property("alert_camion", "hidden", 1);	
	frm.set_df_property("alert_automovil", "hidden", 1);
	frm.set_df_property("alert_microbus", "hidden", 1);	
	if (frm.doc.clase=="CAMIÓN"){
		frm.set_df_property('tipo', 'options', ['PICK UP','REDILAS', 'ESTACAS', 'VOLTEO','PENAL','PLATAFORMA','GRUA','TANDEN','PIPA'])	;
		frm.set_df_property("alert_camion", "hidden", 0);	
		frm.set_df_property("unidad_carga", "hidden", 0);
		frm.set_df_property("capacidad_carga", "hidden", 0);
		frm.set_df_property("numero_pasajeros", "hidden", 1);
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
function valTramite(frm){
	if (frm.doc.tramite == "Cambio de Vehículo" || frm.doc.tramite == "Cambio de motor" || frm.doc.tramite == "Regularización por cesión de derechos"
			|| frm.doc.tramite == "Regularización por cesión testamentaria" || frm.doc.tramite == "Regularización por cesión de derechos"
			|| frm.doc.tramite == "Cambio de motor" || frm.doc.tramite == "Reposición de placas"){
				frm.set_df_property("folio_repuve", "read_only", 0);
		}
	else{
		frm.set_df_property("folio_repuve", "read_only", 1);
		frm.set_value("folio_repuve", "");
	}
	if (frm.doc.tramite == "Cambio de motor" || frm.doc.tramite == "Refrendo" || frm.doc.tramite == "Reemplacamiento"){
		frm.set_df_property("factura_cambio_motor", "read_only", 0);
		frm.set_df_property("nuevo_numero_motor", "read_only", 1);
		frm.set_value("nuevo_numero_motor", "");
	}
	else{
		frm.set_df_property("factura_cambio_motor", "read_only", 1);
		frm.set_df_property("nuevo_numero_motor", "read_only", 1);
		frm.set_df_property("factura_cambio_motor", "");
		frm.set_value("nuevo_numero_motor", "");
	}
}

function readOnlyVehiculo(frm, soloLectura = 1){
	frm.set_df_property("modelo_anio", "read_only", soloLectura);
	frm.set_df_property("clave_vehicular", "read_only", soloLectura);
	frm.set_df_property("placa", "read_only", soloLectura);
	frm.set_df_property("color_secundario", "read_only", soloLectura);
	frm.set_df_property("puertas", "read_only", soloLectura);
	frm.set_df_property("numero_pasajeros", "read_only", soloLectura);
	frm.set_df_property("unidad_carga", "read_only", soloLectura);
	frm.set_df_property("capacidad_carga", "read_only", soloLectura);	
	frm.set_df_property("numero_motor", "read_only", soloLectura);
}
frappe.ui.form.on('Formato unico', {
	 refresh: function(frm) {
		setValuesClase(frm)
		valTramite(frm)
		frm.set_query('clave_vehicular', () => {
			return {
				filters: {id_clasificacion:['!=', '3']}
			}
		})
		frm.set_query('nombre_municipio', () => {
			return {
				filters: {id_estado: '18'}
			}
		})

		if (frm.is_new() && !frm.doc.requisitos){
			frm.call({
				method:"semovinay.semovinay.doctype.formato_unico.formato_unico.etiqueta",
				freeze: true,
				freeze_message:"cargando datos",
				callback:function(d){
					if(d){
						for (let i = 0; i < d.message.etiquetas.length; i++){
							var requ = d.message.etiquetas[i].etiqueta;
							var new_row = cur_frm.add_child("requisitos");
							new_row.etiqueta = requ;
						}
						frm.refresh_field("requisitos");
					}
				}
			})
		}
		else{
			frm.set_df_property('serie', 'read_only', 1);
		}
	},

	validate: function(frm) {
		if ((frm.doc.quien_presenta) && !(regex_numeros_letras.test(frm.doc.quien_presenta)) && (frm.doc.regex_numeros_letras)) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor de quien presenta es incorrecto"
			});
			frm.validated = false;
		}	
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
		if ((frm.doc.telefono) && !(regex_numero.test(frm.doc.telefono))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor del teléfono es incorrecto"
			});
			frm.validated = false;
		}
		if ((frm.doc.numero_economico) && !(regex_numero_economico.test(frm.doc.numero_economico))) {
			frappe.throw({
				title: titulo_error,
				indicator: "red",
				message: "El número económico debe contener de 3 a 6 letras, un guión y de 1 a 4 números"
			});
			frm.validated = false;
		}
		if ((frm.doc.numero_pasajeros) && !(regex_numero.test(frm.doc.numero_pasajeros))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor del número de pasajeros es incorrecto"
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
		if ((frm.doc.folio_repuve) && !(regex_numero.test(frm.doc.folio_repuve))) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "El valor del folio REPUVE es incorrecto"
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
				message: "La fecha vigencia inicial no puede ser mayor a la fecha actual."
			});
			frm.validated = false;
		}
		if (frm.doc.fecha_vigencia_final <= frm.doc.fecha_vigencia_inicial) {
			frappe.throw({
				title: titulo,
				indicator: "red",
				message: "La fecha de vigencia final no puede ser menor a la fecha inicial."
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
	tramite: function(frm){
		valTramite(frm)
	},
	quien_presenta: function(frm) {
		// Marcar como erróneo el campo 'serie' si es inválido
		frm.set_df_property("quien_presenta", "invalid", !(regex_numeros_letras.test(frm.doc.quien_presenta.toUpperCase())));
		frm.get_field("quien_presenta").set_invalid();
		frm.set_value("quien_presenta", frm.doc.quien_presenta.toUpperCase());
	},
	numero_economico: function(frm) {
		frm.set_df_property("numero_economico", "invalid", !(regex_numero_economico.test(frm.doc.numero_economico)));     
		frm.get_field("numero_economico").set_invalid();
		frm.set_value("numero_economico", frm.doc.numero_economico.toUpperCase());
	},
    serie: function(frm) {
		//vaciar campos
		frm.set_value("modelo_anio", '');
		frm.set_value("clave_vehicular", '');
		frm.set_value("placa", '');
		frm.set_value("color_principal",'');
		frm.set_value("puertas", '');
		frm.set_value("numero_pasajeros", '');
		frm.set_value("unidad_carga", '');
		frm.set_value("capacidad_carga", '');
		frm.set_value("tipo_documento", '');
		frm.set_value("fecha_documento", '');
		frm.set_value("clave_documento", '');	
		frm.set_value("numero_motor", '');	
		frm.set_value("aseguradora", '');
		frm.set_value("poliza", '');	
		frm.set_value("fecha_vigencia_inicial", '');	
		frm.set_value("fecha_vigencia_final", '');	
		frm.set_value("numero_economico", '')
		frm.set_df_property("serie", "invalid", !(regex_serie.test(frm.doc.serie.toUpperCase())));
		frm.get_field("serie").set_invalid();
		frm.set_value("serie", frm.doc.serie.toUpperCase());
		if (frm.doc.serie && frm.doc.serie.length ==17){
			frappe.db.get_doc('Vehiculo', frm.doc.serie)// checar si existe el automovil
			.then(doc => {
				if (doc.placa){
					frm.set_value("modelo_anio", doc.modelo_anio);
					frm.set_value("clave_vehicular", doc.clave_vehicular);
					frm.set_value("placa", doc.placa);
					frm.set_value("color_principal", doc.color_principal);
					frm.set_value("color_secundario", doc.color_secundario);
					frm.set_value("puertas", doc.puertas);
					frm.set_value("numero_pasajeros", doc.numero_pasajeros);
					frm.set_value("unidad_carga", doc.unidad_carga);
					frm.set_value("capacidad_carga", doc.capacidad_carga);
					frm.set_value("tipo_documento", doc.tipo_documento);
					frm.set_value("fecha_documento", doc.fecha_documento);
					frm.set_value("clave_documento", doc.clave_documento);	
					frm.set_value("numero_motor", doc.numero_motor);
					frm.set_value("aseguradora", doc.aseguradora);
					frm.set_value("poliza", doc.poliza);	
					frm.set_value("fecha_vigencia_inicial", doc.fecha_vigencia_inicial);	
					frm.set_value("fecha_vigencia_final", doc.fecha_vigencia_final);	
					readOnlyVehiculo(frm, 1)
					frappe.db.get_value('Permiso', {'vehiculo': frm.doc.serie}, ['numero_economico', 'categoria_modalidad', 'modalidad_categoria', 'sitio', 'ruta'])
					.then(d => {
						if (d.message.numero_economico){
							frm.set_value("numero_economico", d.message.numero_economico)
						}
						/*frm.set_value("categoria_modalidad", d.message.categoria_modalidad)
						frm.set_value("modalidad_categoria", d.message.modalidad_categoria)
						frm.toggle_display("sitio", frm.doc.categoria_modalidad == "SITIO");
						frm.toggle_display("ruta", frm.doc.categoria_modalidad == "RUTA");
						if (d.message.sitio){
							frm.set_value("sitio", d.message.sitio)
						}
						else{
							frm.set_df_property("sitio", "read_only", 0);
						}
						if (d.message.ruta){
							frm.set_value("ruta", d.message.ruta)
						}
						else{
							frm.set_df_property("ruta", "read_only", 0);
						}*/
					})
				} 
			})
			if (!frm.doc.modelo_anio && frm.doc.serie.charAt(9)){
				frappe.db.get_value('Vin', frm.doc.serie.charAt(9), 'modelo_anio')
				.then(d => {
					frm.set_value("modelo_anio", d.message.modelo_anio);
				});
			}
			else{
				frm.set_value("modelo_anio", null);
			}	
		}
	},
	numero_economico: function(frm){
		if (frm.doc.numero_economico){
			frappe.db.get_value('Permiso', {'numero_economico': frm.doc.numero_economico}, ['categoria_modalidad', 'modalidad_categoria', 'sitio', 'ruta'])
			.then(d => {
				frm.set_value("categoria_modalidad", d.message.categoria_modalidad)
				frm.set_value("modalidad_categoria", d.message.modalidad_categoria)
				frm.toggle_display("sitio", frm.doc.categoria_modalidad == "SITIO");
				frm.toggle_display("ruta", frm.doc.categoria_modalidad == "RUTA");
				if (d.message.sitio){
					frm.set_value("sitio", d.message.sitio)
				}
				else{
					frm.set_df_property("sitio", "read_only", 0);
				}
				if (d.message.ruta){
					frm.set_value("ruta", d.message.ruta)
				}
				else{
					frm.set_df_property("ruta", "read_only", 0);
				}
			})
		}
		else{
			frm.set_value("categoria_modalidad", '')
			frm.set_value("modalidad_categoria", '')
			frm.toggle_display("sitio", false);
			frm.toggle_display("ruta", false);
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
	categoria_modalidad:function(frm){
		frm.toggle_display("sitio", frm.doc.categoria_modalidad == "SITIO");
		frm.toggle_display("ruta", frm.doc.categoria_modalidad == "RUTA");
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
		if(frm.doc.factura_cambio_motor){ 
			frm.set_df_property("nuevo_numero_motor", "read_only", 0);
			frm.set_df_property("folio_repuve", "read_only", 0);
		}
		else{
			frm.set_df_property("nuevo_numero_motor", "read_only", 1);
			frm.set_value("nuevo_numero_motor", "");
			if (frm.doc.tramite == "Cambio de Vehículo" || frm.doc.tramite == "Cambio de motor" || frm.doc.tramite == "Regularización por cesión de derechos"
			|| frm.doc.tramite == "Regularización por cesión testamentaria" || frm.doc.tramite == "Regularización por cesión de derechos"
			|| frm.doc.tramite == "Cambio de motor" || frm.doc.tramite == "Reposición de placas"){
				frm.set_df_property("folio_repuve", "read_only", 0);
			}
			else{
				frm.set_df_property("folio_repuve", "read_only", 1);
				frm.set_value("folio_repuve", "");
			}
		}

	},
	capacidad_carga: function(frm){
		if(frm.doc.capacidad_carga){
			frm.set_df_property("capacidad_carga", "invalid", !(regex_numero.test(frm.doc.capacidad_carga)));     	
			frm.get_field("capacidad_carga").set_invalid(); 			
		}	
	},
	telefono: function(frm){
		if(frm.doc.telefono){
			frm.set_df_property("telefono", "invalid", !(regex_numero.test(frm.doc.telefono)));     	
			frm.get_field("telefono").set_invalid(); 			
		}	
	},
	numero_pasajeros: function(frm){
		if(frm.doc.numero_pasajeros){
			frm.set_df_property("numero_pasajeros", "invalid", !(regex_numero.test(frm.doc.numero_pasajeros)));     	
			frm.get_field("numero_pasajeros").set_invalid(); 			
		}	
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
});

frappe.ui.form.on('Requisitos', {
	bueno: function(frm, cdt, cdn) {
		const cbueno = locals[cdt][cdn];
		if(cbueno.bueno == 1){
			frappe.model.set_value(cdt, cdn, 'malo', 0);
		}
	 },
	 malo: function(frm, cdt, cdn) {
		const cmalo = locals[cdt][cdn];
		if(cmalo.malo == 1){
			frappe.model.set_value(cdt, cdn, 'bueno', 0);
		}
	 }
});
