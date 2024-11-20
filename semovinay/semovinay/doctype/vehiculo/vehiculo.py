# Copyright (c) 2023, DGSTI / SAF and contributors
# For license information, please see license.txt

import frappe
import re
from frappe.model.document import Document
from frappe.utils import add_months, today
from frappe.core.doctype.communication.email import make

class Vehiculo(Document):
	regex_serie = "^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$"
	regex_modelo = "^(200[5-9]|201[0-9]|202[0-4])$"
	regex_placa_automovil = "(^[1-9]{1}[0-9]{1}[-][0-9]{2}-M[D-J]{1}[A-Z]{1}$)|(^A-[0-9]{3}-MD[A-K]{1}$)"
	regex_placa_camioneta = "(^[1-9]{1}[-][P-R]{1}[A-F]{1}[A-Z]{1}[-][1-9]{1}[0-9]{2}$)|(^[1-2]{1}-PFA-[0-9]{1}[1-9]{1}A$)"
	regex_placa_omnibus = "^([1-7]{1}[3-4]{1}[0-9]{1}[-][0-9]{3}[-][P-R]{1}$)|(^A-7[3-4]{1}[0-4]{1}[0-9]{2}-P$)"
	regex_numero_motor = "^([HECHO EN |hecho en ][a-zA-Z' \d\-]{5,40})$|[a-zA-Z\d\-]{5,25}|^[A-Z\d\-]{5,25}$"
	regex_clave_documento = "^([A-Za-z\d]{1}[A-Za-z\d\-]{1,30})$"
	regex_numero = "^\d{1,3}$"
	regex_numeros_letras = "^[A-Za-zÑñÁáÉéÍíÓóÚúÜü-\d]*$"
	titulo = "Error",

	@property
	def validate(self):
		titulo = "Error de captura"
		# Validar formato de SERIE		
		if not re.search(self.regex_serie, self.serie):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la serie no es valido"
				)

		if (self.clase=="AUTOMÓVIL"):
			if not re.search(self.regex_placa_automovil, self.placa):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la placa no es valido"
				)
		if (self.clase=="CAMIÓN"):
			if not re.search(self.regex_placa_camioneta, self.placa):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la placa no es valido"
				)

		if (self.clase=="poliza"):
			if not re.search(self.regex_numeros_letras, self.poliza):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la poliza no es valido"
				)

		if (self.clase=="MICROBUS"):
			if not re.search(self.regex_placa_omnibus, self.placa):
				frappe.throw(
					title = titulo,
					msg = "El valor ingresado para la placa no es valido"
				)
		if  (self.numero_motor and not re.search(self.regex_numero_motor, self.numero_motor)):
			frappe.throw(
				title = titulo,
				msg = "El valor ingresado para el número de motor no es valido"
			)
		if (self.importe and self.importe <= 0):
			frappe.throw(
				title = titulo,
				msg = "El importe debe de ser mayor a cero"
			)
		if  (self.numero_pasajeros and self.numero_pasajeros <= 0):
			frappe.throw(
				title = titulo,
				msg = "El valor ingresado para el número de pasajeros no es valido"
			)

	def before_validate(self):
		if self.serie:
			self.serie = str.upper(self.serie)	
		if self.placa:
			self.placa = str.upper(self.placa)	
		if self.numero_motor:
			self.numero_motor = str.upper(self.numero_motor)	


@frappe.whitelist()
def send_vigencia_notifications():
		# Obtener la fecha actual y la fecha de un mes a partir de hoy
	print("CORREO ")
	current_date = today()
	one_month_later = add_months(current_date, 1)
	print(one_month_later)
	# Obtener todos los registros con fecha_vigencia_final a un mes de caducar
	records = frappe.get_all('Vehiculo', filters={'fecha_vigencia_final': one_month_later}, fields=['Serie', 'poliza', 'fecha_vigencia_final'])

	for record in records:
		print({record.Serie})
		mensaje = f"""
				Estimado usuario,

				El documento {record.Serie} está a punto de caducar el {record.fecha_vigencia_final}.
				
				Por favor, tome las acciones necesarias para renovar su vigencia.

				Saludos,
				Secretaría de Movilidad
			"""
		recipients = [
			'cypap77@hotmail.com',
			'nay7730@hotmail.com', 
			'cypap77@gmail.com'
		]
		print("A ENVIAR")
		
		frappe.sendmail(
			recipients=recipients,
			subject=frappe._('Vehiculos'),
			template='Foliomail',
			args=dict(
				reminder_text="Poliza por Vencer",
				birthday_persons=record,
				message=mensaje,
			),
			header=('Se acerca la fecha de vencimiento de su poliza')
		)
		
		print("PASO")
		return True