let libList = document.querySelector("#library-list")
let audioPlayer = document.querySelector("#audioPlayer")
let audioSource = document.getElementById("audioSource");
audioPlayer.volume = 0.2

let libraryArra = []

function render(data) {
	data.forEach(el => {
		libList.innerHTML += `
		<li data-id="${el.src}" data-artist="${el.artist.name}" data-title="${el.title}">
			<p>${el.artist} - ${el.title}</p>
			<button id="add-library">Delete</button>
			<button id="play">Play</button>
		</li>`
	})
}

function saveData() {
	localStorage.setItem("lib-music", JSON.stringify(libraryArra))
}

function getData() {
	let data = JSON.parse(localStorage.getItem("lib-music"))

	if (data) {
		libraryArra = data
		render(libraryArra)
	}
}

libList.addEventListener("click", (event) => {
	let song = event.target.closest("li")
	let playBtn = event.target.closest("#play")
	if (song && playBtn) {
		audioPlayer.style.bottom = "20px"

		audioSource.src = song.dataset.id;
		audioPlayer.load();
		audioPlayer.play();
		return
	}

	let deleteBtn = event.target.closest("#add-library")

	if (song && deleteBtn) {
		let index = libraryArra.findIndex(el => el.src === song.dataset.id)

		console.log(libraryArra.slice(index, 1))
		console.log(libraryArra)

		libraryArra.splice(index, 1)

		saveData()
		libList.innerHTML = ""
		render(libraryArra)
	}
})

getData()