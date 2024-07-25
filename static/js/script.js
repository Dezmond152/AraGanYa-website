const rows = document.querySelectorAll(".row");
console.log(rows);
rows.forEach((row) => {
    row.addEventListener("click", () => {
        rows.forEach((e) => e.setAttribute("aria-selected", "false"));
        row.setAttribute("aria-selected", "true");
    });
});