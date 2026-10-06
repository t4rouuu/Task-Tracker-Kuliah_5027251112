const taskList = document.querySelector("#taskList");
const counter = document.querySelector("#counter");

const form = document.querySelector("#taskForm");
const judulInput = document.querySelector("#judul");
const matkulInput = document.querySelector("#matkul");
const deadlineInput = document.querySelector("#deadline");
const error = document.querySelector("#error");


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

function render() {
  taskList.textContent = "";

  tugas.forEach(function (tugasItem) {
    const li = document.createElement("li");
    li.dataset.id = tugasItem.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "cek";
    checkbox.checked = tugasItem.selesai;

    const info = document.createElement("span");

    info.textContent =
      tugasItem.judul +
      " - " +
      tugasItem.matkul +
      " - " +
      tugasItem.deadline;

    const hapus = document.createElement("button");
    hapus.textContent = "Hapus";
    hapus.className = "hapus";

    li.append(checkbox, info, hapus);
    taskList.append(li);
  });

  const jumlahAktif = tugas.filter(function (tugasItem) {
    return !tugasItem.selesai;
  }).length;

  counter.textContent = jumlahAktif + " tugas aktif";
}
taskList.addEventListener("click", function (event) {
  const li = event.target.closest("li");

  if (!li) {
    return;
  }

  const id = Number(li.dataset.id);

  if (event.target.classList.contains("cek")) {
    const tugasItem = tugas.find(function (item) {
      return item.id === id;
    });

    tugasItem.selesai = event.target.checked;

    render();
  }

  if (event.target.classList.contains("hapus")) {
    tugas = tugas.filter(function (item) {
      return item.id !== id;
    });

    render();
  }
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const judul = judulInput.value.trim();
  const matkul = matkulInput.value.trim();
  const deadline = deadlineInput.value;

  error.textContent = "";

  if (judul.length < 3) {
    error.textContent = "Judul minimal 3 karakter.";
    return;
  }

  if (!deadline) {
    error.textContent = "Deadline wajib diisi.";
    return;
  }

  tugas.push({
    id: Date.now(),
    judul: judul,
    matkul: matkul,
    deadline: deadline,
    selesai: false
  });

  form.reset();

  render();
});