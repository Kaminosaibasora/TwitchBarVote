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

let drawCanva = (ctx, y_triangle) => {
    ctx.clearRect(0, 0, canva.width, canva.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(100, 0, 50, canva.height)
    drawTriangle(ctx, 175, y_triangle, 50);
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
    if (!actived_vote) {
        button_vote.textContent = "Vote en cours";
        actived_vote = true;
        indic.textContent = "moyenne : "
    } else {
        button_vote.textContent = "Vote";
        actived_vote = false;
        console.log(data_vote);
        data_vote = {}
        indic.textContent = ""
    }
})

let addVote = (user, message) => {
    let value_vote = parseInt(message)
    if (value_vote && value_vote > 0 && value_vote <= 100) {
        if (user == "kami_sama_de_l_eternite") {
            user = value_vote + "vote"
        }
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

ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    console.log( user + ":", message );
    if (actived_vote) {
        addVote(user, message)
        let y = calculYTriangleNote(calculMoyenne())
        drawCanva(ctx, y)
        indic.textContent = "moyenne : " + calculMoyenne()
    }
}
ComfyJS.Init( "InconnuDAY" );
