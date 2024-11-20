# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

import re
import idna
import frappe

from frappe.model.document import Document

class Perfil(Document):
	regex_letras = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]*$"
	def before_validate(self):
		titulo = "Error de validación"

		# Convertir a mayúsculas
		if (self.perfil):
			self.perfil = str.upper(self.perfil)
			if not re.search(self.regex_letras, self.perfil):
				frappe.throw(
					title = titulo,
					msg = "Nombre de perfil incorrecto"
				)
			