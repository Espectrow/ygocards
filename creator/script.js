document.getElementById("generate-card").addEventListener("click", function () {
    // Obtener los valores de los campos
    const cardType = document.getElementById("card-type").value;
    const cardLevel = document.getElementById("card-level").value;
    const cardAttribute = document.getElementById("card-attribute").value;
    const cardName = document.getElementById("card-name").value;
    const cardAttack = document.getElementById("card-attack").value;
    const cardDefense = document.getElementById("card-defense").value;
	
	// Función para validar el campo de ataque/defensa
function validateAttackDefenseInput(event) {
    const input = event.target;
    // Permitir solo números y el símbolo "?"
    input.value = input.value.replace(/[^0-9?]/g, '');  // Solo permite números o "?"
}

// Agregar el evento 'input' a los campos de ataque y defensa
document.getElementById("card-attack").addEventListener("input", validateAttackDefenseInput);
document.getElementById("card-defense").addEventListener("input", validateAttackDefenseInput);


    // Validar entradas
    if (!cardType || !cardLevel || !cardAttribute || !cardName || !cardAttack || !cardDefense) {
        alert("Por favor, completa todos los campos antes de generar la carta.");
        return;
    }

    const canvas = document.getElementById("card-canvas");
    const ctx = canvas.getContext("2d");

    // Cargar la imagen del monstruo
    const monsterImage = new Image();
    const file = document.getElementById("monster-image").files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            monsterImage.src = event.target.result;

            monsterImage.onload = function () {
                // Establecer la posición de la imagen del monstruo
                const x = 0;
                const y = 0;

                // Determinar la URL de la imagen de fondo según el tipo de carta
                let cardBackgroundURL;
                switch (cardType) {
                    case "monster-normal":
                        cardBackgroundURL = "monster-normal-bg.png";
                        break;
                    case "monster-effect":
                        cardBackgroundURL = "monster-effect-bg.png"; 
                        break;
                    case "token":
                        cardBackgroundURL = "token-bg.png"; 
                        break;
                    default:
                        alert("Tipo de carta no reconocido.");
                        return;
                }

                // Determinar la URL de la imagen del atributo
                let attributeImageURL;
                switch (cardAttribute) {
                    case "luz":
                        attributeImageURL = "light.png";
                        break;
                    case "water":
                        attributeImageURL = "https://i.ibb.co/tbBCBDL/water.png";
                        break;
                    case "fire":
                        attributeImageURL = "https://i.ibb.co/tbBCBDL/fire.png";
                        break;
                    // Agrega más casos según tus atributos
                    default:
                        alert("Atributo no reconocido.");
                        return;
                }

                // Determinar la URL de la imagen de estrellas
                let cardStarURL;
                switch (cardLevel) {
                    case "1":
                        cardStarURL = "star_1.png";
                        break;
                    case "2":
                        cardStarURL = "star_2.png"; 
                        break;
                    case "3":
                        cardStarURL = "star_3.png"; 
                        break;
                    // Agrega más casos según los niveles que necesites
                    default:
                        alert("Nivel no reconocido.");
                        return;
                }

                const backgroundImage = new Image();
                backgroundImage.crossOrigin = "Anonymous"; // Permitir CORS
                backgroundImage.src = cardBackgroundURL;

                const attributeImage = new Image();
                attributeImage.crossOrigin = "Anonymous"; // Permitir CORS
                attributeImage.src = attributeImageURL;
                
                const starImage = new Image();
                starImage.crossOrigin = "Anonymous"; // Permitir CORS
                starImage.src = cardStarURL;

                backgroundImage.onload = () => {
                    // Limpiar el canvas antes de dibujar
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    // Dibujar la imagen del monstruo
                    ctx.drawImage(monsterImage, x, y, 200, 200); // Coloca y redimensiona aquí
                    
                    // Dibujar el fondo
                    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

                    // Establecer el texto después de dibujar la imagen del monstruo
                    setCardText(ctx, cardName, cardLevel, cardAttribute, cardAttack, cardDefense);

                    // Cargar y dibujar la imagen del atributo
                    attributeImage.onload = () => {
                        ctx.drawImage(attributeImage, 0, 0); // Dibuja la imagen del atributo

                        // Cargar y dibujar la imagen de estrellas
                        starImage.onload = () => {
                            ctx.drawImage(starImage, 0, 0); // Ajusta la posición y tamaño de las estrellas

                            // Mostrar la carta en la vista previa
                            document.getElementById("card-output").src = canvas.toDataURL("image/jpeg", 1.0);
                            document.getElementById("card-output").style.display = "block";

                            // Mostrar el botón de descarga
                            const downloadLink = document.getElementById("download-card");
                            downloadLink.href = canvas.toDataURL("image/jpeg", 1.0);
                            downloadLink.style.display = "block";
                        };

                        starImage.onerror = () => {
                            alert("Error al cargar la imagen de estrellas.");
                        };
                    };

                    attributeImage.onerror = () => {
                        alert("Error al cargar la imagen del atributo.");
                    };
                };

                backgroundImage.onerror = () => {
                    alert("Error al cargar la imagen de fondo.");
                };
            };
        };
        reader.readAsDataURL(file);
    }
});

// Función para establecer el texto en la carta
function setCardText(ctx, name, level, attribute, attack, defense) {
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;

    // Estilo para el nombre (fuente MatrixSmallCaps, blanco, borde negro, tamaño 16px)
    ctx.font = "bold 15px MatrixSmallCaps"; // Usar la fuente personalizada

    // Dibujar el borde del nombre con opacidad al 100%
    ctx.globalAlpha = 1.0; // Opacidad al 100% para el borde
    ctx.strokeStyle = "black"; // Color del borde
    ctx.lineWidth = 1.5; // Grosor del borde

    // Calcular el ancho del texto para centrarlo
    const textWidth = ctx.measureText(name).width;
    const x = (canvasWidth - textWidth) / 2; // Centrado en el eje X
    const y = canvasHeight - 10; // Posición Y a 15px del borde inferior

    // Dibujar el borde del texto
    ctx.strokeText(name, x, y);

    // Cambiar la opacidad para el relleno del texto (95%)
    ctx.globalAlpha = 0.90; // Opacidad al 95% para el relleno
    ctx.fillStyle = "white"; // Color del relleno (blanco)

    // Dibujar el relleno del nombre
    ctx.fillText(name, x, y);

    // Restaurar la opacidad al 100% para el resto de los textos
    ctx.globalAlpha = 1.0;

    // Estilo para los atributos sin borde (Nivel, Atributo, Ataque, Defensa)
    ctx.font = "bold 24px MatrixSmallCaps"; // Fuente para los atributos sin borde
    ctx.fillStyle = "black"; // Color de relleno, sin borde

    // Dibujar los atributos sin borde
    // Centrar el valor de ataque
    const attackWidth = ctx.measureText(`${attack}`).width;
    const attackX = 10 + (64-attackWidth) / 2; // Ajusta según el ancho deseado
    ctx.fillText(`${attack}`, attackX, 252.5);

    // Centrar el valor de defensa
    const defenseWidth = ctx.measureText(`${defense}`).width;
    const defenseX = 125 + (64-defenseWidth) / 2; // Ajusta según el ancho deseado
    ctx.fillText(`${defense}`, defenseX, 252.5);
}





// Función para ajustar la imagen del monstruo
function updateMonsterImage() {
    const fileInput = document.getElementById("monster-image");
    const monsterCanvas = document.getElementById("image-canvas");
    const monsterCtx = monsterCanvas.getContext("2d");

    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        const monsterImage = new Image();
        monsterImage.src = event.target.result;

        monsterImage.onload = function () {
            // Limpiar el canvas antes de dibujar la nueva imagen
            monsterCtx.clearRect(0, 0, monsterCanvas.width, monsterCanvas.height);
            // Ajustar la imagen al canvas
            monsterCtx.drawImage(monsterImage, 0, 0, monsterCanvas.width, monsterCanvas.height);
        };

        monsterImage.onerror = function () {
            alert("Error al cargar la imagen del monstruo.");
        };
    };

    reader.onerror = function () {
        alert("Error al leer el archivo de imagen.");
    };

    reader.readAsDataURL(file);
}

document.getElementById("monster-image").addEventListener("change", updateMonsterImage);
