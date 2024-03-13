"use client";
import {
  ChakraProvider,
  DrawerCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  WrapItem,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import studentsData from "../../../utils/students.json";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import paymentsData from "../../../utils/payments.json";
import Select from "react-select";

export default function Student({ params }) {
  const { id } = params;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [studentDocument, setStudentDocument] = useState("");
  const [studentDirection, setStudentDirection] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [studentInstagram, setStudentInstagram] = useState("");
  const [studentFacebook, setStudentFacebook] = useState("");
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    const fetchStudents = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(studentsData);
        }, 1000);
      });
    };

    fetchStudents()
      .then((data) => {
        const student = data.find((student) => student.id == id);
        setStudent(student);
        setStudentName(student.name);
        setStudentDocument(student.document);
        setStudentDirection(student.direction);
        setStudentEmail(student.email);
        setStudentPhone(student.phone);
        setStudentInstagram(student.instagram);
        setStudentFacebook(student.facebook);
        setSelectedCourses(
          student.attends.map((course) => ({ label: course, value: course }))
        );
      })
      .catch((error) => {
        console.error("Error al obtener al estudiante:", error);
      });
  }, [id]);

  useEffect(() => {
    const fetchPayments = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(paymentsData);
        }, 1000);
      });
    };

    fetchPayments()
      .then((data) => {
        const paymentsUser = data.filter(
          (payment) => payment.name === student?.name
        );
        setPayments(paymentsUser);
      })
      .catch((error) => {
        console.error("Error al obtener los pagos:", error);
      });
  }, [student]);

  useEffect(() => {
    const fetchCourses = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const coursesSet = new Set();
          studentsData.forEach((student) => {
            student.attends.forEach((course) => {
              coursesSet.add(course);
            });
          });
          resolve([...coursesSet]);
        }, 1000);
      });
    };

    fetchCourses()
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error al obtener los cursos:", error);
      });
  }, []);

  const handleNameChange = (e) => {
    setStudentName(e.target.value);
  };

  const handleDocumentChange = (e) => {
    setStudentDocument(e.target.value);
  };

  const handleDirectionChange = (e) => {
    setStudentDirection(e.target.value);
  };

  const handleEmailChange = (e) => {
    setStudentEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setStudentPhone(e.target.value);
  };

  const handleInstagramChange = (e) => {
    setStudentInstagram(e.target.value);
  };

  const handleFacebookChange = (e) => {
    setStudentFacebook(e.target.value);
  };

  const handleCoursesChange = (selectedOptions) => {
    setSelectedCourses(selectedOptions);
  };

  const handleSave = () => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      name: studentName,
      document: studentDocument,
      direction: studentDirection,
      email: studentEmail,
      phone: studentPhone,
      attends: selectedCourses.map((course) => course.value),
    }));
    onClose();
  };

  return (
    <ChakraProvider>
      <>
        {/* <Navbar /> */}
        <main>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3rem",
              margin: "0.5rem 0rem",
            }}
          >
            {student?.name}
          </h1>
          <Tabs
            isFitted
            variant="unstyled"
            style={{
              width: "60%",
              margin: "0 auto",
              padding: "2rem",
              border: "1px solid #E2E8F0",
              borderRadius: "30px",
            }}
          >
            <TabList>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>Detalles</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>Pagos</Tab>
              <Tab _selected={{ color: "white", bg: "blue.500" }}>
                Notas y comentarios
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div>
                  <div style={{ marginTop: "1rem" }}>
                    <p>Documento: {student?.document}</p>
                    <p>Dirección: {student?.direction}</p>
                    {student?.email ? <p>Email: {student?.email}</p> : ""}
                    <p>Teléfono: {student?.phone}</p>
                    {student?.instagram ? (
                      <p>Instagram: {student?.instagram}</p>
                    ) : (
                      ""
                    )}
                    {student?.facebook ? (
                      <p>Facebook: {student?.facebook}</p>
                    ) : (
                      ""
                    )}
                    <p>
                      Cursos:{" "}
                      {student?.attends?.length > 1
                        ? student.attends.join(", ")
                        : student?.attends[0]}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2rem",
                    }}
                  >
                    <WrapItem>
                      <Button
                        ref={btnRef}
                        onClick={onOpen}
                        colorScheme="green"
                        width="20rem"
                        style={{
                          margin: "1rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <EditIcon style={{ marginRight: "0.5rem" }} />
                        Editar estudiante
                      </Button>
                      <Drawer
                        size="sm"
                        isOpen={isOpen}
                        placement="right"
                        onClose={onClose}
                        finalFocusRef={btnRef}
                      >
                        <DrawerOverlay />
                        <DrawerContent>
                          <DrawerCloseButton />
                          <DrawerHeader>Editar estudiante</DrawerHeader>
                          <DrawerBody>
                            <Input
                              placeholder="Nombre"
                              value={studentName}
                              onChange={handleNameChange}
                            />
                            <Input
                              style={{ marginTop: "0.8rem" }}
                              placeholder="Documento"
                              value={studentDocument}
                              onChange={handleDocumentChange}
                            />
                            <Input
                              style={{ marginTop: "0.8rem" }}
                              placeholder="Dirección"
                              value={studentDirection}
                              onChange={handleDirectionChange}
                            />
                            <Input
                              style={{ marginTop: "0.8rem" }}
                              placeholder="Email"
                              value={studentEmail}
                              onChange={handleEmailChange}
                            />
                            <Input
                              style={{ marginTop: "0.8rem" }}
                              placeholder="Teléfono"
                              value={studentPhone}
                              onChange={handlePhoneChange}
                            />
                            <Input
                              style={{ marginTop: "0.8rem" }}
                              placeholder="Instagram"
                              value={studentInstagram}
                              onChange={handleInstagramChange}
                            />
                            <Input
                              style={{ margin: "0.8rem 0" }}
                              placeholder="Facebook"
                              value={studentFacebook}
                              onChange={handleFacebookChange}
                            />
                            <Select
                              defaultValue={selectedCourses}
                              isMulti
                              name="Cursos"
                              options={courses.map((course) => ({
                                label: course,
                                value: course,
                              }))}
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={handleCoursesChange}
                            />
                          </DrawerBody>
                          <DrawerFooter>
                            <Button variant="outline" mr={3} onClick={onClose}>
                              Cancelar
                            </Button>
                            <Button colorScheme="blue" onClick={handleSave}>
                              Guardar
                            </Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </WrapItem>
                    <WrapItem>
                      <Button
                        colorScheme="red"
                        width="20rem"
                        style={{
                          margin: "1rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <DeleteIcon style={{ marginRight: "0.5rem" }} />
                        Eliminar estudiante
                      </Button>
                    </WrapItem>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <WrapItem
                  style={{
                    margin: "1rem",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    colorScheme="blue"
                    width="30rem"
                    style={{
                      margin: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <AddIcon style={{ marginRight: "0.5rem" }} />
                    Crear pago
                  </Button>
                </WrapItem>
                <TableContainer>
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>Concepto</Th>
                        <Th>Monto</Th>
                        <Th>Día de pago</Th>
                        <Th>Nro Factura</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {payments.map((payment) => (
                        <Tr>
                          <Td>{payment.concept}</Td>
                          <Td>{payment.amount}</Td>
                          <Td>{payment.payday}</Td>
                          <Td>{payment.billing}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TabPanel>
              <TabPanel>
                <p>Notas y comentarios!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </main>
      </>
    </ChakraProvider>
  );
}
