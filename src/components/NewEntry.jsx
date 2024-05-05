import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const NewEntry = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [adopted, setAdopted] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [chip, setChip] = useState(false);
  const [lastViewed, setLastViewed] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from storage
      if (!token) {
        // Handle case where token is not available (user is not authenticated)
        console.error('Authentication token not found');
        return;
      }
      const adoptedValue = adopted;
      // Include the authorization header with the JWT token in the request
      const response = await axios.post("http://localhost:3000/animals", {
        name,
        species,
        age,
        adopted: adoptedValue,
        image,
        description,
        chip,
        lastViewed,
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Attach the token in the "Bearer" format
        }
      });
      
      // Handle successful response
      console.log("New animal created:", response.data);
      
      // Clear form fields
      setName("");
      setSpecies("");
      setAge("");
      setAdopted(false);
      setDescription("");
      setChip(false);
      setLastViewed("");
    } catch (error) {
      // Handle errors
      console.error("Error creating new animal:", error);
      // Optionally, show error message to the user
    }
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAnimalSpecies">
        <Form.Label>Species</Form.Label>
        <Form.Control
          as="select"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          required
        >
          <option value="">Select species</option>
          <option value="cat">Cat</option>
          <option value="dog">Dog</option>
          <option value="bird">Bird</option>
          <option value="hamster">Hamster</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAdopted">
        <Form.Check
          type="checkbox"
          label="Adoption status"
          checked={adopted}
          onChange={(e) => setAdopted(e.target.checked)}
        />
      </Form.Group>

      <Form.Group controlId="formDescription">
        <Form.Label>Note</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image && (
          <div>
            <img src={image} alt="animal" width="200" height="200" />
          </div>
        )}
        <Form.Label>or choose a file</Form.Label>
         <Form.Control
                type="file"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => handleImageUpload(e)}
              />
      </Form.Group>

      <Form.Group controlId="formChip">
        <Form.Check
          type="checkbox"
          label="Chip"
          checked={chip}
          onChange={(e) => setChip(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formLastViewed">
        <Form.Label>Last Viewed</Form.Label>
        <Form.Control
          type="date"
          placeholder="Enter last viewed date"
          value={lastViewed}
          onChange={(e) => setLastViewed(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default NewEntry;
