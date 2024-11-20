## App de Servicio Público

LIGA:

<<<<<<< HEAD
https://bitbucket.org/saf-gobnay/app-servicio-publico/src/develop/
=======

### Reglas generales para el desarrollo de la aplicación
>>>>>>> ed4c5a8c7240068e01d59ad8f4ec3d22980a4109

https://berumen@bitbucket.org/saf-gobnay/app-servicio-publico.git

***Dentro de la ruta frappe-bench:
bench get-app --branch develop https://berumen@bitbucket.org/saf-gobnay/app-servicio-publico.git


Compu PBR Gobierno
ATBB9bcjrdxqLTbsnMTbFzwMVjC51E20681E


Instalar la aplicacion
bench install-app semovinay

para comprobar:
bench start

En en navegador:
http://movilidad.localhost:8000/app

En build:
crear los doctype con el modulo SEMOVINAY

<<<<<<< HEAD
---------
Desinstalar la app anterior
bench uninstall-app movilidad_nayarit
atálogos basados en fuentes externas (federales, aseguradoras, etc.),
=======
    - Si es o no obligatorio.

- Además de lo anterior, pueden definirse parámetros opcionales, p.ej:

    - Si es o no de solo lectura.
    - Si estará oculto en la lista o en el formulario.
    - Si estará oculto o no en un informe/reporte.
    - Si debe "setearse" solo una vez ("Set only once").
    - etc.

- El nombrado de los registros (definición de llave primaria):
    - Si el tipo de tabla es un catálogo predefinido, donde no se agreguen nuevos elementos (o sea esporádico);
      p.ej. tipos de trámite, tipos de persona, tipos de vialidad, etc., entonces la recomendación es que no
      se incluya un campo adicional para el ID (o "name" como lo usa frappe) y solamente se incluyan los campos
      de atributos de la colección, y el nombrado del DocType definirlo como "Autoincremental".

            name | descripcion		vs.     name | clave | descripcion
            1    | ELEMENTO 1		        1    | 1     | ELEMENTO 1
            2    | ELEMENTO 2		        2    | 2     | ELEMENTO 2

    - Si el catálogo utiliza valores de negocio para indicar su identificación (p.ej. claves vehiculares,
      estados, código postal, etc.) entonces la recomendación sería: agregar un campo de clave para identificar
      cada registro, agregar los otros atributos requeridos e indicar el nombrado como "fieldname" o "expression"
      (fieldname se utilizaría cuando el ID sea idéntico a un solo valor y expresión cuando se tuviera qu
      concatenar un identificador con varios de sus elementos).
      Ejemplo de uso mediante expresión:

            tipo_vehiculo | marca | version | linea | name
            0             | 01    | 01      | 05    | 0010105

        Ejemplo de uso mediante fieldname:

            clave | nombre  | name
            18    | NAYARIT | 18

    - Para definir los campos de clave (cuando vengan predefinidas como valores de negocio, p.ej. 63000 de un
      código postal o 18 para un estado), debe definirse como tipo de dato "Datos", para permitir ingresar ceros
      a la izquierda o inclusive que se pueda validar la longitud.

- Si hay un catálogo que sea importante gestionar la bitácora de cambios (p.ej. las organizaciones y sus
  gestores), recomendable habilitar la opción de "Rastrear cambios" para mantener un historial de sus cambios.


#### Definición de validaciones

- Debe validarse usando código de JavaScript y de Python (respectivamente en los archivos `doctype.js` y
  `doctype.py`), para evitar cualquier riesgo de que no se ejecuten las validaciones en el frontend (o se
  generen errores durante su ejecución).

- Cuando se tenga un formato específico (p.ej. RFC, CURP, VIN, etc.), se recomienda usar una expresión regular.
  Se puede remitir al sitio [regex101](https://regex101.com/) para buscar, probar y validar las expresiones
  regulares a usar en el código.

- Cuando sean validaciones normales, p.ej. que solo se admitan dígitos numéricos, se puede usar código estándar
  de cada lenguaje (p.ej. `valor.isnumeric()` para Python o `int(valor)` para JavaScript) para convertir y validar
  que realmente tenga ciertas características el dato.

- Igual que el anterior sería situaciones donde no deban ingresarse caracteres especiales o números, etc.

- Validaciones estándar: longitud, tipo de dato (caracter / dígito), fechas, etc.


- - - - -

### Nombrado de ramas y commits

Para implementar el proyecto en un ambiente compartido (usando cuentas de usuario compartidas en el repositorio
de Bitbucket), se recomienda que se sigan los siguientes lineamientos:

- En el caso de los mensajes de cada commit, debe anteponerse dos letras o iniciales en mayúsculas del nombre del
  desarrollador que realiza dicho commit. Por ejemplo: `ZG: Se genera el DocType de 'Tipos de tramite'`.

- Para el caso de las ramas debe seguirse un procedimiento similar: anteponer las mismas letras o iniciales (en
  este caso en minúsculas) del nombre del desarrollador al nombre de la rama utilizado, para poder determinar fácilmente al dueño o responsable de dicha rama. Por ejemplo: `ab-dt-claves_vehiculares`.


- - - - -

### Responsabilidades de cada desarrollador

- Crear los DocType's que tenga asignados
- Definir estructura de formulario (formato, secciones, etc.)
- Definir validaciones en código
- Ubicar datos base cuando sean catálogos predefinidos, p.ej. estados, códigos postales, claves vehiculares;
  importarlos a su ambiente, verificarlos y a continuación generar el archivo de
  [fixtures](https://frappeframework.com/docs/v14/user/en/python-api/hooks#fixtures) correspondiente para
  que se incluyan con el proyecto. Si son catálogos basados en fuentes externas (federales, aseguradoras, etc.),
>>>>>>> ed4c5a8c7240068e01d59ad8f4ec3d22980a4109
  se recomienda que se descarguen dichos datos de sus fuentes origen en vez de utilizar alguna copia que se
  mantenga localmente o en alguna base de datos existente, y así asegurar las versiones más actuales de dicha
  información.

- - - - -

### Referencias

- [Documentación de Frappe Framework](https://frappeframework.com/docs/v14/user/en/introduction)
- [Guía rápida de Python](https://www.pythoncheatsheet.org/)
- [Guía rápida de JavaScript](https://htmlcheatsheet.com/js/)
<<<<<<< HEAD
=======
- [Documentación del lenguaje para plantillas Jinja](https://jinja.palletsprojects.com/en/3.1.x/templates/)
- [Documentación de Bootstrap (estilos usados en reportes)](https://getbootstrap.com/docs/4.6/getting-started/introduction/). Nota: Frappe utiliza la versión 4.x de esta librería.
>>>>>>> ed4c5a8c7240068e01d59ad8f4ec3d22980a4109
