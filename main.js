const barsContainer = document.querySelector(".bars");

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderChart(data);
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
    barsContainer.innerHTML = "<p class='error'>Failed to load data.</p>";
  });

barsContainer.innerHTML = "";
function renderChart(data) {
  if (!data || data.length === 0) return;
  const maxAmount = Math.max(...data.map((item) => item.amount)) || 1;

  const todayIndex = new Date().getDay();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDay = days[todayIndex];

  data.forEach((item) => {
    const li = document.createElement("li");

    const bar = document.createElement("button");
    bar.classList.add("bar");

    const height = (item.amount / maxAmount) * 100;
    bar.style.height = `${height}%`;

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

    barsContainer.appendChild(li);
  });
}
