
const fetchLines = async () => {
    fetch("https://api.tisseo.fr/v1/lines.json?key=a3732a1074e2403ce364ad6e71eb998cb")
        .then(response => response.json())
        .then(
            data => {
                let list = document.createElement("ul");
                data.lines.line.forEach(element => {
                    console.log(element.name);
                    let tmp = document.createElement("li");
                    tmp.innerHTML = element.shortName + " - " + element.name;
                    tmp.setAttribute("class", "lignes");
                    list.appendChild(tmp);
                });
                document.body.appendChild(list);
                document.querySelectorAll(".lignes").forEach(element => {
                    element.addEventListener('click', fetchStops)
                });
            }
        )
}

const fetchStops = async (id) => {
    console.log(id);
    fetch("https://api.tisseo.fr/v1/stop_points.json?key=a3732a1074e2403ce364ad6e71eb998cb&lineId=" + id)
        .then(response => response.json())
        .then(data => {
            console.log(data.name)
        })
}

document.querySelector("#getLine").addEventListener('click', fetchLines)