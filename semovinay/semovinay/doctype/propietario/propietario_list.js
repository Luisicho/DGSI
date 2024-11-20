frappe.listview_settings['Propietario'] = {
    add_fields: [],

    get_indicator(doc) {
        // customize indicator color
        if (doc.status === "ACTIVO") {
            return ["ACTIVO", "green", "public,=, Yes"];
        } else {
            return ["INACTIVO", "red", "public,=, Yes"];
        }
    },
}