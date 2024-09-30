const header = document.querySelector("header");

const footer = document.querySelector('footer');

header.innerHTML = `
            <div class="logo" style="display: flex;justify-content: center ; align-items: center;">
                <img src="/img/preview.png" alt="Logo restaurante">
            </div>

            <!-- Menú en línea para pantallas anchas -->
            <ul class="menu">
                <li><a href="index.html">Inicio</a></li>
                <li><a href="menu-platos.html">Platos</a></li>
                <li><a href="bebidas-conalcohol.html">Bebidas con alcohol</a></li>
                <li><a href="bebidaSinAlcohol.html">Bebidas sin alcohol</a></li>
                <li><a href="postres.html">Postres</a></li>
                <li><a href="quienes-somos.html">Quiénes Somos</a></li>
                <li><a href="contacto.html">Contacto</a></li>
                <li><a href="./carrito.html" id="cart"><img src="./img/shopping-cart.png" style="width: 30px; alt=""><span id="cuenta-carrito">0</span></a></li>
            </ul>

            <!-- Botón hamburguesa para pantallas pequeñas -->
            <div class="w3-top">
                <div class="w3-green w3-xlarge" style="max-width:1200px;margin:auto">
                    <div class="w3-button w3-padding-10 w3-right" onclick="w3_open()">☰</div>
                </div>
            </div>
            `;

footer.innerHTML = `
<ul class="items-footer">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Platos</a></li>
                <li><a href="#">Bebidas con alcohol</a></li>
                <li><a href="#">Bebidas sin alcohol</a></li>
                <li><a href="#">Postres</a></li>
                <li><a href="#">Quiénes Somos</a></li>
                <li><a href="#">Contacto</a></li>
                
            </ul>
            <div class="social-media">
                <a href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                    <i class="fa-brands fa-instagram" style="color: #C13584;"></i>
                </a>
                <a href="https://twitter.com" target="_blank" aria-label="X">
                    <i class="fa-brands fa-x-twitter" style="color: #1DA1F2;"></i>
                </a>
                <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                    <i class="fa-brands fa-facebook" style="color: #1877F2;"></i>
                </a>
                <a href="https://wa.me/tu-numero" target="_blank" aria-label="WhatsApp">
                    <i class="fa-brands fa-whatsapp" style="color: #25D366;"></i>
                </a>
            </div>
            <p>Copyright &#9400; 2024: Chambuchito</p>
`
