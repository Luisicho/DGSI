# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

import re
from . import api
import frappe
from frappe.model.document import Document

class Permiso(Document):
	regex_numero_economico = "(^[a-zA-Z]{3,6}-[\d]{1,4}$)|(^[a-zA-Z]{3,6}[\d]{1,4}$)"
	regex_numeros_letras_guiones = "^[a-zA-Z0-9\-]*$"
	regex_numeros_letras = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. \d]*$"
	regex_letras = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]*$"
	regex_numeros = "^\d*$"
	def validate(self):
		titulo = "Error de captura"
		if self.numero_economico_anterior and not re.search(self.regex_numero_economico, self.numero_economico_anterior):
			frappe.throw(
				title = titulo,
				msg = "El número económico anterior debe contener de 3 a 6 letras, un guión y de 1 a 4 números"
			)
		if self.numero_economico and not re.search(self.regex_numero_economico, self.numero_economico):
			frappe.throw(
				title = titulo,
				msg = "El número económico debe contener de 3 a 6 letras, un guión y de 1 a 4 números"
			)
		if self.numero_engomado and not re.search(self.regex_numeros, self.numero_engomado):
			frappe.throw(
				title = titulo,
				msg = "El El número de engomado es numérico"
			)
		if self.gestor_propietario and not re.search(self.regex_letras, self.gestor_propietario):
			frappe.throw(
				title = titulo,
				msg = "El gestor propietario no es valido"
			)

	def before_save(self):
		if self.numero_economico_anterior:
			self.numero_economico_anterior = str.upper(self.numero_economico_anterior)
		if self.numero_economico:
			self.numero_economico = str.upper(self.numero_economico)
		if self.numero_engomado:
			self.numero_engomado = str.upper(self.numero_engomado)
		if self.gestor_propietario:
			self.gestor_propietario = str.upper(self.gestor_propietario)
		
		"""if (self.fecha_oficio > self.fecha_expedicion):
				frappe.throw(
					title = "Error de fechas",
					msg ="La fecha de expedición debe de ser mayor o igual a la fecha de alta del oficio"
				)"""
		# Definir nuevo número económico para el permiso
		#if (self.is_new() and not self.numero_economico):
		#	self.numero_economico = api.get_nuevo_numero_economico(self.municipio_asignado, self.modalidad)