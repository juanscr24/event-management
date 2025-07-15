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

export async function alertQuestion(title, confirmMsg, cancelMsg, paramsFunc) {
    const result = await Swal.fire({
            title: title,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: confirmMsg,
            cancelButtonText: cancelMsg,
        });
    if (result.isConfirmed) {
        try {
            paramsFunc
        } catch (error) {
            alerError("Error al cerrar sesion.");
            console.error(error);
        }
    }
}