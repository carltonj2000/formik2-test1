import React from "react";
import { Formik, Field, Form, useField, FieldArray } from "formik";
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  Select,
  FormControlLabel,
  MenuItem
} from "@material-ui/core";

import * as yup from "yup";

const MyRadio = ({ label, ...props }) => {
  const [field] = useField(props);
  return <FormControlLabel {...field} control={<Radio />} label={label} />;
};

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      {...field}
      placeholder={placeholder}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  lastName: yup
    .string()
    .required()
    .max(10),
  pets: yup.array().of(yup.object({ name: yup.string().required() }))
});

function App() {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: "",
          pets: [{ type: "cat", name: "jarvis", id: "" + Math.random() }]
        }}
        validationSchema={validationSchema}
        // validate={values => {
        //   const errors = {};
        //   if (values.lastName.includes("bob")) errors.lastName = "no bob";
        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data);
          setTimeout(() => {
            setSubmitting(false);
            console.log("submit finished");
          }, 1000);
        }}
      >
        {({ values, isSubmitting, errors }) => (
          <Form>
            <Field
              placeholder="first name"
              name="firstName"
              type="input"
              as={TextField}
            />
            <div>
              <MyTextField placeholder="last name" name="lastName" />
            </div>
            <Field name="isTall" type="checkbox" as={Checkbox} />
            <div>
              <Field
                name="cookies"
                type="checkbox"
                value="chocolate chip"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="sugar"
                as={Checkbox}
              />
              <Field
                name="cookies"
                type="checkbox"
                value="snicker doodle"
                as={Checkbox}
              />
            </div>
            <div>Yogurt</div>
            <Field name="yogurt" type="radio" value="strawberry" as={Radio} />
            <MyRadio
              name="yogurt"
              type="radio"
              value="blueberry"
              label="blueberry"
            />
            <Field name="yogurt" type="radio" value="peach" as={Radio} />
            <MyRadio name="yogurt" type="radio" value="pear" label="pear" />
            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>
            <FieldArray name="pets">
              {arrayHelpers => {
                return (
                  <div>
                    <Button
                      onClick={() =>
                        arrayHelpers.push({
                          type: "frog",
                          name: "",
                          id: "" + Math.random()
                        })
                      }
                    >
                      add pet
                    </Button>
                    {values.pets.map((pet, index) => {
                      return (
                        <div key={pet.id}>
                          <MyTextField
                            placeholder="pet name"
                            name={`pets.${index}.name`}
                          />
                          <Field
                            name={`pets.${index}.type`}
                            type="select"
                            as={Select}
                          >
                            <MenuItem value="cat">cat</MenuItem>
                            <MenuItem value="dog">dog</MenuItem>
                            <MenuItem value="frog">frog</MenuItem>
                          </Field>
                          <Button onClick={() => arrayHelpers.remove(index)}>
                            x
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                );
              }}
            </FieldArray>
            <pre>{JSON.stringify(values, null, 2)} </pre>
            {isSubmitting ? "true" : "false"}
            <pre>{JSON.stringify(errors, null, 2)} </pre>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
