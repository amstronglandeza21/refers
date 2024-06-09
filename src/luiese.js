<div className="col-md-6">
<Form.Group controlId="relationship">
  <Form.Label>Relationship:</Form.Label>
  <Form.Control as="select" value={relationship} onChange={(e) => setRelationship(e.target.value)}>
    <option value="">Select a relationship</option>
    {relationships.map((relationship, index) => (
      <option key={index} value={relationship}>{relationship}</option>
    ))}
  </Form.Control>
</Form.Group>
</div>

const [referrerID, setReferrerID] = useState('');
const [referredFirstName, setReferredFirstName] = useState('');
const [referredLastName, setReferredLastName] = useState('');
const [email, setEmail] = useState('');
const [contact, setContact] = useState('');
const [relationship, setRelationship] = useState('');
const [course, setCourse] = useState('');
const [courses, setCourses] = useState([]);
const [relationships, setRelationships] = useState([]);
const [modalMessage, setModalMessage] = useState('');
const [modalShow, setModalShow] = useState(false);


const fetchRelationships = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycby-wPsbelJ6wjm6mJwsjL7hltt6C_pCOPW5yobt02tEIE3ZdFPxNQcPsJKNrMZICeOF/exec?action=getRelationships');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched relationships data:', data);

      if (data.relationships && Array.isArray(data.relationships) && data.relationships.length > 0) {
        console.log('Setting relationships:', data.relationships);
        setRelationships(data.relationships);
      } else {
        console.error('No relationships found or response format is incorrect.');
      }
    } catch (error) {
      console.error('Error fetching relationships:', error);
    }
  };

  fetchCourses();
  fetchRelationships();
}, []);