# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Sitio(Document):
	def before_validate(self):
		self.sitio_municipio = f"{self.sitio} - {self.nombre_municipio}"