# Copyright (c) 2024, DGSTI / SAF and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document

class Agencia(Document):
	def before_validate(self):
		if self.agencia:
			self.agencia = str.upper(self.agencia)	
