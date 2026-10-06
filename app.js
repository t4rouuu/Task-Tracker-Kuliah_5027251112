const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#counter");

let tugas = [];

function render() {
  taskList.textContent = "";

  tugas.forEach(function (tugasItem) {
    const li = document.createElement("li");

    li.textContent =
      tugasItem.judul +
      " - " +
      tugasItem.matkul +
      " - " +
      tugasItem.deadline;

    taskList.append(li);
  });

  const jumlahAktif = tugas.filter(function (tugasItem) {
    return !tugasItem.selesai;
  }).length;

  counter.textContent = jumlahAktif + " tugas aktif";
}

render();