# Copyright (c) 2024, DGSTI / SAF and contributors
# For license information, please see license.txt

import frappe
import re
from frappe.utils import today
from frappe.model.document import Document

class Formatounico(Document):
	regex_serie = "^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$"
	regex_modelo = "^(200[5-9]|201[0-9]|202[0-4])$"
	regex_placa_automovil = "(^[1-9]{1}[0-9]{1}[-][0-9]{2}-M[D-J]{1}[A-Z]{1}$)|(^A-[0-9]{3}-MD[A-K]{1}$)"
	regex_placa_camioneta = "(^[1-9]{1}[-][P-R]{1}[A-F]{1}[A-Z]{1}[-][1-9]{1}[0-9]{2}$)|(^[1-2]{1}-PFA-[0-9]{1}[1-9]{1}A$)"
	regex_placa_omnibus = "^([1-7]{1}[3-4]{1}[0-9]{1}[-][0-9]{3}[-][P-R]{1}$)|(^A-7[3-4]{1}[0-4]{1}[0-9]{2}-P$)"
	regex_numero_motor = "^([HECHO EN |hecho en ][a-zA-Z' \d\-]{5,40})$|[a-zA-Z\d\-]{5,25}|^[A-Z\d\-]{5,25}$"
	regex_numero = "^\d$"
	regex_numeros_letras = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. \d]*$"
	titulo = "Error",

	def autoname(self):
		folios = frappe.get_doc('Parametros Sistema')
		folio = folios.folio_formato_unico + 1
		self.name = f'{folio}/{folios.anio}'
		self.folio = self.name
		folios.folio_formato_unico = folio
		folios.save()
		self.fecha = frappe.utils.today()

	@property
	def validate(self):
		titulo = "Error de captura"
		if self.quien_presenta and not re.search(self.regex_numeros_letras, self.quien_presenta):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para quien representa no es valido"
				)

		if not re.search(self.regex_serie, self.serie):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la serie no es valido"
				)

		if (self.clase=="AUTOMÓVIL"):
			if not re.search(self.regex_placa_automovil, self.placa):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la placa no es valido"
				)
		if (self.clase=="CAMIÓN"):
			if not re.search(self.regex_placa_camioneta, self.placa):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la placa no es valido"
				)

		if (self.clase=="poliza"):
			if not re.search(self.regex_numeros_letras, self.poliza):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la poliza no es valido"
				)

		if (self.clase=="MICROBUS"):
			if not re.search(self.regex_placa_omnibus, self.placa):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la placa no es valido"
				)
		if  (self.numero_motor and not re.search(self.regex_numero_motor, self.numero_motor)):
			frappe.throw(
				title = titulo,
				msg = "El valor ingresado para el número de motor no es valido"
			)
		if (self.importe and self.importe <= 0):
			frappe.throw(
				title = titulo,
				msg = "El importe debe de ser mayor a cero"
			)
		if  (self.capacidad_carga and self.capacidad_carga <= 0):
			frappe.throw(
				title = titulo,
				msg = "El valor ingresado para la capacidad de carga no es valido"
			)
		if  (self.folio_repuve and self.folio_repuve <= 0):
			frappe.throw(
				title = titulo,
				msg = "El valor ingresado para el folio REPUVE no es valido"
			)
		if  (self.telefono and self.telefono <= 0):
			frappe.throw(
				title = titulo,
				msg = "El valor ingresado para el teléfono no es valido"
			)
		if  (self.numero_pasajeros and self.numero_pasajeros <= 0):
			frappe.throw(
				title = titulo,
				msg = "El valor ingresado para el número de pasajeros no es valido"
			)

	def before_validate(self):
		if self.quien_presenta:
			self.quien_presenta = str.upper(self.quien_presenta)	
		if self.serie:
			self.serie = str.upper(self.serie)	
		if self.placa:
			self.placa = str.upper(self.placa)	
		if self.numero_motor:
			self.numero_motor = str.upper(self.numero_motor)	
		

@frappe.whitelist()
def etiqueta():
	etiquetas = frappe.db.sql("""select etiqueta from `tabEtiquetas` order by orden asc""", as_dict = True)
	return  {'etiquetas': etiquetas}