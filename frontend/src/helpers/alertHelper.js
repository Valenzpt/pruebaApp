import Swal from 'sweetalert2';

export const showSuccessToast = (message, timer = 3000) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: timer
    })
}
export const showValidationErrors = (errors) => {
    const errorMessages = errors.map(err=>`${err.path}: ${err.msg}`).join('\n');
    Swal.fire({
        icon: 'error',
        title: 'Errores de validacion',
        text: errorMessages,
        showConfirmButton: true
    })
};
export const showErrorToast = (message, timer = 3000) => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: message,
        showConfirmButton: false,
        timer: timer
    })
}
