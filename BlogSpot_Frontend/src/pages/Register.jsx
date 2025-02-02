import axios from "axios";
import logo from "../assets/logo.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BACKEND_URL } from "../../utils";
// import logo from "../assets/logo.png";
// import logo from "../assets/log.png";

const showToast = (message, type = "success") => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top", // 'top' or 'bottom'
    position: "center", // 'left', 'center', or 'right'
    backgroundColor: type === "success" ? "blue" : "red",
    close: true,
  }).showToast();
};

const Register = () => {
  const [userName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [profession, setProfession] = useState("");
  const [photo, setPhoto] = useState(" ");
  const [photoprev, setPhotoprev] = useState(" ");
  const [loading, setLoading] = useState(false);

  const handleProfile = (e) => {
    const profile = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(profile);

    reader.onload = () => {
      setPhotoprev(reader.result);
      setPhoto(profile);
    };
  };

  const handleResgister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("photo", photo);
    formData.append("role", role);
    formData.append("profession", profession);

   
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/register`,
        formData
      );

      // console.log(data);
      showToast("User registered successfully!", "success");

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setProfession("");
      setPhoto("");
      setPhotoprev("");
    } catch (error) {
      console.error(error);
      showToast("Failed to register user. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      <div className=" min-h-screen  flex items-center justify-center ">
        <div className="w-full max-w-md bg-white shadow-lg rounded-md p-8">
          <form onSubmit={handleResgister}>
            <div className="text-2xl cursor-pointer  items-center text-center">
              {/* <img src={logo} width={40} alt="Placeholder" /> */}
              <span>
                Blog
                <span className="text-blue-600 select-none  font-black xl">
                  Spot
                </span>
              </span>
            </div>
            <h1 className="font-black xl select-none">Register</h1>
            <select
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className=" w-full mt-5 py-1 border rounded-md "
            >
              <option value=""> select role </option>
              <option value="Admin">Admin</option>
              {/* <option value="Student">Student</option> */}
            </select>
            <div className="">
              <input
                onChange={(e) => setName(e.target.value)}
                className="text-left w-full mt-5  p-1 border rounded-md"
                type="text"
                placeholder="Enter Your Name"
                value={userName}
              />
            </div>
            <div className="mb-2">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="text-left w-full mt-4  p-1 border rounded-md"
                type="email"
                placeholder="Enter Your email"
                value={email}
              />
            </div>
            <div className="mb-2">
              <input
                onChange={(e) => setPhone(e.target.value)}
                className="text-left w-full mt-4  p-1 border rounded-md"
                type="number"
                placeholder="Enter Your Phone Number"
                value={phone}
              />
            </div>
            <div className="mb-2 ">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="text-left w-full mt-4  p-1 border rounded-md"
                type="password"
                placeholder="Set a Password"
                value={password}
              />
            </div>
            <div className="mb-2 ">
              <input
                onChange={(e) => setProfession(e.target.value)}
                className=" w-full mt-4  p-1 border rounded-md "
                type="text"
                placeholder="Enter your Profession"
                value={profession}
              />
            </div>
            <div className="flex justify-between items-center m-4">
              <div className="photo  mr-4">
                <img
                  src={photoprev ? `${photoprev}` : "photo"}
                  width={50}
                  className="rounded-full "
                  alt="photo"
                />
              </div>
              <input
                onChange={handleProfile}
                className="w-full border rounded-sm m-1"
                type="file"
                placeholder="Upload you Profile"
              />
            </div>
            <div className="text-center m-5">
              <div>
                {/* <button
                  type="submit"
                  className="w-[100%] bg-blue-600 p-3 text-white font-black xl mt-4 rounded-md hover:bg-black duration-500 hover:scale-105"
                >
                  Resgister
                </button> */}
                <button
                  type="submit"
                  className={`w-[100%] bg-blue-600 p-3 text-white font-black xl mt-4 rounded-md ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-black duration-500 hover:scale-105"
                  }`}
                  disabled={loading} // Disable the button while loading
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              <br />
              <p>
                {" "}
                Already an Resgistered ?
                <Link to="/login" className="font-black xl text-blue-700">
                  {" "}
                  Login{" "}
                </Link>{" "}
              </p>
            </div>
            <div className="flex justify-end">
              <button className="flex items-center justify-between bg-blue-600 text-white font-black xl px-4 p-2  rounded-md">
                <IoMdArrowRoundBack /> <Link to="/">Back</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
