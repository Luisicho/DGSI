# Copyright (c) 2022, DGSTI / SAF and contributors
# For license information, please see license.txt

import frappe
from tkinter import commondialog

@frappe.whitelist()
def get_nuevo_numero_economico(municipio, modalidad):
	# TODO: poner lo siguiente en un try

	valores = frappe.get_value(
		"Nomenclatura numero economico",
		{ "municipio": municipio, "modalidad_permiso": modalidad },
		["prefijo", "consecutivo"],
		as_dict=1
	)

	if not valores:
		frappe.throw("No existe la información requerida para definir el nuevo número económico para la modalidad y municipio indicados.")

	cons = valores.consecutivo + 1
	valores.consecutivo = cons
	valores.numero_economico = f"{valores.prefijo}{cons:04d}"
	frappe.db.set_value("Nomenclatura numero economico", valores.prefijo, "consecutivo", cons)
	print(valores.numero_economico)
	return valores.numero_economico