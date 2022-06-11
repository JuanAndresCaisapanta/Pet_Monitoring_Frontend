import Swal, { SweetAlertIcon } from "sweetalert2";

export const swalMessage = (
  title: string,
  text: string,
  icon: SweetAlertIcon,
) => {
  Swal.fire({
    background: "#F4F5FA",
    title: title,
    text: text,
    icon: icon,
    backdrop: false,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
