import { useForm } from "react-hook-form"
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";

function UserDataPage() {

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue
  } = useForm();

  const {
    userData,
    getUserData,
    createUserData,
    updateUserData,
    save_file,
    delete_photo,
    delete_file,
    signature_file,
    errors: userDataErrors
  } = useUser();

  const [imagePreview, setImagePreview] = useState("https://i.ibb.co/Y2Gtyfj/np.jpg");
  const [imageFile, setImageFile] = useState(null);

  const [imagePreviewAux, setImagePreviewAux] = useState("https://i.ibb.co/Y2Gtyfj/np.jpg");
  const [imageFileAux, setImageFileAux] = useState(null);

  useEffect(() => {
    /* async function loadDataUser() {
      await getUserData();
      //console.log(userData)
    }
    loadDataUser(); */
    getUserData();

  }, []);

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
      setValue('lastname', userData.lastname);
      setValue('age', userData.age);
      setValue('gender', userData.gender);
      setValue('phone', userData.phone);
      setValue('address', userData.address);
      setImagePreview(userData.ima || "https://i.ibb.co/Y2Gtyfj/np.jpg");
    }
  }, [userData]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Generar una URL para previsualizar la imagen seleccionada
      const previewUrl = URL.createObjectURL(file);

      setImagePreview(previewUrl);
      setImageFile(file);

      console.log(file, 'Esto es la imageFile el archivo que se almacena en cloudinary');
      console.log(previewUrl, 'Esto es el preview que se muestra en la interfaz');

    }
  };

  const onSubmit = handleSubmit((data) => {
    async function userInfo() {

      if(imageFile){
        deletePhotoUpdate();
      }

      let imageUrl = imagePreview;
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        formData.append("upload_preset", "ml_default"); // Tu preset de Cloudinary
        formData.append("cloud_name", "dotk67bus"); // Tu nombre de cloud en Cloudinary

        imageUrl = await save_file(formData);
      }
      const userDataAux = {
        name: data.name,
        lastname: data.lastname,
        age: data.age.toString(),
        gender: data.gender,
        phone: data.phone.toString(),
        address: data.address,
        ima: imageUrl
      };

      if (userData) {
        updateUserData(userData._id, userDataAux);
        alert("Se actualizaron los datos");
      } else {
        createUserData(userDataAux);
      }
      setImagePreview("https://i.ibb.co/Y2Gtyfj/np.jpg");
      setImageFile(null);
    }
    userInfo();
  });

  const deletePhoto = async () => {
    if (userData.ima != "https://i.ibb.co/Y2Gtyfj/np.jpg" && userData.ima) {

      let splitUrl = userData.ima.split("/");
      let splitUrlLastPart = splitUrl[splitUrl.length - 1].split(".");
      let publicID = splitUrlLastPart[0];

      const signatures = await signature_file({
        public_id: publicID
      });

      //console.log(signatures)

      const formData = new URLSearchParams();
      formData.append('public_id', publicID); // El public_id de la imagen que deseas eliminar
      formData.append('api_key', signatures.api_key); // Tu api_key
      formData.append('api_secret', signatures.api_secret); // Tu api_secret
      formData.append('signature', signatures.signature); // El tipo de recurso que deseas eliminar (
      formData.append('timestamp', signatures.timestamp); // El tipo de recurso que deseas eliminar (

      //console.log(publicID);

      delete_file(formData);

      setImagePreview("https://i.ibb.co/Y2Gtyfj/np.jpg");
      setImageFile(null);
      //console.log(imagePreview)
      const userDataAux = {
        ima: "https://i.ibb.co/Y2Gtyfj/np.jpg"
      };
      alert("Profile photo delete!");
      //console.log(userData._id,photo);
      delete_photo(userData._id, userDataAux);
    } else {
      alert("Profile photo empty!");
    }

  }

  const deletePhotoUpdate = async () => {
    //if (userData.ima != "https://i.ibb.co/Y2Gtyfj/np.jpg" && userData.ima) {

      let splitUrl = userData.ima.split("/");
      let splitUrlLastPart = splitUrl[splitUrl.length - 1].split(".");
      let publicID = splitUrlLastPart[0];

      const signatures = await signature_file({
        public_id: publicID
      });

      //console.log(signatures)

      const formData = new URLSearchParams();
      formData.append('public_id', publicID); // El public_id de la imagen que deseas eliminar
      formData.append('api_key', signatures.api_key); // Tu api_key
      formData.append('api_secret', signatures.api_secret); // Tu api_secret
      formData.append('signature', signatures.signature); // El tipo de recurso que deseas eliminar (
      formData.append('timestamp', signatures.timestamp); // El tipo de recurso que deseas eliminar (

      //console.log(publicID);

      delete_file(formData);

      //setImagePreview("https://i.ibb.co/Y2Gtyfj/np.jpg");
      //setImageFile(null);
      //console.log(imagePreview)
      /*const userDataAux = {
        ima: "https://i.ibb.co/Y2Gtyfj/np.jpg"
      };
      //console.log(userData._id,photo);
      delete_photo(userData._id, userDataAux);
    } else {
      alert("Profile photo empty!");
    }*/

  }

  return (
    <div className="flex h-[calc(100vh-50px)] items-center justify-center bg-zinc-900 px-4">
      <div className="bg-zinc-800 w-full max-w-4xl p-8 rounded-lg shadow-lg">
        {userDataErrors.map((error, i) => (
          <div key={i} className="bg-red-500 text-white text-sm text-center py-2 mb-2 rounded">
            {error}
          </div>
        ))}

        <h1 className="text-2xl font-semibold text-white text-center mb-6">User Data</h1>

        <div className="flex flex-col items-center mb-6">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-28 h-28 object-cover rounded-full border border-white mb-2"
          />
          <button
            onClick={deletePhoto}
            className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
          >
            Delete Photo
          </button>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full bg-zinc-700 px-4 py-2 rounded-md"
              autoFocus
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">Name is required</p>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastname" className="block mb-1">Last Name</label>
            <input
              id="lastname"
              type="text"
              placeholder="Last Name"
              {...register("lastname", { required: true })}
              className="w-full bg-zinc-700 px-4 py-2 rounded-md"
            />
            {errors.lastname && <p className="text-red-400 text-sm mt-1">Last name is required</p>}
          </div>

          {/* Age */}
          <div>
            <label htmlFor="age" className="block mb-1">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              {...register("age", { required: true })}
              className="w-full bg-zinc-700 px-4 py-2 rounded-md"
            />
            {errors.age && <p className="text-red-400 text-sm mt-1">Age is required</p>}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block mb-1">Gender</label>
            <select
              id="gender"
              {...register("gender", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            >
              <option value="">Select gender</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            {errors.gender && <p className="text-red-400 text-sm mt-1">Gender is required</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-1">Phone</label>
            <input
              id="phone"
              type="number"
              placeholder="Phone"
              {...register("phone", { required: true })}
              className="w-full bg-zinc-700 px-4 py-2 rounded-md"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">Phone number is required</p>}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              {...register("address", { required: true })}
              className="w-full bg-zinc-700 px-4 py-2 rounded-md"
            />
            {errors.address && <p className="text-red-400 text-sm mt-1">Address is required</p>}
          </div>

          {/* Image (ocupa las 2 columnas) */}
          <div className="md:col-span-2">
            <label htmlFor="profileImage" className="block mb-1">Profile Image</label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm file:bg-indigo-500 file:text-white file:px-4 file:py-2 file:rounded-md file:cursor-pointer"
            />
          </div>

          {/* Submit button (centrado y ocupa dos columnas) */}
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md text-white font-semibold">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserDataPage


/*  */

