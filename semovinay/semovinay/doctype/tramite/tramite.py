# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

import re
import frappe
from frappe.model.document import Document
class Tramite(Document):
	regex_curp = "^([A-Za-z][AaEeIiOoUuXx][A-Za-z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$"
	regex_letras = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]*$"
	regex_telefono = "^\d{10}"
	regex_numeros_letras = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. \d]*$"
	regex_extensiones_telefono = "^\d{3,5}(,\s*\d{3,5})*$"

	def autoname(self):
		self.name = self.formato_unico

	def before_validate(self):
		titulo = "Error de validación"
		if (self.extension):
			if not re.search(self.regex_extensiones_telefono, self.extension):
				frappe.throw(
					title = titulo,
					msg = "La extensión no es valido"
				)
			if (not self.telefono_fijo):
				frappe.throw(
					title = "Teléfono Fijo",
					msg = "No se puede tener una extensión sin teléfono fijo")
		# Convertir a mayúsculas
		if (self.curp):
			self.curp = str.upper(self.curp)
			if not re.search(self.regex_curp, self.curp):
				frappe.throw(
					title = titulo,
					msg = "La curp no es valida"
				)
		if (self.razon_social):
			self.razon_social = str.upper(self.razon_social)
		self.clave_identificacion = str.upper(self.clave_identificacion)
		self.nombre_vialidad = str.upper(self.nombre_vialidad)
		self.numero_exterior = str.upper(self.numero_exterior)
		if (self.numero_interior):
			self.numero_interior = str.upper(self.numero_interior)
		if (self.inciso):
			self.inciso = str.upper(self.inciso)
		if (self.entre_calle1):
			self.entre_calle1 = str.upper(self.entre_calle1)
		if (self.entre_calle2):
			self.entre_calle2 = str.upper(self.entre_calle2)
		if (self.referencia):
			self.referencia = str.upper(self.referencia)