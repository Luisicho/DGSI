# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Estado(Document):

	def before_validate(self):
		# Convertir a mayúsculas
		self.nombre_estado = str.upper(self.nombre_estado)
		self.abreviatura = str.upper(self.abreviatura)
