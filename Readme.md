# Notas del [curso](https://www.udemy.com/course/react-native-expo-creando-mini-tripadvisor-de-restaurantes/)

Aqui se registraran las notas del curso, asi como observaciones o tips.


# Instalar node.js

Tomado de [tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)		


## Descargar

	curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh -o install_nvm.sh

## Ejecutar script

	bash install_nvm.sh

## Acceder 	

	source ~/.profile

## Listar versiones
	
	nvm ls-remote

## Instalar  y usar version  LTS (12.13.0)

	nvm install 12.13.0

	nvm use 12.13.0

	node -v


# Instalar [Yarn](https://yarnpkg.com/lang/en/)

Manejador de dependencias o paquetes alternativa a npm

	curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list	

	sudo apt update && sudo apt install yarn

	yarn --version	

	yarn -v	

## Instalar paquete

	yarn add nombre_de_paquete

## Eliminar paquete
	
	yarn remove nombre_de_paquete	
	

# Instalar [Reactive Native](https://facebook.github.io/react-native/docs/getting-started)

## Instalar con npm Yarn
	
	npm install -g expo-cli

	yarn global add expo-cli 


# Crear proyecto con expo-cli

	expo init miss-delicias	

Seleccionamos la plantilla y damos el nombre de la aplicación

	cd 	carpeta del proyecto

	yarn nombre_del_proyecto

## Ejecutar proyecto

	yarn start

## Cerrar proyecto

	ctrl + c	

Podemos leer el codigo QR, para ello debemos descargar la aplicación EXPO y crear una cuenta, en mi caso tuve que seleccionar en el navegador la conexión de tipo TUNNEL, lo cual permitio acceder desde la aplicación, la solución se encontro en el [foro](https://github.com/expo/expo-cli/issues/134)	

<< The "Network response timed out" error means your phone can not connect to the Expo CLI running on your computer. Here are some things you can check:

Is Expo CLI running? If not you can start it with expo start. Check that the URL matches the one shown in the Expo client app.
Does the URL shown in the app point to the IP address or hostname of your computer?
Is a firewall blocking access to this port (e.g. 19000) on your computer? If the firewall settings can't be changed, you might want to use the tunnel URL. Start Expo CLI with expo start --tunnel (or switch connection type in the sidebar of Expo Dev Tools). >>

Al intentar hacer el uso d ela emulación con Android Studio, no encontre la opción para configurar dispositivos, por ende no se pudo continuar. con esa solución.(queda pendiente la validación con un emulador).
	