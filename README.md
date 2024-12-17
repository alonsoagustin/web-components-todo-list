# ToDoApp

Aplicación web que permite gestionar tareas de forma sencilla y eficiente. Los usuarios pueden agregar, marcar como completadas y eliminar tareas, con persistencia en el almacenamiento local del navegador (localStorage).

## Características

- **Agregar tareas**: Permite agregar nuevas tareas con un identificador único, contenido y estado inicial.
- **Marcar tareas como completadas**: Los usuarios pueden marcar tareas como completadas, y estas se actualizan visualmente.
- **Eliminar tareas**: Se puede eliminar una tarea completada, lo que actualiza el estado y la interfaz.
- **Persistencia de datos**: La aplicación guarda las tareas en `localStorage`, asegurando que los datos se mantengan entre recargas del navegador.

## Tecnologías utilizadas

- **HTML5**
- **JavaScript (ES6+)**
- **Web Components**: Uso de Shadow DOM para encapsular los componentes de la interfaz.
- **localStorage**: Para la persistencia de tareas.

## Instalación y uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/alonsoagustin/web-components-todo-list.git
   ```

2. Abre el archivo `index.html` en tu navegador.

3. Comienza a agregar, completar y eliminar tareas.

## Mejoras futuras

- Implementación de filtrado de tareas (completadas, activas, eliminadas).
- Integración con una base de datos externa o API REST.
- Agregado de notificaciones o recordatorios.
