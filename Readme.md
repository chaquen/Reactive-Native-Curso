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

## Emular en Android Studio

Para instalar sigas las instrucciones de la [pagina oficial](https://developer.android.com/studio/install) de android studio, luego ingrese a Android studio y cree un nuevo dispositivo, en caso de generarse un error de permisos ver error 1, luego de esto ejecute la aplicación y siga las instrucciones para emular en android, esto puede tardar un poco mientras se instala la aplicación en el emulador.

### error 1
Solucion error de permisos para descargar SDK, ver [link](https://stackoverflow.com/questions/37300811/android-studio-dev-kvm-device-permission-denied/45749003) 

ubicación Android Studio en mi equipo 

	/usr/local/android-studio-ide-191.5977832-linux/android-studio/bin
	

# Notas de desarrollo


Cambio a modo desarrollo
	
Ingrese a la carpeta del proyecto y acceda al archivo package.json y cambie el valor de la propiedad start por dev
	
	"start": "expo start",

	"dev": "expo start",

## Librerias

Instalar librerias para agregar componenetes a el proyecto

[Reactive Native Elements](https://react-native-elements.github.io/react-native-elements/docs/overview.html)

	yarn add react-native-elements

[Reactive Native Navigation](https://reactnavigation.org/docs/en/getting-started.html)

	yarn add react-navigation

	yarn add react-navigation-stack

	yarn add react-navigation-tabs

	yarn add react-native-gesture-handler@1.3.0

	yarn add react-native-reanimated@1.2.0 


# Firebase

## Paso 1.
Crear una cuenta en firebase

## Paso 2.
Crear proyecto web en la pestaña Project Overview.

## Paso 3.
Copiar el script generado por Firebase.

## Paso 4. 
Instalar firebase en el proyecto
	
	yarn add firebase 

## Paso 5.
Agregar configuración de firebase ver archivo utils/Firebase.js

## Paso 6.
Habilitar el medio de acceso, para ello se debe ir a la consola de Firebase y en la opción Authentication, seleccionar el metodo que vamos a habilitar. 

## ¿Cómo crear Login con facebook?

Debes crear un aplicación en [facebook developer](https://developers.facebook.com/), allí deberas registrar las plataformas que deseas usar desde facebook, en nuestro caso IOS/Andoid, para ello ve al costado ixzquierdo y en el botón configuración > basico, 
y al final de esa página debes agregar una plataforma debes agregar tantas plataformas como quieras en nuestro caso dos
Para las palataformas debemos registrar una serie de datos en facebook, por eso debemos seguir las intrucciones de el siguiente [sitio](https://docs.expo.io/versions/latest/sdk/facebook/), 

### Para IOS
        Bundle ID >> host.exp.Exponent 
### Para Android
        Key Hashes >> rRW++LUjmZZ+58EbN5DVhGAnkX4=

Luego de esto debemos registrar el nuevo medio de login en nuestra consola de firebase, una vez en la consola y dentro de nuestro proyecto habilitamos el nuevo medio de login en este caso login, allí debemos ingresar dos datos importantes que podremos obtener desde la misma ubicación donde registramos las plataformas en facebook, dichos datos son **App ID** y **App Secret**  

Una vez registrada la configuración debemos agregar el paquete expo-facebook
    
        yarn add expo-facebook

### ERROR CON LOGIN FACEBOOK

Al instalarse el paquete expo-facebook, genero un error en el que me indicaba que las versiones de expo(35.0) y facebook(8.0) no eran compatibles, sin embargo expo no funcionaba por lo que se tuvo que instalar globalmente de nuevo
por favor seguir la guía [aqui descrita](https://github.com/expo/expo-cli/issues/591)
    
        sudo npm install -g --unsafe-perm expo-cli

### Habilitar Storage en Firebase

Debemos acceder a la consola de [firebase](https://console.firebase.google.com/) una vez allí, en la partae izquierda seleccionar la opción storage, dar siguiente, luego de ello, debemos seleccionar la ubicación, luego podremos modificar las reglas y crear las carpetas que necesitemos.

Ejemplo de las reglas de firebase
		
		rules_version = '2';
		service firebase.storage {
  			match /b/{bucket}/o {
					match /{allPaths=**} {
						allow read, write: if request.auth != null;
					}
  				}
			}
### Modificando las reglas de firebase

Ahora le indicamos que todos podrán leer los archivos, pero que solo podran escribir en nuestra carpeta si esta logueado


		rules_version = '2';
		service firebase.storage {
		  match /b/{bucket}/o {
		    match /{allPaths=**} {
		      allow read;
		      allow write: if request.auth != null;
		    }
		  }
		}

## Accediendo a dispositivos del móvil

### Permisos 

Cuando queremos acceder a información sensible de nuestros usuarios, debemos solitar permisos para ello podemos usar el paquete [*expo-permissions*](https://docs.expo.io/versions/latest/sdk/permissions/)

		expo install expo-permissions


### Image Picker
			
Paraa cceder a la galeria de imagenes debemos instalar un paquete [*ImagePicker*](https://docs.expo.io/versions/latest/sdk/imagepicker/) que nos provve dicha funcionalidad, para instalarlo debemos ejecutar el comando:

		expo install expo-image-picker


### Agregando [react-native-action-button](https://yarnpkg.com/package/react-native-action-button)

Esta funcionalidad permite agregar un boton flotante, para agregar este paquete use el comando

		yarn add react-native-action-button

##  Agrgar un mapa a nuestra app

Para ello vamos a usar el paquete [map-view](https://docs.expo.io/versions/latest/sdk/map-view/) el cual nos permite interactuar con mapas, para instalarlo debemos usar el comando

		expo install react-native-maps

# Agregar permisos geolocalización en nuestro dispositivo

Debemos usar el paquete [Location](https://docs.expo.io/versions/latest/sdk/location/) que nos permitira acceder a la geolocalización para instalarlo debemos usar el comando
	
		expo install expo-location
De igual manera debemos agreagar en nuestro archivo App.json
	
	...
	},
	"android":{
      "permissions":["CAMERA_ROLL","LOCATION"]
    },


## Crear Id's dinamicos, *estos paquetes estan en constante cambio* 

Instalamos paquetes para crear Id's dinamicos, con el pquete [uuid](https://yarnpkg.com/package/uuid) en este caso para las imagenes

		yarn add uuid@~3.3.3

Además de importarse de la siguiente forma 

		import uuid from "uuid/v4";
Debe usarse 

		uuid();



## Manejo de Storage con firebase

Accedemos a la [consola](https://console.firebase.google.) de firebase, seleccionamos la opción **Database**, del grupo de opciones que aparece en el costado izquierdo,  en mi caso, estaba activa  la opción DataStore, en este caso pude cambiarla a modo nativo que es como se muestra en el tutorial (video 83 ), de allí se genera una configuración, pero ese cambio solo se puede hacer al inicio, una vez cambiado no se puede volver a realizar cambios  

		rules_version = '2';
		service cloud.firestore {
			match /databases/{database}/documents {
				match /{document=**} {
					allow read, write: if false;
				}
			}
		}

Se debe cambiar esta linea a valor ***allow read, write: if false;***   =>  ***true*** 

		allow read, write: if true;
	
## Agregar un carrousel de imagenes

Agrega un componenete de carrousel para tu aplicación 

		yarn add react-native-banner-carousel

## Abrir un mapa para buscar el camino mas cercano
	[puedes buscar mas información aquí](https://classic.yarnpkg.com/es-ES/package/react-native-open-maps)

	yarn add react-native-open-maps

## Buscar en Firebase
Para ello vamos a usar el paquete [firesql](https://yarnpkg.com/package/firesql)

	yarn add firesql

## Para retarasar renderizado  [use debounce](https://yarnpkg.com/package/use-debounce)

	yarn add use-debounce

## Cambiar el icono de la aplicación

Para ello debemos ir a la carpeta ***assets*** y cambiar el archivo ***icon.png***, se debe tener en cuenta que este archivo debe tener las siguientes especificaciones:

	Proporción 192 x 192 pixeles
	espacio de color RGB
	IOS : NO acepta transaparencias en el icono
	ANDROID: SI acepta tranparencias en el icono
	Como recomendación debe ser un icono SIN tranparencias
	Formato PNG

## Cambiar el splash split
El splash split es la imagen que aparece al entrar o recargar la app, en desarrollo aparece una imagen con un cruadrado.

Se recomienda que la imagen tenga la especificación de 
	1242 x 2036 pixeles
	espacio de color RGB 
	Formato PNG

## Cambiar el background color de la aplicación
Para ello debe ir a el archivo ***app.json*** y cambiar el valor ***baackgroundColor** en este caso vamos a usar el color [#00a680](https://www.colorhexa.com/00a680)

	"splash": {
      ...
      "backgroundColor": "#00a680"
    },