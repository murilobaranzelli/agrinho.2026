let itens = [];
let lixeiras = [];
let itemSelecionado = null;
let pontuacao = 0;

function setup() {
  createCanvas(1000, 600);

  // Lixeiras
  lixeiras.push(
    new Lixeira(100, 450, "Papel", color(0, 100, 255))
  );
  lixeiras.push(
    new Lixeira(325, 450, "Plástico", color(255, 0, 0))
  );
  lixeiras.push(
    new Lixeira(550, 450, "Vidro", color(0, 180, 0))
  );
  lixeiras.push(
    new Lixeira(775, 450, "Metal", color(255, 255, 0))
  );

  criarItens();
}

function draw() {
  background(220, 245, 220);

  fill(0);
  textSize(30);
  textAlign(CENTER);

  text("♻ Desafio da Reciclagem ♻", width / 2, 40);

  textSize(20);
  text("Pontuação: " + pontuacao, width / 2, 80);

  // Desenha lixeiras
  for (let l of lixeiras) {
    l.mostrar();
  }

  // Desenha itens
  for (let item of itens) {
    item.mostrar();
  }

  // Vitória
  if (itens.length === 0) {
    fill(0);
    textSize(40);
    text("Parabéns! Você reciclou tudo!", width / 2, 250);
  }
}

function mousePressed() {
  for (let item of itens) {
    if (item.contem(mouseX, mouseY)) {
      itemSelecionado = item;
      break;
    }
  }
}

function mouseDragged() {
  if (itemSelecionado) {
    itemSelecionado.x = mouseX;
    itemSelecionado.y = mouseY;
  }
}

function mouseReleased() {
  if (!itemSelecionado) return;

  let acertou = false;

  for (let l of lixeiras) {
    if (l.contem(mouseX, mouseY)) {

      if (l.tipo === itemSelecionado.tipo) {
        pontuacao += 10;

        itens.splice(
          itens.indexOf(itemSelecionado),
          1
        );

      } else {
        pontuacao -= 5;
        itemSelecionado.voltar();
      }

      acertou = true;
      break;
    }
  }

  if (!acertou) {
    itemSelecionado.voltar();
  }

  itemSelecionado = null;
}

function criarItens() {
  itens.push(
    new Item(150, 150, "📄 Jornal", "Papel")
  );

  itens.push(
    new Item(300, 150, "📦 Caixa", "Papel")
  );

  itens.push(
    new Item(450, 150, "🧴 Garrafa PET", "Plástico")
  );

  itens.push(
    new Item(600, 150, "🥤 Copo plástico", "Plástico")
  );

  itens.push(
    new Item(250, 280, "🍾 Garrafa", "Vidro")
  );

  itens.push(
    new Item(500, 280, "🫙 Pote", "Vidro")
  );

  itens.push(
    new Item(700, 280, "🥫 Lata", "Metal")
  );

  itens.push(
    new Item(850, 280, "🔩 Parafuso", "Metal")
  );
}

// ======================
// CLASSE ITEM
// ======================

class Item {
  constructor(x, y, nome, tipo) {
    this.x = x;
    this.y = y;

    this.inicioX = x;
    this.inicioY = y;

    this.nome = nome;
    this.tipo = tipo;
  }

  mostrar() {
    fill(255);
    stroke(0);

    rect(
      this.x - 50,
      this.y - 25,
      100,
      50,
      10
    );

    fill(0);
    noStroke();

    textSize(14);
    textAlign(CENTER, CENTER);

    text(this.nome, this.x, this.y);
  }

  contem(mx, my) {
    return (
      mx > this.x - 50 &&
      mx < this.x + 50 &&
      my > this.y - 25 &&
      my < this.y + 25
    );
  }

  voltar() {
    this.x = this.inicioX;
    this.y = this.inicioY;
  }
}

// ======================
// CLASSE LIXEIRA
// ======================

class Lixeira {
  constructor(x, y, tipo, cor) {
    this.x = x;
    this.y = y;
    this.tipo = tipo;
    this.cor = cor;
  }

  mostrar() {
    fill(this.cor);

    rect(
      this.x,
      this.y,
      120,
      120,
      10
    );

    fill(0);

    textSize(18);
    textAlign(CENTER);

    text(
      this.tipo,
      this.x + 60,
      this.y + 65
    );
  }

  contem(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + 120 &&
      my > this.y &&
      my < this.y + 120
    );
  }
}
