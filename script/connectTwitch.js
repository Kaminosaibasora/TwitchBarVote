// https://github.com/instafluff/ComfyJS

// ========================= CANVA =========================

var canva = document.getElementById("canvas");
let ctx = canva.getContext('2d');

let drawTriangle = (ctx, x, y, taille) => {
    let x1 = x;
    let y1 = y;
    let x2 = x + taille / 2;
    let y2 = y + taille / 2;
    let x3 = x + taille / 2;
    let y3 = y - taille / 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
}

let drawVignette = (ctx) => {
    dataImage.forEach(vignette => {
        let img = new Image();
        img.src = "./images/" + vignette.src;
        img.addEventListener("load", () => {
            let x = 0;
            let new_width = 80;
            let new_height = img.height * 80 / img.width;
            if (new_height > 100) {
                new_height /= 2;
                new_width /=2;
                x += new_width / 2;
            }
            let y = calculYTriangleNote(vignette.note) - (new_height/2);
            // console.log(vignette.src + " : " + new_height + " - "+ y);
            if (y < 0) {
                y = 0
            } else if (y + new_height > canva.height) {
                y = canva.height - new_height
            }
            ctx.drawImage(img, x, y, new_width, new_height);
        }, false);
    });
}

let drawCanva = (ctx, y_triangle) => {
    ctx.clearRect(0, 0, canva.width, canva.height);
    let lineaire = ctx.createLinearGradient(0, 0, 0, canva.height);
    lineaire.addColorStop(0,'blue');
    lineaire.addColorStop(0.5, 'green');
    lineaire.addColorStop(1, 'red');
    ctx.fillStyle = lineaire;
    ctx.fillRect(100, 0, 50, canva.height)
    drawTriangle(ctx, 175, y_triangle, 50);
    drawVignette(ctx);
}

let calculYTriangleNote = (note) => {
    // WARNING : note / 100
    return 500 - note * canva.height / 100
}

drawCanva(ctx, 250)

// ========================= INIT Vote =========================

var indic = document.getElementById("indicmoyenne")
let button_vote = document.getElementById("actived_vote");
var actived_vote = false;
var data_vote = {};

button_vote.addEventListener('click', () => {
    activateVote();
})

let activateVote = () => {
    if (!actived_vote) {
        button_vote.textContent = "Vote en cours";
        actived_vote = true;
        indic.textContent = "moyenne : "
    } else {
        button_vote.textContent = "Vote";
        actived_vote = false;
        console.log(data_vote);
        data_vote = {}
    }
}

let addVote = (user, message) => {
    let value_vote = parseInt(message)
    if (value_vote && value_vote > 0 && value_vote <= 100) {
        data_vote[user] = value_vote
    }
}

let calculMoyenne = () => {
    moyenne = 0
    for (const votant in data_vote) {
        moyenne += data_vote[votant]
    }
    return moyenne / Object.keys(data_vote).length
}

// ========================= Gestion CHAT =========================

let channel = document.getElementById("channel").textContent;

ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    if( (flags.mod || flags.broadcaster )&& command === "vote" ) {
        activateVote();
    }
  }

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    // console.log( user + ":", message );
    // console.log(flags.mod + " - " + flags.broadcaster + " - " + flags.subscriber);
    if (actived_vote) {
        addVote(user, message)
        let y = calculYTriangleNote(calculMoyenne())
        drawCanva(ctx, y)
        indic.textContent = "moyenne : " + parseInt(calculMoyenne())
    }
}
ComfyJS.Init( channel );
