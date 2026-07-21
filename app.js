const initialStock = {
  燦: 87,
  旻: 87,
  彬: 87,
  辰: 87,
  城: 83,
  菲: 83,
  玟: 94,
  寅: 94
};

const FULL_SET_MEMBERS = Object.keys(initialStock);
const FULL_SET_SIZE = FULL_SET_MEMBERS.length;

const stockGrid = document.querySelector("#stockGrid");
const stockTotal = document.querySelector("#stockTotal");
const customerCount = document.querySelector("#customerCount");
const distributeBtn = document.querySelector("#distributeBtn");
const resultPanel = document.querySelector("#resultPanel");
const resultGrid = document.querySelector("#resultGrid");
const remainingGrid = document.querySelector("#remainingGrid");
const remainingTotal = document.querySelector("#remainingTotal");
const summaryBox = document.querySelector("#summaryBox");
const errorBox = document.querySelector("#errorBox");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getStockTotal(stock) {
  return Object.values(stock).reduce((total, count) => total + count, 0);
}

function renderStockInputs(stock) {
  stockGrid.innerHTML = Object.entries(stock)
    .map(([member, count]) => `
      <div class="stock-item">
        <label for="stock-${member}">${member}的小卡數量</label>
        <div class="stock-input-row">
          <div class="member-dot" aria-hidden="true">${member}</div>
          <input
            id="stock-${member}"
            class="stock-input"
            type="number"
            min="0"
            step="1"
            inputmode="numeric"
            value="${count}"
            data-member="${member}"
            aria-label="${member}的小卡數量"
          />
          <span class="stock-unit">張</span>
        </div>
      </div>
    `)
    .join("");

  updateStockTotal();
}

function getCurrentStock() {
  return [...document.querySelectorAll(".stock-input")].reduce(
    (stock, input) => {
      const value = Number(input.value);
      stock[input.dataset.member] = Number.isFinite(value)
        ? Math.max(0, Math.floor(value))
        : 0;
      return stock;
    },
    {}
  );
}

function updateStockTotal() {
  stockTotal.textContent = getStockTotal(getCurrentStock());
}

function getCustomerData() {
  if (!Array.isArray(customerData)) {
    return [];
  }

  return customerData.map((person) => {
    const fixedCards = Array.isArray(person.fixedCards)
      ? person.fixedCards.map((member) => String(member).trim()).filter(Boolean)
      : [];

    const preferences = Array.isArray(person.preferences)
      ? person.preferences.map((member) => String(member).trim()).filter(Boolean)
      : [];

    return {
      id: String(person.id ?? "").trim(),
      need: Math.max(0, Math.floor(Number(person.need) || 0)),
      fixedCards,
      // 指定卡分完後還有剩餘需求、但沒有另填 preferences 時，沿用指定卡順序。
      preferences: preferences.length ? preferences : [...new Set(fixedCards)]
    };
  });
}

function validateData(stock, people) {
  const validMembers = new Set(Object.keys(stock));
  const usedIds = new Set();

  if (!people.length) {
    return "customerData.js 內至少需要一筆填單資料。";
  }

  for (const person of people) {
    if (!person.id) {
      return "customerData.js 內每位填單者都需要名稱。";
    }

    if (usedIds.has(person.id)) {
      return `customerData.js 內的名稱「${person.id}」重複。`;
    }

    usedIds.add(person.id);

    if (person.fixedCards.length > person.need) {
      return `${person.id} 的指定卡有 ${person.fixedCards.length} 張，超過需求 ${person.need} 張。`;
    }

    const invalidFixedCard = person.fixedCards.find(
      (member) => !validMembers.has(member)
    );

    if (invalidFixedCard) {
      return `${person.id} 的指定卡包含不存在的成員「${invalidFixedCard}」。`;
    }

    const remainingAfterFixed = person.need - person.fixedCards.length;
    const requestedExtra = remainingAfterFixed % FULL_SET_SIZE;

    if (requestedExtra > 0 && !person.preferences.length) {
      return `${person.id} 還有 ${requestedExtra} 張排序需求，但沒有設定志願順序。`;
    }

    const invalidPreference = person.preferences.find(
      (member) => !validMembers.has(member)
    );

    if (invalidPreference) {
      return `${person.id} 的志願中包含不存在的成員「${invalidPreference}」。`;
    }
  }

  return "";
}

function takeFullSet(remainingStock) {
  const canCreateSet = FULL_SET_MEMBERS.every(
    (member) => remainingStock[member] > 0
  );

  if (!canCreateSet) {
    return false;
  }

  FULL_SET_MEMBERS.forEach((member) => {
    remainingStock[member] -= 1;
  });

  return true;
}

function takeOneCardByPreference(remainingStock, preferences, startIndex) {
  if (!preferences.length) {
    return null;
  }

  /*
   * 從這位填單者目前的志願順位開始尋找。
   * 該順位沒有庫存時，會依序往下一順位找；跑完一輪後可重新循環。
   */
  for (let offset = 0; offset < preferences.length; offset += 1) {
    const preferenceIndex = (startIndex + offset) % preferences.length;
    const member = preferences[preferenceIndex];

    if (remainingStock[member] > 0) {
      remainingStock[member] -= 1;

      return {
        member,
        nextPreferenceIndex: (preferenceIndex + 1) % preferences.length
      };
    }
  }

  return null;
}

function distributeCards(stock, people) {
  const remainingStock = { ...stock };
  const result = Object.fromEntries(
    people.map((person) => [
      person.id,
      {
        fixedCards: [],
        missingFixedCards: [],
        fullSets: 0,
        extraCards: [],
        allocatedCards: []
      }
    ])
  );

  /*
   * 第一階段：指定卡優先。
   * fixedCards 不需要湊成 8 位，也允許同一成員重複。
   */
  for (const person of people) {
    for (const member of person.fixedCards) {
      if (remainingStock[member] > 0) {
        remainingStock[member] -= 1;
        result[person.id].fixedCards.push(member);
        result[person.id].allocatedCards.push({ member, type: "fixed" });
      } else {
        result[person.id].missingFixedCards.push(member);
      }
    }
  }

  /*
   * 第二階段：扣除「已指定的張數」後，剩餘需求每滿 8 張先配一套。
   * 一套為燦、旻、彬、辰、城、菲、玟、寅各 1 張。
   */
  for (const person of people) {
    const remainingNeed = Math.max(
      0,
      person.need - result[person.id].fixedCards.length
    );
    const requestedSets = Math.floor(remainingNeed / FULL_SET_SIZE);

    for (let setIndex = 0; setIndex < requestedSets; setIndex += 1) {
      if (!takeFullSet(remainingStock)) {
        break;
      }

      result[person.id].fullSets += 1;
      FULL_SET_MEMBERS.forEach((member) => {
        result[person.id].allocatedCards.push({ member, type: "set" });
      });
    }
  }

  /*
   * 第三階段：只處理除以 8 後的餘數。
   * 不把「套組庫存不足」的 8 張拆成散卡補發，避免破壞配套規則。
   * 每一輪依 customerData.js 順序，每人最多取得 1 張。
   */
  const distributionState = people.map((person) => {
    const remainingAfterFixed = Math.max(
      0,
      person.need - result[person.id].fixedCards.length
    );

    return {
      person,
      remainingNeed: remainingAfterFixed % FULL_SET_SIZE,
      preferenceIndex: 0
    };
  });

  while (distributionState.some((state) => state.remainingNeed > 0)) {
    let allocatedThisRound = 0;

    for (const state of distributionState) {
      if (state.remainingNeed <= 0) {
        continue;
      }

      const allocation = takeOneCardByPreference(
        remainingStock,
        state.person.preferences,
        state.preferenceIndex
      );

      if (!allocation) {
        continue;
      }

      state.preferenceIndex = allocation.nextPreferenceIndex;
      state.remainingNeed -= 1;
      allocatedThisRound += 1;

      result[state.person.id].extraCards.push(allocation.member);
      result[state.person.id].allocatedCards.push({
        member: allocation.member,
        type: "extra"
      });
    }

    if (allocatedThisRound === 0) {
      break;
    }
  }

  return { result, remainingStock };
}

function renderResult(result, stock, remainingStock, people) {
  let totalFixedCards = 0;
  let totalFullSets = 0;
  let totalExtraCards = 0;
  let totalMissingCards = 0;

  const activePeople = people.filter((person) => person.need > 0);

  resultGrid.innerHTML = activePeople
    .map((person) => {
      const personResult = result[person.id];
      const remainingAfterFixed = Math.max(
        0,
        person.need - personResult.fixedCards.length
      );
      const requestedSets = Math.floor(remainingAfterFixed / FULL_SET_SIZE);
      const requestedExtra = remainingAfterFixed % FULL_SET_SIZE;
      const receivedCount =
        personResult.fixedCards.length +
        personResult.fullSets * FULL_SET_SIZE +
        personResult.extraCards.length;
      const missingCount = Math.max(0, person.need - receivedCount);

      totalFixedCards += personResult.fixedCards.length;
      totalFullSets += personResult.fullSets;
      totalExtraCards += personResult.extraCards.length;
      totalMissingCards += missingCount;

      const fixedHtml = personResult.fixedCards.length
        ? personResult.fixedCards
            .map((member, index) => `
              <span class="chip fixed-chip" title="指定卡第 ${index + 1} 張">${escapeHtml(member)}</span>
            `)
            .join("")
        : `<span class="chip is-empty">沒有指定卡</span>`;

      const extraHtml = personResult.extraCards.length
        ? personResult.extraCards
            .map((member, index) => `
              <span class="chip" title="散卡第 ${index + 1} 張">${escapeHtml(member)}</span>
            `)
            .join("")
        : `<span class="chip is-empty">沒有排序散卡</span>`;

      const preferenceHtml = person.preferences.length
        ? person.preferences
            .map((member, index) => `
              <span class="preference-item">
                <span class="preference-rank">${index + 1}</span>
                ${escapeHtml(member)}
              </span>
            `)
            .join("")
        : `<span class="chip is-empty">不需要排序</span>`;

      const allocationOrderHtml = personResult.allocatedCards.length
        ? personResult.allocatedCards
            .map(({ member, type }, index) => `
              <span class="allocation-item is-${type}">
                <span class="allocation-rank">${index + 1}</span>
                ${escapeHtml(member)}
              </span>
            `)
            .join("")
        : `<span class="chip is-empty">尚未分配到小卡</span>`;

      const missingFixedHtml = personResult.missingFixedCards.length
        ? `<div class="warning">指定卡庫存不足：${personResult.missingFixedCards.map(escapeHtml).join("、")}</div>`
        : "";

      return `
        <article class="result-card">
          <div class="result-card__top">
            <div>
              <h3>${escapeHtml(person.id)}</h3>
              <div class="result-meta">需求 ${person.need} 張</div>
            </div>
            <span class="result-progress">${receivedCount} / ${person.need}</span>
          </div>

          <div class="allocation-block fixed-block">
            <div class="allocation-title">
              <span>優先指定卡</span>
              <small>${personResult.fixedCards.length} / ${person.fixedCards.length} 張</small>
            </div>
            <div class="chips">${fixedHtml}</div>
          </div>

          <div class="preference-block">
            <div class="preference-title">散卡志願排序</div>
            <div class="preference-list">${preferenceHtml}</div>
          </div>

          <div class="full-set">
            <span>完整套組</span>
            <strong>${personResult.fullSets} / ${requestedSets} 套</strong>
          </div>

          <div class="extra-title">
            排序散卡 ${personResult.extraCards.length} / ${requestedExtra} 張
          </div>
          <div class="chips">${extraHtml}</div>

          <div class="allocation-block">
            <div class="allocation-title">
              <span>實際分配順序</span>
              <small>指定卡 → 配套 → 排序散卡</small>
            </div>
            <div class="allocation-list">${allocationOrderHtml}</div>
          </div>

          ${missingFixedHtml}
          ${missingCount > 0 ? `<div class="warning">庫存不足，尚缺 ${missingCount} 張</div>` : ""}
        </article>
      `;
    })
    .join("");

  const allocatedCards = getStockTotal(stock) - getStockTotal(remainingStock);
  const missingText = totalMissingCards > 0
    ? `，仍有 ${totalMissingCards} 張需求未能分配。`
    : "，所有可完成的需求均已處理。";

  summaryBox.textContent =
    `本次共分配 ${allocatedCards} 張：指定卡 ${totalFixedCards} 張、` +
    `${totalFullSets} 套完整套組、排序散卡 ${totalExtraCards} 張${missingText}`;

  remainingGrid.innerHTML = Object.entries(remainingStock)
    .map(([member, count]) => `
      <div class="remaining-item">
        <span>${member}</span>
        <strong>${count} 張</strong>
      </div>
    `)
    .join("");

  remainingTotal.textContent = `共剩 ${getStockTotal(remainingStock)} 張`;
  resultPanel.classList.add("is-visible");
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.toggle("is-visible", Boolean(message));
}

stockGrid.addEventListener("input", (event) => {
  if (event.target.matches(".stock-input")) {
    updateStockTotal();
  }
});

distributeBtn.addEventListener("click", () => {
  const stock = getCurrentStock();
  const people = getCustomerData();
  const errorMessage = validateData(stock, people);

  if (errorMessage) {
    showError(errorMessage);
    resultPanel.classList.remove("is-visible");
    return;
  }

  showError("");
  const { result, remainingStock } = distributeCards(stock, people);
  renderResult(result, stock, remainingStock, people);
});

const people = getCustomerData();
customerCount.textContent = people.filter((person) => person.need > 0).length;
renderStockInputs(initialStock);
