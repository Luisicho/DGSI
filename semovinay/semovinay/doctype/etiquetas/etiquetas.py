# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class Etiquetas(Document):
	def before_validate(self):
		if self.etiqueta:
			self.etiqueta = str.upper(self.etiqueta)	
