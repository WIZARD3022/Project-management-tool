import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
// import Task from "../Backend/models/Task";

function App() {
  const [active, setActive] = useState("");
  const [check, setCheck] = useState(0);

  const [person, setPerson] = useState({
    Username: "",
    Password: "",
    Email: "",
    Name: "",
    DOB: "",
    Contact_num: "",
  });
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    Task: "",
    Start: "",
    Deadline: "",
    Assign: "",
    Day: 1,
    Progress: 1,
  });
  const [data, setData] = useState([]);

  const getData = async () => {
    let req = await fetch("http://localhost:3000/tasks");
    let Info = await req.json();
    setData(Info);
    console.log(Info);
  };

  const getUsers = async () => {
    let req = await fetch("http://localhost:3000/users");
    let userData = await req.json();
    setUsers(userData);
    console.log(userData);
  };

  useEffect(() => {
    getData();
    getUsers();
    console.log(check);
  }, []);

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // console.log(check)

  const handleperson = (e) => {
    setPerson({ ...person, [e.target.name]: e.target.value });
  };

  const SubmitSignin = async (username, password, c) => {
    const user = users.find((user) => user.Username === username);

    if (user) {
      if (user.Password === password) {
        setCheck((c) => c + 1);
        setActive(username);

        const newLogin = {...person, id: uuidv4(), Access: "Granted"}

        await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newLogin),
        });

        console.log("Login successful", c);
        toast("Login Successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Reset the form
        setPerson({
          Username: "",
          Password: "",
          Email: "",
          Name: "",
          DOB: "",
          Contact_num: "",
        });
      } else {
        setCheck((c) => c + 2);
        console.log("Wrong Password");
        toast("Wrong Password!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const newLogin = {...person, id: uuidv4(), Access: "Denied with Password Error."}

        await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newLogin),
        });
      }
    } else {
      console.log("Wrong Username");
      setCheck((c) => c + 2);
      toast("Wrong Username!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      const newLogin = {...person, id: uuidv4(), Access: "Denied with Username Error."}

        await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(newLogin),
        });
    }
  };

  const SubmitSignup = async () => {
    console.log(person);
    const newPerson = { ...person, id: uuidv4() };
    setUsers([...users, newPerson]);
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newPerson),
    });
    console.log([...users, person]);
    toast("Soon... You able to Use our Services.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setPerson({
      Username: "",
      Password: "",
      Email: "",
      Name: "",
      DOB: "",
      Contact_num: "",
    });
  };

  const handleLogout = () => {
    setActive("");
    setCheck(0);
    setPerson({
      Username: "",
      Password: "",
      Email: "",
      Name: "",
      DOB: "",
      Contact_num: "",
    });
  };

  const transformsignin = () => {
    document.querySelector("#signin1").setAttribute("class", "value");
    document.querySelector("#signin2").setAttribute("class", "hidden");
    document.querySelector("#signup1").setAttribute("class", "value");
    document.querySelector("#signup2").setAttribute("class", "hidden");
    console.log("started");
  };

  const transformsignup = () => {
    document.querySelector("#signin1").setAttribute("class", "hidden");
    document.querySelector("#signin2").setAttribute("class", "value");
    document.querySelector("#signup1").setAttribute("class", "hidden");
    document.querySelector("#signup2").setAttribute("class", "value");
    console.log("started");
  };


  const savedata = async () => {
    console.log("Active User:", active); // Debug: Check active user
    const newForm = { ...form, id: uuidv4(), Manager: active };
    console.log("New Form:", newForm); // Debug: Check newForm before saving
    setData([...data, newForm]);
    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newForm),
    });
    console.log("Updated Data:", [...data, newForm]);
    toast("📔 Task Assigned!", {
    });
    setForm({
      Task: "",
      Start: "",
      Deadline: "",
      Assign: "",
      Day: 1,
      Progress: 1,
    });
  };

  const resetData = () => {
    console.log(form);
    toast("🔁 Reset Completed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setForm({
      Task: "",
      Start: "",
      Deadline: "",
      Assign: "",
      Day: 1,
      Progress: 1,
    });
  };

  const editData = async (id) => {
    console.log(id);
    if (data.filter((item) => item.id !== id)[0]) {
      console.log("yes");
    }
    setForm(data.filter((item) => item.id === id)[0]);
    setData(data.filter((item) => item.id !== id));
    let res = await fetch("http://localhost:3000/tasks", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      toast("🖋 Editing Task!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("❌ Failed to Edit Task!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deleteData = async (id) => {
    console.log(id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setData(data.filter((item) => item.id !== id));
      let res1 = await fetch("http://localhost:3000/tasks", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res1.ok) {
        toast("❌ Task Deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast("❌ Failed to Delete Task!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <>
      {/* <Tabs>
        <TabList>
          <Tab href="/tab1">Tab 1</Tab>
          <Tab href="/tab2">Tab 2</Tab>
          <Tab href="/tab3">Tab 3</Tab>
        </TabList>
        <TabPanel>Content for Tab 1</TabPanel>
        <TabPanel>Content for Tab 2</TabPanel>
        <TabPanel>Content for Tab 3</TabPanel>
      </Tabs> */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <ToastContainer />

      <div className="back p-4 inset-0 min-h-[68vh] -z-10  w-full ">
        <div className="md:container p-4 w-full mx-auto border-2 border-blue-800 rounded-xl shadow-md bg-blue-800">
          <div className="text-center text-white flex md:flex-row items-center flex-col value">
            <div id="signin1" className="value">
              <div className="signin py-2 px-1 flex flex-col md:rounded-t-md rounded-l-md bg-white text-black mx-auto justify-center items-center md:h-[75vh] md:w-[85vh] gap-8">
                <h1 className="text-3xl">SIGN IN</h1>
                <label
                  className="flex flex-row gap-5 justify-center items-center text-center"
                  htmlFor="Username"
                >
                  <span className="text-lg">Username</span>
                  <input
                    className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                    type="text"
                    id="Usernamesignin"
                    name="Username"
                    required
                    placeholder="Enter Username"
                    onChange={handleperson}
                    value={person.Username}
                  />
                </label>
                <label
                  className="flex flex-row gap-5 justify-center items-center text-center"
                  htmlFor="Password"
                >
                  <span className="text-lg">Password</span>
                  <input
                    className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                    type="password"
                    id="Passwordsignin"
                    name="Password"
                    required
                    placeholder="Enter Password"
                    onChange={handleperson}
                    value={person.Password}
                  />
                </label>
                <div>
                  <span className="text-sm">Not a Current User ? </span>
                  <span
                    onClick={transformsignup}
                    className="text-violet-600 underline cursor-pointer"
                  >
                    Click me
                  </span>
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    SubmitSignin(person.Username, person.Password, check);
                  }}
                  className="text-white bg-gradient-to-r from-slate-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-slate-400 dark:focus:ring-white font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                >
                  SIGN IN
                </button>
              </div>
            </div>
            <div id="signin2" className="hidden">
              <img
                className="rounded-l-lg md:rounded-t-md md:w-[90vh] md:h-[75vh] opacity-75 gayab"
                src="./Signup.png"
                alt="Sign Up"
              />
            </div>

            <div className=" bg-blue-800 w-1/2 ">
              <div id="signup1" className="value">
                <img
                  className="rounded-r-lg md:rounded-b-md w-[90vh] h-[75vh] opacity-75 gayab"
                  src="./Signin.png"
                  alt="Sign in"
                />
              </div>
              <div id="signup2" className="hidden">
                <div className="py-2 flex flex-col gap-4 rounded-l-md  text-white justify-center text-center md:mx-auto md:items-center w-full md:h-[75vh] md:w-[85vh] ">
                  <h1 className="text-3xl">SIGN UP</h1>
                  <label
                    className="flex flex-row gap-5 justify-center items-center text-center"
                    htmlFor="Username"
                  >
                    <span className="text-lg">Username</span>
                    <input
                      className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                      type="text"
                      id="Usernamesignup"
                      name="Username"
                      required="true"
                      placeholder="Enter Username"
                      onChange={handleperson}
                      value={person.Username}
                    />
                  </label>
                  <label
                    className="flex flex-row gap-5 justify-center items-center text-center"
                    htmlFor="Password"
                  >
                    <span className="text-lg">Password</span>
                    <input
                      className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                      type="text"
                      id="Passwordsignup"
                      name="Password"
                      required
                      placeholder="Enter Password"
                      onChange={handleperson}
                      value={person.Password}
                    />
                  </label>
                  <label
                    className="flex flex-row gap-5 justify-center items-center text-center"
                    htmlFor="Email"
                  >
                    <span className="text-lg">Email</span>
                    <input
                      className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                      type="text"
                      id="Email"
                      name="Email"
                      required
                      placeholder="Enter Email"
                      onChange={handleperson}
                      value={person.Email}
                    />
                  </label>
                  <label
                    className="flex flex-row gap-5 justify-center items-center text-center"
                    htmlFor="Name"
                  >
                    <span className="text-lg">Name</span>
                    <input
                      className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                      type="text"
                      id="Name"
                      name="Name"
                      required
                      placeholder="Enter Name"
                      onChange={handleperson}
                      value={person.Name}
                    />
                  </label>
                  <label
                    className="flex flex-row gap-5 justify-center items-center text-center"
                    htmlFor="DOB"
                  >
                    <span className="text-lg">DOB</span>
                    <input
                      className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                      type="Date"
                      id="DOB"
                      name="DOB"
                      required
                      onChange={handleperson}
                      value={person.DOB}
                    />
                  </label>
                  <label
                    className="flex flex-row gap-5 justify-center items-center text-center"
                    htmlFor="Contact_num"
                  >
                    <span className="text-lg">Mobile Number</span>
                    <input
                      className="py-2 px-1 w-full md:container border placeholder:text-white rounded-md bg-blue-400 text-white border-blue-400 mx-auto"
                      type="number"
                      id="Contact_num"
                      name="Contact_num"
                      required
                      placeholder="Enter Contact number"
                      onChange={handleperson}
                      value={person.Contact_num}
                    />
                  </label>
                  <div>
                    <span className="text-sm">Already an User ? </span>
                    <button
                      onClick={transformsignin}
                      className="text-violet-600 underline cursor-pointer"
                    >
                      Click me
                    </button>
                  </div>
                  <button
                    type="submit"
                    onClick={SubmitSignup}
                    className="text-white bg-gradient-to-r from-slate-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-slate-400 dark:focus:ring-white font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
                  >
                    REGISTER
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {check == 0 && (
          <div className="text-blue-600 text-3xl text-bold mx-auto text-center my-5 bg-slate-300 container py-2">
            Login To Access Data
          </div>
        )}

        {check == 2 && (
          <div className="text-red-600 text-3xl text-bold mx-auto text-center my-5 bg-red-300 container py-2">
            Login fail
          </div>
        )}

        {check == 1 && (
          <>
            <div className="md:container p-4 w-full mx-auto border-2 my-4 border-blue-500 rounded-xl shadow-md bg-blue-500">
              <nav className="flex flex-row justify-between text-center items-center">
                <div className="text-xl font-bold flex flex-row items-center justify-center text-center">
                  <div>
                    <lord-icon
                      src="https://cdn.lordicon.com/hrjifpbq.json"
                      trigger="hover"
                      colors="primary:#ffffff"
                    ></lord-icon>
                  </div>
                  <div>Welcome {active}!</div>
                </div>
                <div className="text-md text-bold flex flex-row items-center justify-center text-center">
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 p-2 rounded-md flex flex-row items-center justify-center text-center"
                  >
                    <div>
                      <lord-icon
                        src="https://cdn.lordicon.com/nqtddedc.json"
                        trigger="hover"
                        colors="primary:#ffffff"
                      ></lord-icon>
                    </div>
                    <div className="text-white font-bold">Logout</div>
                  </button>
                </div>
              </nav>
              <div className="text-3xl text-center text-white">Assign Task</div>
              <div className="flex flex-col gap-2">
                <div>
                  <label htmlFor="Task">
                    <span>Task: -</span>
                    <input
                      className="py-2 px-1 w-full border border-blue-500"
                      type="text"
                      onChange={handlechange}
                      value={form.Task}
                      id="Task"
                      name="Task"
                      required
                      placeholder="Enter the Job to be Done"
                    />
                  </label>
                  <div className="flex md:flex-row flex-col justify-around gap-2">
                    <div>
                      <div>
                        <label htmlFor="Start">
                          <span>Task Starting Date: -</span>
                          <input
                            className="py-2 px-1 w-full border border-blue-500"
                            type="Date"
                            onChange={handlechange}
                            value={form.Start}
                            id="Start"
                            name="Start"
                            required
                            max={form.Deadline}
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="Deadline">
                          <span>Task Deadline Date: -</span>
                          <input
                            className="py-2 px-1 w-full border border-blue-500"
                            type="Date"
                            onChange={handlechange}
                            value={form.Deadline}
                            id="Deadline"
                            name="Deadline"
                            required
                            min={form.Start}
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label htmlFor="Assign">
                          <span>Employ Name: -</span>
                          <input
                            className="py-2 px-1 w-full border border-blue-500"
                            type="text"
                            onChange={handlechange}
                            value={form.Assign}
                            id="Assign"
                            name="Assign"
                            required
                            placeholder="Enter Name whom Job Assigned"
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="Day">
                          <span>Day Required: -</span>
                          <input
                            className="py-2 px-1 w-full border border-blue-500"
                            type="number"
                            onChange={handlechange}
                            value={form.Day}
                            id="Day"
                            name="Day"
                            required
                            placeholder="Enter the Day in job get done"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col justify-center items-center gap-2">
                        <label htmlFor="Progress">
                          <span>
                            Current Work Progress: -
                            {((form.Progress / form.Day) * 100).toFixed(2)}
                          </span>
                          <input
                            className="py-2 px-1 w-full border border-blue-500"
                            type="range"
                            onChange={handlechange}
                            value={form.Progress}
                            id="Progress"
                            name="Progress"
                            required:true
                            min={0}
                            max={form.Day}
                          />
                        </label>
                      </div>
                      <div className="flex flex-row justify-around">
                        <button
                          type="Reset"
                          onClick={resetData}
                          className="text-white bg-gradient-to-r from-slate-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-slate-400 dark:focus:ring-white font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          onClick={savedata}
                          className="text-white bg-gradient-to-r from-slate-400 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 focus:outline-none focus:ring-slate-400 dark:focus:ring-white font-medium rounded-lg text-base px-5 py-2.5 text-center me-2 mb-2"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="data p-2 bg-white container items-center mx-auto my-5 shadow-lg rounded-lg border">
              <h1 className="text-blue-900 text-center text-2xl ">
                Your Tasks
              </h1>
              {data.length === 0 && (
                <div className="w-full text-center flex flex-col items-center justify-center">
                  <span> No Task To Show </span>
                </div>
              )}
              {data.length !== 0 && (
                <table className="table-auto w-full rounded overflow-hidden mb-10">
                  <thead className="bg-blue-800 text-white">
                    <tr>
                      <th className=" border border-x-blue-800 py-2">Task</th>
                      <th className=" border border-x-blue-800 py-2">
                        Task Start Date
                      </th>
                      <th className=" border border-x-blue-800 py-2">
                        Task Deadline Date
                      </th>
                      <th className=" border border-x-blue-800 py-2">
                        Task Assigned To
                      </th>
                      <th className=" border border-x-blue-800 py-2">
                        Required Days
                      </th>
                      <th className=" border border-x-blue-800 py-2">
                        Progress
                      </th>
                      <th className=" border border-x-blue-800 py-2">
                        Options
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-blue-100">
                    {data
                      .filter((item) => item.Manager === active)
                      .map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className=" py-2 border relative border-black text-center w-1/3">
                              <span className="text-blue-400">{item.Task}</span>
                            </td>
                            <td className=" py-2 border relative border-black text-center w-1/6">
                              <span>{item.Start}</span>
                            </td>
                            <td className=" py-2 border relative border-black text-center w-1/6">
                              <span>{item.Deadline}</span>
                            </td>
                            <td className=" py-2 border relative items-center justify-center border-black text-center w-1/12">
                              <span>{item.Assign}</span>
                            </td>
                            <td className=" py-2 border relative items-center justify-center border-black text-center w-1/12">
                              <span>{item.Day}</span>
                            </td>
                            <td className=" py-2 border relative items-center justify-center border-black text-center w-1/12">
                              <span>{item.Progress}</span>
                            </td>
                            <td className=" py-2 border relative items-center justify-center border-black text-center w-1/12">
                              <button
                                onClick={() => {
                                  editData(item.id);
                                }}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/gwlusjdu.json"
                                  trigger="hover"
                                ></lord-icon>
                              </button>
                              <button
                                onClick={() => {
                                  deleteData(item.id);
                                }}
                              >
                                <lord-icon
                                  src="https://cdn.lordicon.com/skkahier.json"
                                  trigger="hover"
                                ></lord-icon>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
