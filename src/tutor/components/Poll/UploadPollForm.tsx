import React, { ChangeEvent, useState } from "react";
import { Button, TextField, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"; // Import the icon
import axiosInstanceTutor from "../../interceptor/axiosInstanceTutor";
import { useSelector } from "react-redux";
import { RootStateType } from "../../../redux/store";
import { toast } from "react-toastify";
type CloseModalFunction = () => void;

interface Props {
  CloseModal: CloseModalFunction;
}

function UploadPollForm({ CloseModal }:Props) {
  const data = useSelector((state: RootStateType) => state.user);

  const { _id } = data;
  const [poll, setPoll] = useState({
    question: "",
    options: ["", ""],
  });

  const [errors, setErrors] = useState({
    question: "",
    options: ["", ""],
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = { question: "", options: ["", ""] };

    if (poll.question.trim() === "") {
      newErrors.question = "Question is required";
      valid = false;
    }

    if (poll.options.length < 2) {
      newErrors.options[0] = "Minimum 2 options are required";
      valid = false;
    }

    for (let i = 0; i < poll.options.length; i++) {
      if (poll.options[i].trim() === "") {
        newErrors.options[i] = "Option is required";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPoll((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOptions = [...poll.options];
    newOptions[index] = e.target.value;
    setPoll((prevState) => ({
      ...prevState,
      options: newOptions,
    }));
  };

  const handleAddOption = () => {
    if (poll.options.length < 4) {
      setPoll((prevState) => ({
        ...prevState,
        options: [...prevState.options, ""],
      }));
    }
  };

  const handleDeleteOption = (index: number) => {
    const newOptions = [...poll.options];
    newOptions.splice(index, 1);
    setPoll((prevState) => ({
      ...prevState,
      options: newOptions,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
 
      const response = await axiosInstanceTutor.post('/post/poll',{
        userId: _id,
        timeStamp: new Date().toISOString(),
        type: "Poll",
        pollQuestion: poll.question,
        pollOptions: poll.options,
        
      })
      
      if (response.data.success) {
        CloseModal();
        toast.success('Poll Successfully Uploaded')
      } else {
        toast.error(response.data.message)
        
      }
    }
  };

  return (
    <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          id="question"
          name="question"
          label="Question"
          variant="outlined"
          value={poll.question}
          onChange={handleInputChange}
          error={!!errors.question}
          helperText={errors.question}
          className="mb-6"
        />
        {poll.options.map((option, index) => (
          <div key={index} className="mb-4 flex items-center">
            <TextField
              fullWidth
              id={`option-${index}`}
              name={`option-${index}`}
              label={`Option ${index + 1}`}
              variant="outlined"
              value={option}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleOptionChange(e, index)
              }
              error={!!errors.options[index]}
              helperText={errors.options[index]}
            />
            <IconButton
              color="inherit"
              onClick={() => handleDeleteOption(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        {poll.options.length < 4 && (
     <IconButton
  onClick={handleAddOption}
  className="mb-4"
>
  <AddCircleOutlineIcon /> {/* Use the AddCircleOutlineIcon */}
</IconButton>

   
        )}
        <Button
          variant="text"
          color="primary"
          className="block w-full md:w-auto"
          type="submit"
        >
          Upload Poll
        </Button>
      </form>
    </div>
  );
}

export default UploadPollForm;
