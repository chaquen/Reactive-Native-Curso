# Errores generados, 


# 1
## console.error "React Native version mismatch":

### Descripcion.
Se muestra un mensaje "React Native version mismatch", 
### Como generar error
Ejecute el comando
	
	expo init nombre_proyecto

Esto generara un proyecto, tenga en cuenta que el cliente expo de su celular debe soportar hasta la version 35, en caso de soportar la version 36 no se presentara el error.	

### Solución 
Actualizar la aplicación Expo en el celular el cual cuenta con la version 36 de SDK

# 2

## console.error "Error: ENOSPC: System limit for number of file watchers reached":

### Descripcion.
Se muestra un mensaje "Error: ENOSPC: System limit for number of file watchers reached, watch ‘/home/ahmad/Desktop/new/jitsi-meet/node_modules/source-list-map’", a tratar de generar la aplicación 
### Como generar error
Ejecute el comando
	
	yarn dev

Esto compilara el proyecto, pero generará el mensaje mensionado	

### Solución 
 ejecutar el comando

	echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

### Solución tomada de

	
	https://community.jitsi.org/t/react-native-start-return-this-error/17919
	https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve 
