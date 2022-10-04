// BUSQUEDA
const btnBusqueda = document.getElementById("btnBusqueda");
const inputBusqueda = document.getElementById("inputBusqueda");

btnBusqueda.addEventListener("click", () => {
    let textoBusqueda = inputBusqueda.value;

    if(!textoBusqueda) {
        console.log("Debe ingresar un nombre");
        return;
    }
    console.log("Buscar", textoBusqueda);
})


// LOADING
const elLoading = document.getElementById("loading");

const activarLoading = () => {
    elLoading.classList = "loading active";
};

const desactivarLoading = () => {
    elLoading.classList = "loading";
};