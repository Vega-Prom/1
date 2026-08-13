const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

$("#year").textContent = new Date().getFullYear();

$("#menuBtn").addEventListener("click", () => $("#nav").classList.toggle("open"));
$$("#nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

$$(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    $$(".product-card").forEach(card => {
      card.style.display = filter === "all" || card.dataset.category === filter ? "flex" : "none";
    });
  });
});

const products = {
  p1: {
    title: "ВЕГА-Пром «2 в 1», 25 кг",
    desc: "Полимерная шпатлевочная сухая смесь для внутренних работ.",
    specs: [["Вес", "25 кг"], ["Назначение", "внутренние отделочные работы"], ["Цена на карточке", "2 500 ₸"]]
  },
  p2: {
    title: "ВЕГА-Пром BELKOL, 30 кг",
    desc: "Гипсовая штукатурка для выравнивания стен и потолков внутри сухих помещений.",
    specs: [["Основа", "гипсовая"], ["Вес", "30 кг"], ["Толщина слоя", "2–90 мм"], ["Температура применения", "+5…+35 °C"], ["Расход смеси", "≈13 кг/м² при слое 10 мм"], ["Жизнеспособность", "40 мин"], ["Нанесение", "ручное / машинное"], ["Цена на карточке", "2 800 ₸"]],
    source: "Характеристики сверены по карточке Kaspi."
  },
  p3: {
    title: "Клей ВЕГА-Пром для облицовки плиткой, 25 кг",
    desc: "Универсальная клеевая смесь для внутренних и наружных работ.",
    specs: [["Вес", "25 кг"], ["Назначение", "плитка, натуральный камень, газоблок"], ["Толщина слоя", "3–8 мм"], ["Расход", "5–7 кг/м²"], ["Температура", "+10…+30 °C"], ["Морозостойкость", "F25"], ["Цена на карточке", "1 200 ₸"]],
    source: "Характеристики сверены по карточке Kaspi."
  },
  p4: {
    title: "ВЕГА-Пром R12 PLUS, 25 кг",
    desc: "Сухая клеевая строительная смесь в упаковке 25 кг.",
    specs: [["Вес", "25 кг"], ["Тип", "клеевая смесь"], ["Цена на карточке", "1 850 ₸"]]
  }
};

const dialog = $("#productDialog");
$$(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const p = products[btn.dataset.product];
    $("#dialogContent").innerHTML = `
      <div class="dialog-inner">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <table>${p.specs.map(s => `<tr><td>${s[0]}</td><td><strong>${s[1]}</strong></td></tr>`).join("")}</table>
        ${p.source ? `<div class="dialog-source">${p.source}</div>` : ""}
      </div>`;
    dialog.showModal();
  });
});
$("#closeDialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });

function formatMoney(n) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " ₸";
}
function updateGasCalc() {
  const [perM3] = $("#blockSize").value.split("|").map(Number);
  const volume = Math.max(0, Number($("#volume").value) || 0);
  $("#blockCount").textContent = new Intl.NumberFormat("ru-RU").format(Math.ceil(perM3 * volume)) + " шт.";
  $("#totalPrice").textContent = formatMoney(37000 * volume);
}
$("#blockSize").addEventListener("change", updateGasCalc);
$("#volume").addEventListener("input", updateGasCalc);
updateGasCalc();

$("#orderGas").addEventListener("click", () => {
  const size = $("#blockSize").options[$("#blockSize").selectedIndex].text;
  const volume = $("#volume").value;
  const msg = `Здравствуйте! Хочу заказать газоблок BELKÖL.%0AРазмер: ${encodeURIComponent(size)}%0AОбъём: ${encodeURIComponent(volume)} м³.%0AПодскажите актуальную цену, наличие и доставку.`;
  window.open(`https://wa.me/77054632664?text=${msg}`, "_blank");
});

$$(".order-product").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.dataset.name;
    const msg = encodeURIComponent(`Здравствуйте! Хочу заказать: ${product}. Подскажите актуальную цену, наличие и условия доставки.`);
    window.open(`https://wa.me/77054632664?text=${msg}`, "_blank");
  });
});

$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const msg =
`Здравствуйте! Хочу сделать заказ ВЕГА-Пром.
Имя: ${$("#name").value}
Телефон: ${$("#phone").value}
Товар: ${$("#product").value}
Количество / объём: ${$("#quantity").value || "уточню с менеджером"}
Комментарий: ${$("#comment").value || "нет"}
Подскажите актуальную цену, наличие и условия доставки.`;
  window.open(`https://wa.me/77054632664?text=${encodeURIComponent(msg)}`, "_blank");
});
