"use client";

import { Navbar } from "@/components/Navbar";
import { ChakraProvider, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableContainer, Button, Input, Menu, MenuButton, MenuList, MenuItem, Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import studentsData from "../../utils/students.json";
import styles from "@/styles/StudentsView.module.css";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
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
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error al obtener los estudiantes:", error);
      });
  }, []);

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

  let filteredStudents = students.filter((student) => student.name.toLowerCase().includes(search.toLowerCase()));

  if (selectedCourses.length > 0) {
    filteredStudents = filteredStudents.filter((student) => {
      return selectedCourses.every((course) => student.attends.includes(course));
    });
  }

  const handleCourseClick = (course) => {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(selectedCourses.filter((selectedCourse) => selectedCourse !== course));
    } else {
      setSelectedCourses([...selectedCourses, course]);
    }
  };

  return (
    <ChakraProvider>
      <>
        <Navbar />
        <main>
          <h1 className={styles.studentsTitle}>Estudiantes</h1>
          <div className={styles.displayFlexAlignCenter}>
            <Input className={styles.marginLeft} placeholder="Buscar estudiante por nombre" htmlSize={30} width="auto" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className={styles.displayFlexAlignCenter}>
              <Menu>
                <MenuButton className={styles.marginLeft} as={Button} rightIcon={<ChevronDownIcon />}>
                  Filtrar por curso
                </MenuButton>
                <MenuList>
                  {courses.map((course) => (
                    <MenuItem key={course} onClick={() => handleCourseClick(course)}>
                      {course}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              {selectedCourses.map((course) => (
                <Tag className={styles.marginLeft} key={course} size="md" borderRadius="full" colorScheme="blue">
                  <TagLabel>{course}</TagLabel>
                  <TagCloseButton onClick={() => handleCourseClick(course)} />
                </Tag>
              ))}
            </div>
          </div>
          <TableContainer>
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Nombre</Th>
                  <Th>Email</Th>
                  <Th>Cursos</Th>
                  <Th>{""}</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student) => (
                  <Tr key={student.id}>
                    <Td>{student.name}</Td>
                    <Td>{student.email || "-"}</Td>
                    <Td>{student?.attends?.length > 1 ? student.attends.join(", ") : student?.attends[0]}</Td>
                    <Td>
                      <Link href={`/students/${student.id}`}>
                        <Button colorScheme="blue">
                          <AddIcon />
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </main>
      </>
    </ChakraProvider>
  );
}
