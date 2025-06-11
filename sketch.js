let images = [];
let fragments = [];
let gridSize = 3; // 3x3 Kachelraster
let isLandscape = true; // Feste Landschaftsorientierung
let lastInteraction = 0; // Zeitstempel für Drosselung

// Vordefinierte Abfolge von Kombinationen (2-4 Ebenen)
const combinations = [
  [1, 2],        // LAYER_2 + LAYER_3
  [1, 2, 3],     // LAYER_2 + LAYER_3 + LAYER_4
  [0, 1, 2, 3],  // LAYER_1 + LAYER_2 + LAYER_3 + LAYER_4
  [2, 3, 4],     // LAYER_3 + LAYER_4 + Weiß
  [1, 3, 4]      // LAYER_2 + LAYER_3 + LAYER_4
];

function preload() {
  images = [
    loadImage('LAYER_1-min.jpg'),
    loadImage('LAYER_2-min.png'),
    loadImage('LAYER_3-min.png'),
    loadImage('LAYER_4-min.png'),
    null // Weißer Hintergrund
  ];
  // Überprüfe, ob Bilder geladen wurden
  for (let i = 0; i < images.length - 1; i++) {
    if (!images[i] || images[i].width === 0) {
      console.error(`Bild ${i} konnte nicht geladen werden: LAYER_${i + 1}-min.${i === 0 ? 'jpg' : 'png'}`);
    }
  }
}

function setup() {
  // Dynamische Canvas-Größe basierend auf Bildschirm
  let w = window.innerWidth;
  let h = window.innerHeight;
  createCanvas(w, h);
  pixelDensity(1);
  noSmooth();
  let context = canvas.getContext('2d');
