import React, { useState } from "react";
import { successAlert, errorAlert } from "../utils/alert";

const ChangePassword = React.forwardRef(
  ({ animate, onAnimationEnd, onClose, code }, ref) => {
    const colors = {
      CITSC: "border-[#621668] text-[#621668] bg-[#621668]",
      CESC: "border-[#020180] text-[#020180] bg-[#020180]",
      CCSC: "border-[#660A0A] text-[#660A0A] bg-[#660A0A]",
      COTSC: "border-[#847714] text-[#847714] bg-[#847714]",
      SCEAP: "border-[#6F3306] text-[#6F3306] bg-[#6F3306]",
      SSC: "border-[#174515] text-[#174515] bg-[#174515]",
      OSAS: "border-[#174515] text-[#174515] bg-[#174515]",
    };

    const color = colors[code] || "border-[#174515] text-[#174515] bg-[#174515]";

    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newConfirmPass, setNewConfirmPass] = useState("");

    const [passwordMessage, setPasswordMessage] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [passwordMeetsRequirements, setPasswordMeetsRequirements] = useState(false);

    // VALIDATE PASSWORD REQUIREMENTS
    const validatePassword = (value) => {
      if (value.length === 0) {
        setPasswordMessage("");
        return;
      }

      let message = "";
      setPasswordMeetsRequirements(false);

      if (value.length < 8) {
        message = "Password must be at least 8 characters.";
      } else if (!/[A-Za-z]/.test(value)) {
        message = "Password must contain at least one letter.";
      } else if (!/[0-9]/.test(value)) {
        message = "Password must contain at least one number.";
      } else if (!/[!@#$%^&*(),.?\":{}|<>]/.test(value)) {
        message = "Password must contain at least one symbol.";
      } else {
        setPasswordMeetsRequirements(true);
        message = "✓ Password meets all requirements.";
      }

      setPasswordMessage(message);
    };

    // VALIDATE CONFIRM PASSWORD
    const validateConfirm = (value) => {
      if (value.length === 0 || newPass.length === 0) {
        setConfirmMessage("");
        return;
      }

      if (value !== newPass) {
        setConfirmMessage("Passwords do not match.");
      } else if(!passwordMeetsRequirements) {
        setConfirmMessage("Passwords do not meet requirements.");
      } else {
        setConfirmMessage("✓ Passwords match.");
      }
    };

    const pwdData = {
      old_password: oldPass,
      new_password: newPass,
    };

    const changePassword = async () => {
      if (!passwordMessage.includes("✓")) {
        errorAlert("Password does not meet requirements!");
        return;
      }

      if (!confirmMessage.includes("✓")) {
        errorAlert("Passwords do not match!");
        return;
      }

      if (oldPass === newPass) {
        errorAlert("New password cannot be the same as old password.");
        return;
      }

      try {
        const res = await fetch("/api/users/current/password", {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pwdData),
        });

        const response = await res.json();
        if (response.status === "success") {
          onClose();
          successAlert("Succesfully changed password");
        } else {
          errorAlert("Failed: " + response.message);
        }
      } catch (err) {
        errorAlert("Fetch failed: " + err);
      }
    };

    return (
      <div
        ref={ref}
        className={`${color} ${animate} font-[family-name:Arial] lg:text-sm text-xs lg:w-100 w-80 h-auto py-6 px-6 bg-white shadow-[2px_2px_grey,-2px_-2px_white] rounded-lg z-[80] inset-0 mx-auto`}
        onAnimationEnd={onAnimationEnd}
      >
        <div className="mt-1 relative">
          <span
            onClick={onClose}
            className="material-symbols-outlined absolute right-0 cursor-pointer"
          >
            disabled_by_default
          </span>
        </div>

        <div className="mt-4 border-b-4 pb-1">
          <span className="font-semibold lg:text-xl text-lg">
            Change Password
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            changePassword();
          }}
        >
          <div className="mt-5 space-y-4">
            {/* OLD PASSWORD */}
            <div>
              <label>Old Password:</label>
              <input
                type="password"
                onChange={(e) => setOldPass(e.target.value)}
                className="border-2 px-2 text-[#000] h-8 rounded-md w-full mt-1"
                required
              />
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label>New Password:</label>
              <input
                type="password"
                onChange={(e) => {
                  setNewPass(e.target.value);
                  validatePassword(e.target.value);
                }}
                className="border-2 px-2 text-[#000] h-8 rounded-md w-full mt-1"
                required
              />

              <p
                className={`text-xs mt-1 ${
                  passwordMessage.includes("✓")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {passwordMessage}
              </p>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label>Confirm Password:</label>
              <input
                type="password"
                onChange={(e) => {
                  setNewConfirmPass(e.target.value);
                  validateConfirm(e.target.value);
                }}
                className="border-2 px-2 text-[#000] h-8 rounded-md w-full mt-1"
                required
              />

              <p
                className={`text-xs mt-1 ${
                  confirmMessage.includes("✓")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {confirmMessage}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={`${color} cursor-pointer w-full rounded-md text-white h-9 mt-5`}
          >
            Change Password
          </button>
        </form>
      </div>
    );
  }
);

export default ChangePassword;
