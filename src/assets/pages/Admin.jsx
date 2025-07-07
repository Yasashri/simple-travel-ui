import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/Admin.module.css";
import { URLS } from "../../config/constant";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMode, setModalMode] = useState("add");
  const [selectedData, setSelectedData] = useState(null);
  const [userBookings, setUserBookings] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [userRes, flightRes, hotelRes, vehicleRes] = await Promise.all([
        axios.get(URLS.userData),
        axios.get(URLS.flightData),
        axios.get(URLS.hotelData),
        axios.get(URLS.vehicleData),
      ]);
      setUsers(userRes.data);
      setFlights(flightRes.data);
      setHotels(hotelRes.data);
      setVehicles(vehicleRes.data);
    } catch (err) {
      console.error("Error loading admin data:", err);
    }
  };

  const openModal = (type, mode, data = null) => {
    setModalType(type);
    setModalMode(mode);
    setSelectedData(data);
    setModalOpen(true);
  };

  const viewUserBookings = async (userId) => {
    try {
      const res = await axios.get(`${URLS.userData}/${userId}/bookings`);
      setUserBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  const Section = ({ title, data, type, keys }) => (
    <div className='admin-section'>
      <h2>
        {title}
        {type !== "users" && (
          <button className='add-btn' onClick={() => openModal(type, "add")}>
            ➕
          </button>
        )}
      </h2>
      <table>
        <thead>
          <tr>
            {keys.map((k) => (
              <th key={k}>{k}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {keys.map((k) => (
                <td key={k}>
                  {Array.isArray(item[k]) ? item[k].join(", ") : item[k]}
                </td>
              ))}
              <td>
                {type === "users" ? (
                  <button onClick={() => viewUserBookings(item._id)}>
                    👁 View
                  </button>
                ) : (
                  <button onClick={() => openModal(type, "edit", item)}>
                    ✏️
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const formFields = {
    flights: [
      "flightNo",
      "flightStart",
      "flightEnd",
      "flightModel",
      "flightBasePrice",
      "flightDate",
      "flightTime",
    ],
    hotels: [
      "hotelName",
      "hotelDescription",
      "hotelLocation",
      "hotelPrice",
      "hotelContact",
      "hotelCountry",
    ],
    vehicles: [
      "vehicleNo",
      "vehicleDriver",
      "vehicleContact",
      "vehicleModel",
      "vehicleBasePrice",
      "vehicleCountry",
    ],
  };

  const validationSchemas = {
    flights: Yup.object({
      flightNo: Yup.string().required(),
      flightStart: Yup.string().required(),
      flightEnd: Yup.string().required(),
      flightModel: Yup.string().required(),
      flightBasePrice: Yup.number().required(),
      flightDate: Yup.string().required(),
      flightTime: Yup.string().required(),
    }),
    hotels: Yup.object({
      hotelName: Yup.string().required(),
      hotelDescription: Yup.string().required(),
      hotelLocation: Yup.string().required(),
      hotelPrice: Yup.number().required(),
      hotelContact: Yup.number().required(),
      hotelCountry: Yup.string().required(),
    }),
    vehicles: Yup.object({
      vehicleNo: Yup.string().required(),
      vehicleDriver: Yup.string().required(),
      vehicleContact: Yup.number().required(),
      vehicleModel: Yup.string().required(),
      vehicleBasePrice: Yup.number().required(),
      vehicleCountry: Yup.string().required(),
    }),
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: selectedData || {},
    validationSchema: validationSchemas[modalType],
    onSubmit: async (values) => {
      const url = `${URLS[modalType.slice(0, -1) + "Data"]}${
        modalMode === "edit" ? `/${selectedData._id}` : ""
      }`;

      try {
        // send JSON data with image URLs included in the values
        if (modalMode === "add") await axios.post(url, values);
        else await axios.put(url, values);

        fetchAllData();
        setModalOpen(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

  // Upload image(s) to server immediately on selection,
  // then set the returned URL(s) in Formik's values for later submission
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    try {
      if (modalType === "hotels" && files.length > 1) {
        const uploadedUrls = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("images", file);
          const res = await axios.post(URLS.multiImageUpload, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          uploadedUrls.push(res.data.imageUrl);
        }
        formik.setFieldValue("hotelImage", uploadedUrls);
      } else {
        const formData = new FormData();
        formData.append("image", files[0]);
        const res = await axios.post(URLS.uploadImage, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        formik.setFieldValue(
          `${modalType.slice(0, -1)}Image`,
          res.data.imageUrl
        );
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  const handleDelete = async () => {
    const url = `${URLS[modalType.slice(0, -1) + "Data"]}/${selectedData._id}`;

    try {
      await axios.delete(url);
      fetchAllData();
      setModalOpen(false);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className='admin-container'>
      <h1 className='admin-heading'>Admin Dashboard</h1>
      <Section
        title='Users'
        data={users}
        type='users'
        keys={["userFirstName", "userLastName", "userEmail", "userIsAdmin"]}
      />
      <Section
        title='Flights'
        data={flights}
        type='flights'
        keys={[
          "flightNo",
          "flightStart",
          "flightEnd",
          "flightDate",
          "flightTime",
          "flightBasePrice",
        ]}
      />
      <Section
        title='Hotels'
        data={hotels}
        type='hotels'
        keys={[
          "hotelName",
          "hotelLocation",
          "hotelPrice",
          "hotelContact",
          "hotelCountry",
        ]}
      />
      <Section
        title='Vehicles'
        data={vehicles}
        type='vehicles'
        keys={[
          "vehicleNo",
          "vehicleDriver",
          "vehicleContact",
          "vehicleBasePrice",
          "vehicleCountry",
        ]}
      />

      {userBookings && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <h3>User Bookings</h3>
            <pre>{JSON.stringify(userBookings, null, 2)}</pre>
            <button onClick={() => setUserBookings(null)}>Close</button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className='modal-backdrop'>
          <form onSubmit={formik.handleSubmit} className='modal-content'>
            <h3>
              {modalMode === "add" ? `Add ${modalType}` : `Edit ${modalType}`}
            </h3>
            {formFields[modalType]?.map((field) => (
              <div key={field} className='modal-input'>
                <input
                  name={field}
                  placeholder={field}
                  value={formik.values[field] || ""}
                  onChange={formik.handleChange}
                />
                {formik.errors[field] && <small>{formik.errors[field]}</small>}
              </div>
            ))}
            <input
              type='file'
              multiple={modalType === "hotels"}
              onChange={handleImageChange}
            />
            <div className='modal-buttons'>
              <button type='submit'>
                {modalMode === "add" ? "Add" : "Update"}
              </button>
              {modalMode === "edit" && (
                <button type='button' onClick={handleDelete} className='danger'>
                  Delete
                </button>
              )}
              <button type='button' onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
