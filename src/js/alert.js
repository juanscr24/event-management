import Swal from "sweetalert2";

// This Javascript will have the entire project alert system

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

// Alert succes
export function alertSucces(message) {
    Toast.fire({
        icon: "success",
        title: message
    });
}

// Alert error
export function alertError(message) {
    Toast.fire({
        icon: "error",
        title: message
    });
}