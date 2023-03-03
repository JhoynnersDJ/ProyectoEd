// document.getElementsById('btn-registrarse').addEventListener("click", register)


// //declaracion de variables
// contenedor_login_register = document.querySelector(".contenedor-login");
// formulario_login = document.querySelector(".formulario-login");
// formulario_register = document.querySelector(".formulario-register");
// caja_trasera_login = document.querySelector(".caja_trasera-login");
// caja_trasera_register = document.querySelector(".caja_trasera-register");

// function register() {
//     formulario_register.style.display = "block";
//     contenedor_login_register.style.left = "410px";
//     formulario_login.style.display = "none";
//     caja_trasera_register.style.opacity = "0";
//     caja_trasera_login.style.opacity = "1";
// }
$(document).ready(function() {

    $("#btn-registrarse").click(function() {

        $(".formulario-register").css({
            "display": "block"
        }).animate({ left: "410px" })
        $(".caja-trasera-registrar").animate({
            opacity: "0"
        })
        $(".caja-trasera-login").animate({
            opacity: "1"
        })
        $(".formulario-login").css({
            "display": "none"
        })
        $(".formulario-login").animate({ left: "410px" })
    })

    $("#btn-login").click(function() {

        $(".formulario-login").css({
            "display": "block"
        }).animate({ left: "-50px" })
        $(".caja-trasera-registrar").animate({
            opacity: "1"
        })
        $(".caja-trasera-login").animate({
            opacity: "0"
        })
        $(".formulario-register").css({
            "display": "none"
        }).animate({ left: "-50px" })
    })
});