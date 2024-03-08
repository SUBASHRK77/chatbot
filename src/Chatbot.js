import React, { useEffect, useState, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Modal,
  Button,
  FormControl,
} from "react-bootstrap";
import { BsChatDotsFill } from "react-icons/bs";
import { RiSendPlane2Fill, RiSettings2Fill } from "react-icons/ri";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chatbot.css";
import { doc, updateDoc, addDoc } from "firebase/firestore";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidContact } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { ref, uploadBytes, listAll, getDownloadURL } from "@firebase/storage";
import { v4 } from "uuid";

const Chatapp = ({ data, db, colRef, getChat, storage }) => {
  const [Chat, setChat] = useState(data);
  const [message, setMessage] = useState("");
  const [profileData, setProfile] = useState({});
  const [modal, setModal] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [details, setDetails] = useState({
    name: "",
    proImage: [],
    messages: [{}],
    key: "",
  });

  const image = [];
  useEffect(() => {
    const imageListRef = ref(storage, `chatImages/`);
    listAll(imageListRef).then((response) => {
      response.items.forEach((list) => {
        getDownloadURL(list).then((url) => {
          image.push(url);
          setImageList(image);
          let datas = data.map((arr) => {
            return {
              ...arr,
              proImage: image?.filter((obj) => obj.includes(arr?.key)),
            };
          });
          setChat(datas);
        });
      });
    });
  }, [data]);

  const handleSubmit = async () => {
    let key = details.name?.toLowerCase();
    let messages = [{ [key]: [] }];

    const imageUpload = ref(
      storage,
      `chatImages/${details.proImage?.name + v4()}`
    );

    let snapshot = await uploadBytes(imageUpload, details.proImage);

    const downloadURL = await snapshot.ref.fullPath;

    let createParams = {
      ...details,
      messages,
      key,
      proImage: downloadURL,
    };

    addDoc(colRef, createParams)
      .then(() => {
        setModal(false);
        getChat();
        setDetails({});
      })
      .catch((err) => {
        console.log(err, "create error");
      });
  };

  const handleCreateChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "name") {
      setDetails({ ...details, [name]: value });
    } else if (name === "proImage") {
      setDetails({ ...details, proImage: files[0] });
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  const MyVerticallyCenteredModal = useMemo(() => (
    <Modal show={modal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BiSolidContact fontSize={60} />
            <div>Add Contact</div>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>User Name</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <FormControl
            placeholder="Username"
            name="name"
            value={details.name}
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={handleCreateChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Body>
        <Form.Label>Upload Profile Image</Form.Label>
        <FormControl
          type="file"
          name="proImage"
          placeholder="select the profile image"
          onChange={handleCreateChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleSubmit()}>Add</Button>
      </Modal.Footer>
    </Modal>
  ));

  // const headers = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // };

  // const fetchProfile = () => {
  //   return fetch("http://localhost:3002/posts", {
  //     headers,
  //     method: "GET",
  //   }).then((response) => {
  //     if (response.ok) {
  //       try {
  //         return response.json();
  //       } catch (err) {
  //         return true;
  //       }
  //     }
  //   });
  // };

  // useEffect(() => {
  //   fetchProfile()
  //     .then((data) => {
  //       setChat(data);
  //     })
  //     .catch((err) => {
  //     });
  // }, []);

  const handleMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const Inboxchats = () => {
    let messageData = profileData?.messages[0][profileData?.key];
    messageData?.push(message);

    setProfile({
      ...profileData,
      messages: [{ [profileData?.key]: messageData }],
    });

    let chatParams = {
      ...profileData,
    };

    const documentRef = doc(db, "posts", profileData?.id);

    updateDoc(documentRef, chatParams)
      .then(() => {
        setMessage("");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    // return fetch(`http://localhost:3002/posts/${profileData?.id}`, {
    //   headers,
    //   method: "PUT",
    //   body: JSON.stringify(chatParams),
    // }).then((response) => {
    //   if (response.ok) {
    //     try {
    //       setMessage("");
    //       // fetchProfile();
    //     } catch (err) {
    //       alert("Data not found");
    //     }
    //   }
    // });
  };
  const showImageList = (key) => {
    return imageList?.filter((arr) => arr.includes(key));
  };

  const handleOpenProfile = async (arr) => {
    setProfile({ ...arr, proImage: await showImageList(arr?.key) });
  };
  return (
    <div>
      <div>
        {MyVerticallyCenteredModal}

        <Container
          fluid
          style={{ backgroundColor: "#b2bec3", height: "100vh" }}
        >
          <Row>
            <Col lg={3} md={3} sm={12} xs={12} xl={3} xxl={3}>
              {/* My profile */}
              <div
                style={{
                  backgroundColor: "#34495e",
                  borderRadius: "15px",
                  padding: "20px",
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-between",
                  fontSize: "35px",
                  alignItems: "center",
                  marginTop: "50px",
                  color: "#fff",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <BsChatDotsFill />
                  <p className="profile">ChatBot</p>
                </div>
                <div>
                  <DropdownButton
                    id="dropdown-basic-button"
                    title={<BsThreeDotsVertical />}
                  >
                    <Dropdown.Item onClick={() => setModal(true)}>
                      Add Contact
                    </Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>

              <div className="chathead mt-3">
                {Chat?.map((arr, index) => (
                  <div
                    key={index}
                    className=" chattitle mt-2"
                    style={{ backgroundColor: "#34495e" }}
                    onClick={() => handleOpenProfile(arr)}
                  >
                    <div className="mt-1">
                      <img
                        src={showImageList(arr.key)}
                        alt="jack"
                        height={"50px"}
                        width={"50px"}
                        style={{ borderRadius: "30px" }}
                      />
                    </div>
                    <div className="chatname">
                      <p>{arr?.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Col>

            <Col lg={6} md={6} sm={12} xs={12} xl={6} xxl={6}>
              {Object.keys(profileData).length > 0 ? (
                <div className="chathouse mt-5">
                  <div className="chatroom">
                    <img
                      src={profileData.proImage}
                      alt="jack"
                      height={"100px"}
                      width={"100px"}
                      style={{ borderRadius: "60px" }}
                    />
                    <p>{profileData.name}</p>
                    <h3 className="online ">online</h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="chatdiv">
                      {profileData?.messages?.map((obj) => {
                        return obj?.[profileData?.key]?.map((arr) => {
                          return <h1 className="chatstate">{arr}</h1>;
                        });
                      })}
                    </div>
                    <div className="textbox">
                      <span>
                        <input
                          type={"text"}
                          placeholder={"Write a message here..."}
                          onChange={(e) => handleMessage(e)}
                          value={message}
                        />
                      </span>
                      <span>
                        <button
                          type={"button"}
                          className="buttonbg ms-5"
                          onClick={Inboxchats}
                        >
                          send
                          <RiSendPlane2Fill />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="chathouse mt-5"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "30px",
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  No chats opened
                </div>
              )}
            </Col>

            <Col lg={3} md={3} sm={12} xs={12} xl={3} xxl={3}>
              <div
                style={{
                  marginTop: "40px",
                  backgroundColor: "#34495e",
                  textAlign: "center",
                  padding: "5px",
                  height: "95%",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: "10px",
                    gap: "10px",
                    fontSize: "25px",
                  }}
                >
                  <RiSettings2Fill />
                  <div>Settings</div>
                </div>
                {accordianData.map((arr, index) => {
                  return (
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey={`${index}`}>
                        <Accordion.Header>{arr.title}</Accordion.Header>
                        <Accordion.Body>{arr.description}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Chatapp;
const accordianData = [
  {
    title: "Filter",
    description: "Select the notifications you prefer to receive",
  },
  {
    title: "Preference",
    description:
      "Choose your notification preferences based on the type of notification",
  },
  {
    title: "Data and privacy",
    description: `Anim anim eu dolore minim incididunt nostrud ex. Aliquip ut pariatur 
    velit voluptate sint aliquip ad sint velit. Nulla ea fugiat eu laboris consequat 
    culpa nostrud ipsum dolor. Est non sunt adipisicing aliquip culpa. Consectetur dolor
     reprehenderit duis id minim aute.Irure Lorem consequat eiusmod et cupidatat est est ex sit. 
     Officia ut amet sit nostrud qui nulla veniam pariatur esse consectetur mollit fugiat magna enim.
     `,
  },
  {
    title: "Backup and recovery option",
    description: `Est non sunt adipisicing aliquip culpa. Consectetur dolor
    reprehenderit duis id minim aute.Irure Lorem consequat eiusmod et cupidatat est est ex sit. 
    Officia ut amet sit nostrud qui nulla veniam pariatur esse consectetur mollit fugiat magna enim`,
  },
  {
    title: "Help and support",
    description: `Est non sunt adipisicing aliquip culpa. Consectetur dolor
    reprehenderit duis id minim aute.Irure Lorem consequat eiusmod et cupidatat est est ex sit. 
    Officia ut amet sit nostrud qui nulla veniam pariatur esse consectetur mollit fugiat magna enim`,
  },
];
