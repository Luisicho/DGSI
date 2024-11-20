// Copyright (c) 2023, DGSTI / SAF and contributors
// For license information, please see license.txt

frappe.ui.form.on('Usuario perfil', {
	refresh: function(frm) {
		frm.set_query('municipio', () => {
			return {
				filters: { 'id_estado': '18' }
			}
		})
	}
});
