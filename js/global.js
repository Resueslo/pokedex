// LOADING
const elLoading = document.getElementById("loading");

const activarLoading = () => {
    elLoading.classList = "loading active";
};

const desactivarLoading = () => {
    elLoading.classList = "loading";
};