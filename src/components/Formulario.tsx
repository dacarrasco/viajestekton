import { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import countSubForm from "../hooks/countSubForm";
import { IPasajero } from "../interfaces/pasajeroInterface";
import { style } from "../themes/style";

function Formulario() {
  const [pasajeros, setPasajeros] = useState<IPasajero[]>([]);
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm<IPasajero>();
  const [opcion, setOpcion] = useState("");

  const onSubmit: SubmitHandler<IPasajero> = (data) => {
    alert("Los Datos Fueron Ingresados Correctamente");

    setPasajeros((pasajeros) => [data, ...pasajeros]);
    resetField("name");
    resetField("lastName");
    resetField("nacionalidad");
    resetField("tipoDocumento");
    resetField("numeroDocumento");
  };

  function handleEdit(index: number) {
    const pasajero = pasajeros[index];
    handleDelete(index);

    alert(
      "Los Datos se cargaran en el formulario, vuelva a guardarlo cuando corrija"
    );
    (document.getElementById("name") as HTMLInputElement).value = pasajero.name;
    (document.getElementById("lastName") as HTMLInputElement).value =
      pasajero.name;
    (document.getElementById("nacionalidad") as HTMLInputElement).value =
      pasajero.nacionalidad;
    (document.getElementById("tipoDocumento") as HTMLSelectElement).value =
      pasajero.tipoDocumento;
    (document.getElementById("numeroDocumento") as HTMLInputElement).value =
      pasajero.numeroDocumento;
  }

  const handleDelete = (index: number) => {
    setPasajeros((pasajeros) => pasajeros.filter((p, i) => i !== index));
    console.log("se borro");
  };

  return (
    <>
      <div className=" bg-green-700 text-center text-xl text-gray-900 dark:text-white">
        <p>Tekton Airlines</p>
      </div>

      <form
        className=" text-center bg-gray-900"
        onSubmit={handleSubmit(onSubmit)}
      >
        { countSubForm(pasajeros) && (
          <div className=" text center p-4">
            <p className=" bg-transparent text-center text-m text-gray-900 dark:text-white">
              Ingrese los Datos del Pasajero:
            </p>
            <div className="relative py-7 ">
              <input
                className={style.input}
                id="name"
                placeholder=" "
                {...register("name", {
                  required: true,
                  pattern: {
                    value:
                      /^[A-Za-z\u00E0-\u00FCñ\'.]+[\sA-Za-z\u00E0-\u00FCñ\'.]*$/i,
                    message: "mensaje de Error",
                  },
                })}
              />
              <label className={style.label}>Nombres:</label>
              {errors.name && (
                <span className={style.error}>
                  Campo Obligatorio*: Solo caracteres Alfabeticos,acentos o
                  puntos.
                </span>
              )}
            </div>
            <div className="relative py-7">
              <input
                className={style.input}
                id="lastName"
                placeholder=" "
                {...register("lastName", {
                  required: true,
                  pattern:
                    /^[A-Za-z\u00E0-\u00FCñ\'.]+[\sA-Za-z\u00E0-\u00FCñ\'.]*$/i,
                })}
              />
              <label className={style.label}>Apellidos:</label>
              {errors.lastName && (
                <span className={style.error}>
                  Campo Obligatorio*: Solo caracteres Alfabeticos,acentos o
                  puntos.
                </span>
              )}
            </div>
            <div className="relative py-7">
              <input
                className={style.input}
                id="nacionalidad"
                placeholder=" "
                {...register("nacionalidad", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              <label className={style.label}>Nacionalidad:</label>
              {errors.nacionalidad && (
                <span className={style.error}>
                  Campo Obligatorio*: Solo caracteres Alfabeticos.
                </span>
              )}
            </div>

            <label className={style.lblselect}>Tipo de Documento:</label>
            <select
              id="tipoDocumento"
              className={style.select}
              {...register("tipoDocumento", { required: true })}
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
            >
              <option value="">---Elija su Documento---</option>
              <option value="DNI">DNI</option>
              <option value="CE">Carnet de Extranjeria</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
            {errors.tipoDocumento && (
              <span className={style.error}>
                Campo Obligatorio*: Seleccione una de las 3 opciones.
              </span>
            )}
            {opcion === "DNI" && (
              <div className="relative py-7">
                <input
                  id="numeroDocumento"
                  className={style.input}
                  placeholder=" "
                  {...register("numeroDocumento", {
                    required: true,
                    pattern: /^[0-9]{8}/,
                  })}
                />
                <label className={style.label}>Numero de Documento:</label>
              </div>
            )}
            {opcion === "CE" && (
              <div className=" relative py-7">
                <input
                  id="numeroDocumento"
                  className={style.input}
                  placeholder=" "
                  {...register("numeroDocumento", {
                    required: true,
                    pattern: /[A-Za-z0-9]{9}/,
                  })}
                />
                <label className={style.label}>Numero de Documento:</label>
              </div>
            )}
            {opcion === "Pasaporte" && (
              <div className="relative py-7">
                <input
                  id="numeroDocumento"
                  className={style.input}
                  placeholder=" "
                  {...register("numeroDocumento", {
                    required: true,
                    pattern: /[0-9]{9}/,
                  })}
                />
                <label className={style.label}>Numero de Documento:</label>
              </div>
            )}
            {errors.numeroDocumento && (
              <span className={style.error}>
                Campo Obligatorio*: Recuerde DNI: 8 digitos numericos, Pasaporte
                9 digitos numericos, Carnet de extranjeria 9 digitos
                alfanumericos.
              </span>
            )}
            <div className="relative py-7">
              <input className={style.boton} type="submit" value="GUARDAR" />
            </div>
          </div>
        )}
        { !countSubForm(pasajeros) && (
          <div className=" text-center p-4">
            <p className="text-bold text-red-500">
              Formularios Agotados: Limite de 4 Pasajeros
            </p>
            <div className="relative py-7 ">
              <input
                className={style.inputdisable}
                placeholder=" "
                {...register("name", {
                  required: true,
                  pattern: {
                    value:
                      /^[A-Za-z\u00E0-\u00FCñ\'.]+[\sA-Za-z\u00E0-\u00FCñ\'.]*$/i,
                    message: "mensaje de Error",
                  },
                })}
              />
              <label className={style.label}>Nombres:</label>
            </div>
            <div className="relative py-7">
              <input
                className={style.inputdisable}
                placeholder=" "
                {...register("lastName", {
                  required: true,
                  pattern:
                    /^[A-Za-z\u00E0-\u00FCñ\'.]+[\sA-Za-z\u00E0-\u00FCñ\'.]*$/i,
                })}
              />
              <label className={style.label}>Apellidos:</label>
            </div>
            <div className="relative py-7">
              <input
                className={style.inputdisable}
                placeholder=" "
                disabled
                {...register("nacionalidad", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              <label className={style.label}>Nacionalidad:</label>
            </div>

            <label className={style.lblselect}>Tipo de Documento:</label>
            <select
              className={style.selectdisable}
              disabled
              {...register("tipoDocumento", { required: true })}
            >
              <option value="">---Elija su Documento---</option>
              <option value="DNI">DNI</option>
              <option value="CE">Carnet de Extranjeria</option>
              <option value="Pasaporte">Pasaporte</option>
            </select>
            {opcion === "DNI" && (
              <div className="relative py-7">
                <input
                  id="numeroDocumento"
                  className={style.input}
                  placeholder=" "
                  {...register("numeroDocumento", {
                    required: true,
                    pattern: /^[0-9]{8}/,
                  })}
                />
                <label className={style.label}>Numero de Documento:</label>
              </div>
            )}
            {opcion === "CE" && (
              <div className=" relative py-7">
                <input
                  id="numeroDocumento"
                  className={style.input}
                  placeholder=" "
                  {...register("numeroDocumento", {
                    required: true,
                    pattern: /[A-Za-z0-9]{9}/,
                  })}
                />
                <label className={style.label}>Numero de Documento:</label>
              </div>
            )}
            {opcion === "Pasaporte" && (
              <div className="relative py-7">
                <input
                  id="numeroDocumento"
                  className={style.input}
                  placeholder=" "
                  {...register("numeroDocumento", {
                    required: true,
                    pattern: /[0-9]{9}/,
                  })}
                />
                <label className={style.label}>Numero de Documento:</label>
              </div>
            )}

            <div className="relative py-7">
              <input
                className={style.botondisable}
                type="submit"
                value="GUARDAR"
              />
            </div>
          </div>
        )}
      </form>
      <div className="bg-green-700 text-center text-xl text-gray-900 dark:text-white">
        Lista de Pasajeros
      </div>
      <div>
        {pasajeros.map((pasajero, index) => (
          <>
            <div className="bg-gray-900 dark:text-white text-center border border-green-700">
              <p key={index}>Pasajero:</p>
              <p>Nombres: {pasajero.name}</p>
              <p>Apellidos: {pasajero.lastName}</p>
              <p>Nacionalidad: {pasajero.nacionalidad}</p>
              <p>Tipo Documento: {pasajero.tipoDocumento}</p>
              <p>Numero de Documento: {pasajero.numeroDocumento}</p>
              <input
                className={style.boton}
                type="button"
                value="EDITAR"
                onClick={() => handleEdit(index)}
              />
              <input
                className={style.boton}
                type="button"
                value="ELIMINAR"
                onClick={() => handleDelete(index)}
              />
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Formulario;
