import Swal from "sweetalert2";

export const successAlert = (message) => {
  return Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
    confirmButtonText: "OK",
  });
};
export const okayAlert = (message) => {
  return Swal.fire({
    title: "Success!",
    text: message,
    icon: "success",
  });
};

export const errorAlert = (message) => {
  return Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "OK",
  });
};


export const confirmAlert = (message, callback) => {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  })
}
