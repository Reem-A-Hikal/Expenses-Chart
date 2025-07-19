fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    this.renderChart(data);
  });

function renderChart(data) {
  const barsContainer = document.querySelector(".bars");
  barsContainer.innerHTML = "";

  const maxAmount = Math.max(...data.map((item) => item.amount));

  data.forEach((item) => {
    const li = document.createElement("li");

    const bar = document.createElement("div");
    bar.classList.add("bar");

    const height = (item.amount / maxAmount) * 100;
    bar.style.height = `${height}%`;

    const todayIndex = new Date().getDay();
    const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const currentDay = days[todayIndex];
    if (item.day === currentDay) {
      bar.setAttribute("current-day", "true");
    }

    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip");
    tooltip.innerText = `$${item.amount}`;

    bar.appendChild(tooltip);

    const day = document.createElement("span");
    day.classList.add("day");
    day.innerText = item.day;

    li.appendChild(bar);
    li.appendChild(day);

    barsContainer.appendChild(li);
  });
}
