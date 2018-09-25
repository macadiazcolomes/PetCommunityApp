# PetCommunityApp

TFM UPV

Trabajo de fin de Máster Universidad Politécnica de Valencia

Instrucciones de instalación:

Es necesario tener las siguientes API Keys:

- Google maps (para mapas y places)
- OneSignal (notificaciones push)

En /src/index.html, hay que reemplazar YOUR_API_KEY, por la api key de google

 <!--Google maps-->
<script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY"></script>
 <!--Google places-->
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>

Hay que crear un archivo llamado config.js en /src/providers/config.js que tenga el siguiente contenido (con vuestros propios parámetros=:

export const MONGODB_URL_BASE = 'mongoserver.com:3001'; //host:port

export const MONGODB_URL = 'http://' + MONGODB_URL_BASE + '/pca';

export const SOCKET_URL = 'http://socketserver:3002'; //host:port

export const LOGIN_TOKEN_STORAGE_VAR = 'access_token';

export const USERID_STORAGE_VAR = 'user_id';

export const GOOGLE_MAPS_APIKEY = 'your-google-map-api-key;

//PUSH
export const ONE_SIGNAL_APP_ID = 'one-signal-app-id';

export const FIREBASE_SENDER_ID = 'firebase_sender_id';
