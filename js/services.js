class CargoDataStore {
    constructor() {
        this.data = new Map();
        [
            [
                "Вывоз стройматериалов",
                "Доставка сыпучих грузов",
                "Вывоз строительного мусора",
                "Аренда самосвалов",
            ],
            [
                "Офисный переезд",
                "Переезд компании",
                "Перевозка архивов",
                "Такелаж крупного офиса",
            ],
            [
                "Доставка товара",
                "Срочная экспресс‑доставка",
                "Межгород автоперевозки",
                "Доставка сборных грузов",
            ],
        ].forEach((arr, i) => {
            this.data.set(i, {
                services: [...arr],
                descriptions: [
                    `Краткое описание ${i + 1}-1`,
					`Второе описание ${i + 1}-2`,
					`Третье описание ${i + 1}-3`,
                ],
            });
        });
    }
    get(index) {
        return this.data.get(index);
    }
}

class CargoServiceEditor {
    constructor(rootDiv, store) {
        this.root = rootDiv;
        this.store = store;
    }

    createList(index, items) {
        const ol = document.createElement("ol");
        items.forEach((service) => {
            const li = document.createElement("li");
            li.textContent = service;
            ol.appendChild(li);
        });
        ol.dataset.index = index;
        return ol;
    }
    createParagraph(text) {
        const p = document.createElement("p");
        p.textContent = text;
        return p;
    }
    render() {
        this.root.innerHTML = "";
        for (const [index, block] of this.store.data.entries()) {
            const wrapper = document.createElement("div");
            wrapper.appendChild(this.createList(index, block.services));
            block.descriptions.forEach(txt =>
				wrapper.appendChild(this.createParagraph(txt)));

            this.root.appendChild(wrapper);
        }
    }
}

class CargoServiceEditorUI extends CargoServiceEditor {
    constructor(rootDiv, store) {
        super(rootDiv, store);
        this.render(); 
        this.bindControls();
    }

    addService(listIndex, text) {
        if (!text.trim()) return;
        const block = this.store.get(listIndex);
        block.services.push(text);
        const ol = this.root.querySelector(`ol[data-index="${listIndex}"]`);
        const li = document.createElement("li");
        li.textContent = text;
        ol.appendChild(li);
    }

    addDescription(position, text) {
        if (!text.trim()) return;
        this.root.childNodes.forEach((wrapper) => {
            const p = this.createParagraph(text);
            if (position === "before") {
                wrapper.insertBefore(p, wrapper.firstChild);
            } else {
                wrapper.appendChild(p);
            }
        });
    }
    bindControls() {
        const qs = (id) => document.getElementById(id);

        qs("add-service-btn").addEventListener("click", () => {
            const txt = qs("service-input").value;
            const idx = +qs("list-select").value;
            this.addService(idx, txt);
            qs("service-input").value = "";
        });

        qs("add-desc-btn").addEventListener("click", () => {
            const txt = qs("desc-input").value;
            const pos = qs("paragraph-position").value;
            this.addDescription(pos, txt);
            qs("desc-input").value = "";
        });
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const store = new CargoDataStore();
    const root = document.getElementById("cargo-editor");
    new CargoServiceEditorUI(root, store);
});