// Copyright (c) 2023, DGSTI / SAF and contributors
// For license information, please see license.txt
var regex_letras = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü. ]*$/;

frappe.ui.form.on('Perfil', {
			perfil: function(frm) {
				frm.set_value("perfil", frm.doc.perfil.toUpperCase());
				frm.set_df_property("perfil", "invalid", !(regex_letras.test(frm.doc.perfil)));
				frm.get_field("perfil").set_invalid();
			}

});
