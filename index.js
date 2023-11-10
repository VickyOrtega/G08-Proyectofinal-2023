const express = require("express");
const exphbs = require("express-handlebars");
const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
} = require("firebase/auth");
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session'); //Para usar variables de sesión

const app = express();
app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(express.urlencoded({ extended: false })); // habria que ponerlo en true ??? el firebase de Paul lo tenia en true
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const Listen_Port = 3001;

app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});

app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCBZNavVfNszwuf9SEjJc7SpAgWIGYcd20",
  authDomain: "echenique-y-kunca.firebaseapp.com",
  projectId: "echenique-y-kunca",
  storageBucket: "echenique-y-kunca.appspot.com",
  messagingSenderId: "266379247966",
  appId: "1:266379247966:web:28a516afe6b7700b740fcf"
};
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Importar AuthService
const authService = require("./authService");

app.get("/", (req, res) => {
  res.render("home (2)");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.post("/deseahacer", (req, res) => {
  res.render("deseahacer");
});
app.get("/matrepaso", (req, res) => {
  res.render("matrepaso");
});
app.get("/ingrepaso", (req, res) => {
  res.render("ingrepaso");
});
app.get("/georepaso", (req, res) => {
  res.render("georepaso");
});
app.get("/cienrepaso", (req, res) => {
  res.render("cienrepaso");
});
app.post("/repaso", (req, res) => {
  res.render("repaso");
});
app.get("/juega", (req, res) => {
  res.render("juega");
});
app.get("/matjuego", (req, res) => {
  res.render("matjuego");
});
app.get("/ingjuego", (req, res) => {
  res.render("ingjuego");
});
app.get("/api", (req, res) => {
  res.render("api");
});
app.get("/deseahacer", (req, res) => {
  // Agrega aquí la lógica para mostrar la página del dashboard
  res.render("deseahacer");
});
app.get("/editar", (req, res) => {
  // Agrega aquí la lógica para mostrar la página del dashboard
  res.render("editar");
});
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    await authService.registerUser(auth, { email, password });
    await MySQL.realizarQuery(`INSERT INTO Usernamepf(nombre) VALUES (email)`)


    res.render("login", {
      message: "Registro exitoso. Puedes iniciar sesión ahora.",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.render("login", {
      message: "Error en el registro: " + error.message,
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await authService.loginUser(auth, {
      email,
      password,
    });
    // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
    if (email == "mvortega@pioix.edu.ar"){
      res.redirect("/admin")
    }
    else{
      res.redirect("/deseahacer");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.render("register", {
      message: "Error en el inicio de sesión: " + error.message,
    });
  }
});




