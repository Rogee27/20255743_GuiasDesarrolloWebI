document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Pantalla de carga (Loader)
    const loader = document.getElementById("loader");
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }, 2000); // El loader dura 2 segundos

    // 2. Cambio de color del Navbar al hacer scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. Carrusel fluido de fondo en la sección Hero
    const heroSection = document.getElementById("inicio");
    const images = [
        "url('https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", // Mall interior
        "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')", // Tienda elegante
        "url('https://images.unsplash.com/photo-1555529771-12028636fb48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"  // Café/Restaurante
    ];
    let currentIndex = 0;
    
    // Establecer la primera imagen
    heroSection.style.backgroundImage = images[0];

    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        heroSection.style.backgroundImage = images[currentIndex];
    }, 5000); // Cambia cada 5 segundos de forma fluida

    // 4. Animaciones al hacer Scroll (Intersection Observer)
    const scrollElements = document.querySelectorAll(".fade-scroll");

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add("visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            }
        })
    }

    // Comprobar animaciones en scroll
    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });
});