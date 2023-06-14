const tableBody = document.querySelector("#espanol-body");
const showAllButton = document.querySelector("#show-all-button");

showAllButton.addEventListener("click", () => {
  const cells = tableBody.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.classList.remove("hide");
  });
});

function createTableRow(verb) {
  const persons = ["Yo", "Tú", "Él/ ella/ Usted", "Nosotros/-as", "Vosotros/as", "Ellos/ ellas/ Uds"];

  const row = document.createElement("tr");
  const pers = document.createElement("td");
  const pol = document.createElement("td");
  const es = document.createElement("td");
  const button = document.createElement("td");
  const showButton = document.createElement("button");

  if (verb.col != null) {
    pers.textContent = persons[i % 6];
  }else{
    i = -1;
    if(verb.pol == null && verb.es == null) {
        row.appendChild(pers);
        row.appendChild(pol);
        row.appendChild(es);
        row.appendChild(button);
        return row;
    }
  }

  pers.classList.add("cell-right");
  pol.textContent = verb.pol;
  es.textContent = verb.es;

  if (verb.col == "r") {
    pol.classList.add("cell-red");
    es.classList.add("cell-red");
    pers.classList.add("cell-red");
  }
  if (verb.col == "g") {
    pol.classList.add("cell-green");
    es.classList.add("cell-green");
    pers.classList.add("cell-green");
  }
  if (verb.col == "b") {
    pol.classList.add("cell-blue");
    es.classList.add("cell-blue");
    pers.classList.add("cell-blue");
  }

  showButton.textContent = "Mostrar";
  showButton.classList.add("button");

  const cells = [pol, es];

  cells.forEach((cell, index) => {
    if (index % 2 == 1) {
      cell.classList.add("hide");
    }
    showButton.addEventListener("click", () => {
      cells.forEach((cell) => cell.classList.remove("hide"));
    });
  });

  button.appendChild(showButton);
  row.appendChild(pers);
  row.appendChild(pol);
  row.appendChild(es);
  row.appendChild(button);

  return row;
}

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", () => {
  const rows = tableBody.querySelectorAll("tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => {
      if (cell.querySelector("button")) {
        return;
      }
      cell.classList.add("hide");
    });
    cells[0].classList.remove("hide");
    cells[1].classList.remove("hide");
    cells[2].classList.add("hide");
  });
});

let i = 0;
fetch("espanol.json")
  .then((response) => response.json())
  .then((irregularVerbs) => {
    irregularVerbs.forEach((verb) => {
      if (i % 6 == 0 && i > 1) {
        const row = document.createElement("tr");
        const pers = document.createElement("td");
        const pol = document.createElement("td");
        const es = document.createElement("td");
        const button = document.createElement("td");
        row.appendChild(pers);
        row.appendChild(pol);
        row.appendChild(es);
        row.appendChild(button);
        tableBody.appendChild(row);
      }
      const row = createTableRow(verb);
      tableBody.appendChild(row);

      i++;
    });
  });