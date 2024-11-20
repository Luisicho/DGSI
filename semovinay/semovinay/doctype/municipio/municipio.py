# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Municipio(Document):
	def before_validate(self):
		titulo = "Error de validación"
		# Convertir a mayúsculas
		self.nombre_municipio = str.upper(self.nombre_municipio)	
