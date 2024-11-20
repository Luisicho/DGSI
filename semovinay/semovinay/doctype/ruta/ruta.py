# Copyright (c) 2022, DGSTI / SAF and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import getdate
from frappe.model.document import Document

def fecha_futura(punto):
	# print("Punto:", punto.fecha, getdate())
	return getdate(punto.fecha) > getdate()

class Ruta(Document):
	def validate(self):
		# Validar número máxi de puntos de ruta
		if (len(self.puntos_ruta) > 6):
			frappe.throw(
				title = "Error de validación",
				msg = "Se permite un máximo de 6 puntos de ruta (python)."
			)
		
		# Validar que solo un punto de ruta se marque como final
		# list comprehension
		finales = [punto for punto in self.puntos_ruta if punto.destino_final == 1]
		if (len(finales) > 1):
			frappe.throw(
				title = "Error de validación",
				msg = "Solo se puede tener un punto de destino final en la ruta (python)."
			)

		# Validar que las fechas de los puntos de ruta no estén en el futuro
		futuras = filter(fecha_futura, self.puntos_ruta)

		if (len(list(futuras)) > 0):
			frappe.throw(
				title = "Error de validación",
				msg = "No se puede definir una fecha mayor a la actual para los puntos de ruta (python)."
			)