import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Input, TextArea, StyledForm, Button, SelectAsync } from "../../common";
import {
  equipments,
  dimensions,
  locomotions,
  loadOptions,
} from "../../../resources";
const playersValidation = Yup.object().shape({
  name: Yup.string().required("Champ requis"),
  description: Yup.string().required("Champ requis"),
  dimension: Yup.string().required("Champ requis"),
  locomotion: Yup.string().required("Champ requis"),
  equipments: Yup.array().of(Yup.string().required("Champ requis")),
});
//equipments: Yup.array().of(Yup.string().required("Champ requis")),
const EditPlayerForm = ({ player, onSubmit, isUpload }) => {
  const loadOptions = async (input, cb) => {
    const options = equipments.filter((equipment) => equipment.match(input));
    cb(options.map((option) => ({ label: option, value: option })));
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: player.name,
          description: player.description,
          dimension: player.rejectedCards.dimension,
          locomotion: player.rejectedCards.locomotion,
          equipments: player.rejectedCards.equipments,
        }}
        validationSchema={playersValidation}
        onSubmit={(values) => {
          console.log(values);
          onSubmit({ ...values });
        }}
      >
        <StyledForm>
          <Input
            label="Nom/Prénom"
            name="name"
            type="text"
            placeholder="Nom/Prénom"
            disabled={isUpload ? "disabled" : ""}
          />
          <TextArea
            label="Description"
            name="description"
            placeholder="Description"
          />
          <h2>Carte rejetées</h2>
          <p>Dimension</p>
          {player.rejectedCards.dimension.map((card, index) => (
            <Input
              name={`dimension[${index}]`}
              type="text"
              placeholder="dimension"
              disabled={isUpload ? "disabled" : ""}
            />
          ))}
          <p>Locomotion</p>
          {player.rejectedCards.locomotion.map((card, index) => (
            <Input
              name={`locomotion[${index}]`}
              type="text"
              placeholder="Locomotion"
              disabled={isUpload ? "disabled" : ""}
            />
          ))}
          <p>Equipements</p>
          {player.rejectedCards.equipments.map((card, index) => (
            <SelectAsync
              name={`equipments[${index}]`}
              placeholder={"Ajouter du texte"}
              loadOptions={(input, cb) => loadOptions(input, cb, equipments)}
              isDisabled={isUpload ? true : false}
            />
          ))}
          <Button type="submit">Valider</Button>
        </StyledForm>
      </Formik>
    </div>
  );
};

export default EditPlayerForm;

// console.log(props);
// const [player, setPlayer] = useState(props.player);
// const onSubmit = (e) => {
//   e.preventDefault();
//   props.onSubmit({
//     ...player,
//   });
// };

// const onNameChange = (e) => {
//   const name = e.target.value;
//   setPlayer({ ...player, name });
// };
// const onDescriptionChange = (e) => {
//   const description = e.target.value;
//   setPlayer({ ...player, description });
// };

// return (
//   <div>
//     <form onSubmit={onSubmit}>
//       <p>Nom/Prénom</p>
//       <input
//         disabled
//         value={player.name}
//         placeholder='Nom ou/et prénom'
//         onChange={onNameChange}
//       ></input>
//       <p>Description</p>
//       <textarea
//         value={props.description}
//         placeholder='Description du joueur'
//         onChange={onDescriptionChange}
//       ></textarea>
//       <h2>Carte rejetées</h2>
//       <p>Dimension</p>
//       {player.rejectedCards.dimension.map((card) => (
//         <p key={card[0]}>{card}</p>
//       ))}
//       <p>Locomotion</p>
//       {player.rejectedCards.locomotion.map((card) => (
//         <p key={card[0]}>{card}</p>
//       ))}
//       <p>Equipements</p>
//       {player.rejectedCards.dimension.map((card) => (
//         <p key={card[0]}>{card}</p>
//       ))}

//       <button>Valider</button>
//     </form>
//   </div>
// );
