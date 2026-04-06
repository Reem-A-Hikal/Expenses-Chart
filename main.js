const barsContainer = document.querySelector(".bars");

if (barsContainer) {
  fetch("data.json")
    .then((res) => {
      if (!res.ok)
        throw new Error(`Network response was not ok: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      renderChart(data);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      barsContainer.innerHTML = "<p class='error'>Failed to load data.</p>";
    });
} else {
  console.error("Bars container not found in the DOM.");
}

function renderChart(data) {
  barsContainer.innerHTML = "";

  if (!Array.isArray(data) || data.length === 0) {
    barsContainer.innerHTML =
      "<p class='error'>No data available to display.</p>";
    return;
  }

  const maxAmount = Math.max(...data.map((item) => item.amount)) || 1;

  const todayIndex = new Date().getDay();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDay = days[todayIndex];

  const fragment = document.createDocumentFragment();

  data.forEach((item) => {
    const li = document.createElement("li");

    const bar = document.createElement("button");
    bar.classList.add("bar");
    bar.type = "button";

    const height = (item.amount / maxAmount) * 100;
    bar.style.height = `${height.toFixed(2)}%`;

    const isToday = item.day === currentDay;
    if (isToday) bar.classList.add("current-day");

    bar.setAttribute(
      "aria-label",
      `${item.day}${isToday ? " (today)" : ""}: $${item.amount}`,
    );

    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip");
    tooltip.innerText = `$${item.amount}`;
    tooltip.setAttribute("aria-hidden", "true");

    bar.appendChild(tooltip);

    const day = document.createElement("span");
    day.classList.add("day");
    day.innerText = item.day;

    li.appendChild(bar);
    li.appendChild(day);

    fragment.appendChild(li);
  });
  barsContainer.appendChild(fragment);
}
