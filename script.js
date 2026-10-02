let games = [];

async function loadGames() {
    try {
        const response = await fetch("games.json");

        if (!response.ok) {
            throw new Error(
                "ไม่สามารถโหลด games.json ได้: " + response.status
            );
        }

        games = await response.json();

        console.log("โหลดเกมสำเร็จ:", games);

        displayGames(games);

    } catch (error) {

        console.error("เกิดข้อผิดพลาด:", error);

        const gameList =
            document.getElementById("gameList");

        if (gameList) {
            gameList.innerHTML =
                "<p style='color:red;'>โหลดข้อมูลเกมไม่ได้ กรุณาดู F12 > Console</p>";
        }
    }
}


function displayGames(gameData) {

    const gameList =
        document.getElementById("gameList");

    const gameCount =
        document.getElementById("gameCount");

    if (!gameList) {
        return;
    }

    gameList.innerHTML = "";

    if (gameCount) {
        gameCount.textContent =
            gameData.length + " เกม";
    }

    gameData.forEach(function(game) {

        const card =
            document.createElement("div");

        card.className = "game-card";


        const image =
            document.createElement("img");

        image.className = "game-image";

        image.src = game.image;

        image.alt = game.name;


        const info =
            document.createElement("div");

        info.className = "game-info";


        const title =
            document.createElement("h3");

        title.textContent = game.name;


        const genre =
            document.createElement("p");

        genre.className = "game-genre";

        genre.textContent = game.genre;


        const platform =
            document.createElement("p");

        platform.className = "game-platform";

        platform.textContent = game.platform;


        info.appendChild(title);
        info.appendChild(genre);
        info.appendChild(platform);

        card.appendChild(image);
        card.appendChild(info);


        card.addEventListener("click", function() {

            const name =
                encodeURIComponent(game.name);

            window.location.href =
                "game.html?name=" + name;

        });


        gameList.appendChild(card);

    });
}


function searchGames() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }

    const keyword =
        input.value.toLowerCase().trim();


    const result =
        games.filter(function(game) {

            return game.name
                .toLowerCase()
                .includes(keyword);

        });


    displayGames(result);
}


const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                searchGames();
            }

        }
    );

}


loadGames();