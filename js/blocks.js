const styleOptions = new Map([
  ["soft",   { padding: "1rem",  border: "2px solid #fff",      radius: "0.8rem" }],
  ["card",   { padding: "2rem",  border: "none",                radius: "1.5rem" }],
  ["thin",   { padding: "0.5rem",border: "1px solid #eee",      radius: "0.2rem" }],
  ["bold",   { padding: "1.5rem",border: "4px dashed #fff",     radius: "0.8rem" }],
  ["shadow", { padding: "1rem",  border: "none", boxShadow: "0 6px 15px rgba(0,0,0,0.2)", radius: "0.8rem" }],
]);

const backgroundOptions = new Map([
  ["wood",   "url(resource/bg-wood.jpg) center/cover"],
  ["metal",  "url(resource/bg-metal.jpg) center/cover"],
  ["stone",  "url(resource/bg-stone.jpg) center/cover"],
  ["paper",  "url(resource/bg-paper.jpg) center/cover"],
  ["fabric", "url(resource/bg-fabric.jpg) center/cover"],
]);


const titles = [
  "Новые возможности",
  "Грузоперевозки 24/7",
  "Снижение затрат",
  "Партнёрский сервис",
  "С нами выгодно",
];

const paragraphs = [
  "Доставка точно в срок.",
  "Работаем по всей стране.",
  "Гарантия целостности груза.",
  "Любая форма оплаты.",
  "Гибкие тарифы для бизнеса.",
];

class BlockManager {
  constructor(wrapperSelector, count = 6) {
    this.wrapper = document.querySelector(wrapperSelector);
    this.blocks = [];

    for (let i = 0; i < count; i++) {
      const div = document.createElement("div");
      div.className = "block";
      div.id = `block-${i}`;
      div.style.background = backgroundOptions.values().next().value; 
      div.innerHTML = `<h3>${titles[0]}</h3><p>${paragraphs[0]}</p>`;
      this.wrapper.appendChild(div);
      this.blocks.push(div);
    }
  }

  getBlock(index) { return this.blocks[index]; }
}

function applyStyle(styleKey) {
  const opts = styleOptions.get(styleKey);
  if (!opts) return;
  this.style.padding = opts.padding;
  this.style.border   = opts.border || "none";
  this.style.borderRadius = opts.radius;
  this.style.boxShadow = opts.boxShadow || "none";
}

function applyBackground(bgKey) {
  const bg = backgroundOptions.get(bgKey);
  if (bg) this.style.background = bg;
}

function applyContent(titleTxt, paragraphTxt) {
  const render = () => {
    this.innerHTML = `<h3>${titleTxt}</h3><p>${paragraphTxt}</p>`;
  };
  render();
}

class UIController {
  constructor(manager) {
    this.mgr = manager;
    this.blockSel = this.#fillSelect("block-select", manager.blocks.map((_, i) => i+1));
    this.styleSel = this.#fillSelect("style-select", [...styleOptions.keys()]);
    this.bgSel    = this.#fillSelect("bg-select",    [...backgroundOptions.keys()]);
    this.titleSel = this.#fillSelect("title-select", titles);
    this.textSel  = this.#fillSelect("text-select",  paragraphs);

    document.getElementById("apply-btn").addEventListener("click", () => this.apply());
  }

  #fillSelect(id, arr) {
    const sel = document.getElementById(id);
    arr.forEach((item, idx) => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = item;
      sel.appendChild(opt);
    });
    return sel;
  }

  apply() {
    const idx = +this.blockSel.value;      
    const blk = this.mgr.getBlock(idx);

    applyStyle.bind(blk)([...styleOptions.keys()][this.styleSel.value]);

    applyBackground.call(blk, [...backgroundOptions.keys()][this.bgSel.value]);

    applyContent.apply(blk, [titles[this.titleSel.value], paragraphs[this.textSel.value]]);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const manager = new BlockManager("#block-wrapper", 6);
  new UIController(manager);
});