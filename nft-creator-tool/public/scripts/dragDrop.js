export function addDragAndDrop() {
    const items = document.querySelectorAll(".trait");

    items.forEach(item => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", e.target.textContent);
            e.target.classList.add("dragging");
        });

        item.addEventListener("dragover", (e) => {
            e.preventDefault();
            const draggingItem = document.querySelector(".dragging");
            const list = [...document.getElementById("traits").children];

            let closest = null;
            let closestOffset = Number.NEGATIVE_INFINITY;
            list.forEach((child) => {
                if (child !== draggingItem) {
                    const box = child.getBoundingClientRect();
                    const offset = e.clientY - box.top - box.height / 2;
                    if (offset < 0 && offset > closestOffset) {
                        closestOffset = offset;
                        closest = child;
                    }
                }
            });

            if (closest) {
                document.getElementById("traits").insertBefore(draggingItem, closest);
            } else {
                document.getElementById("traits").appendChild(draggingItem);
            }
        });

        item.addEventListener("dragend", () => {
            document.querySelectorAll(".dragging").forEach(el => el.classList.remove("dragging"));
        });
    });
}
