"use client";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Stack, Button, useColorModeValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

const itemsPerPage = 10;
const totalItems = 100;
export default function PagosPage() {
  const arrData = new Array(20).fill(0);

  return (
    <div
      style={{
        backgroundColor: "",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <p
        style={{
          fontSize: "40px",
          margin: "2rem 0 2rem 0",
          fontWeight: "500",
          textAlign: "start",
          width: "100%",
        }}
      >
        Pagos
      </p>

      <TableContainer
        style={{
          width: "100%",
        }}
      >
        <Table
          size="sm"
          style={{
            width: "100%",
          }}
        >
          <Thead>
            <Tr>
              <Th style={{ textAlign: "center", width: "400px" }}>Concepto</Th>
              <Th style={{ textAlign: "center", width: "400px" }}>Monto</Th>
              <Th style={{ textAlign: "center", width: "400px" }}>
                Día de pago
              </Th>
              <Th style={{ textAlign: "center", width: "400px" }}>
                Nro Factura
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {arrData.map((data, i) => (
              <Tr key={i}>
                <Td style={{ textAlign: "center" }}>1</Td>
                <Td style={{ textAlign: "center" }}>2</Td>
                <Td style={{ textAlign: "center" }}>3</Td>
                <Td style={{ textAlign: "center" }}>4</Td>
                <Td
                  style={{
                    display: "flex",
                    width: "200px",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    colorScheme="blue"
                    onClick={() => alert(`Editando ${i}`)}
                  >
                    <EditIcon boxSize={5} />
                  </Button>

                  <Button
                    colorScheme="blue"
                    onClick={() => alert(`Eliminando ${i}`)}
                  >
                    <DeleteIcon boxSize={5} />
                  </Button>
                </Td>
              </Tr>
            ))}
            {/* {payments.map((payment) => (
              <Tr>
                <Td>{payment.concept}</Td>
                <Td>{payment.amount}</Td>
                <Td>{payment.payday}</Td>
                <Td>{payment.billing}</Td>
              </Tr>
            ))} */}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
