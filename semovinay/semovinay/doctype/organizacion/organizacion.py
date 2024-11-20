# Copyright (c) 2022, DGSTI / SAF and contributors
# For license information, please see license.txt
import re;
import frappe
from frappe.model.document import Document

regex_nombre = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]{1,50}$"
regex_telefono = "^\(?(?:(\d{2,3})\)?[-. ]?)?(\d{2,3})[-. ]?(\d{4})$"
regex_email = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

titulo = "Error de validación"
class Organizacion(Document):
	def validate (self):
		#validacion tabla hija
		for Gestganizacion in self.gestor:  # Timesheet Detail
			if (Gestganizacion.telefono and not (re.match(regex_telefono, Gestganizacion.telefono))):
				frappe.throw(
					title= titulo,
					msg = "El número de teléfono del gestor debe ser de 10 dígitos."
				)
			
		# Validar nombre del presidente (no acepte basura o caracteres especiales)
		if (self.presidente and not(re.match(regex_nombre, self.presidente))):
				frappe.throw(
					title = titulo,
					msg ="Nombre del presidente incorrecto."
				)
		# Validar correo electronico (no acepte basura o caracteres especiales)
		if (self.correo_electronico and not(re.match(regex_email, self.correo_electronico))):
				frappe.throw(
					title = titulo,
					msg ="El correo electronico no es valido."
				)
		# Validar nombre del secretario (no acepte basura o caracteres especiales)
		if (self.secretario and not(re.match(regex_nombre, self.secretario))):
				frappe.throw(
					title = titulo,
					msg ="Nombre del secretario incorrecto."
				)

		# valida numero de telefono a 10 dígitos	
		if (self.telefono and not (re.match(regex_telefono, self.telefono))):
			frappe.throw(
				title= titulo,
				msg = "El número de teléfono es incorrecto."
			)
			
	def before_insert(self):
		#Validar nombre de organización que no se duplique
		if  frappe.db.exists("Organizacion", {"nombre_organizacion": self.nombre_organizacion}):
			frappe.throw(
				title = titulo,
				msg = "El nombre de Organización ya existe en la base de datos."
			)

	def before_validate(self):
		# Convertir a mayúsculas
		self.nombre_organizacion = str.upper(self.nombre_organizacion)
		if (self.presidente):
			self.presidente = str.upper(self.presidente)
		if (self.secretario):
			self.secretario = str.upper(self.secretario)
		if (self.numero_exterior):	
			self.numero_exterior = str.upper(self.numero_exterior)
		if (self.correo_electronico):	
			self.correo_electronico = str.upper(self.correo_electronico)
		if (self.numero_interior):
			self.numero_interior = str.upper(self.numero_interior)
		if (self.inciso):
			self.inciso = str.upper(self.inciso)
		if (self.entre_calle_1):
			self.entre_calle_1 = str.upper(self.entre_calle_1)
		if (self.entre_calle_2):
			self.entre_calle_2 = str.upper(self.entre_calle_2)
		if (self.nombre_vialidad):
			self.nombre_vialidad = str.upper(self.nombre_vialidad)
		if (self.referencia):
			self.referencia = str.upper(self.referencia)
		